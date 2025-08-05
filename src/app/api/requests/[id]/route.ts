import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const requestId = id

    const requestData = await prisma.request.findUnique({
      where: {
        id: requestId,
        clientId: session.user.id // Ensure user can only access their own requests
      },
      include: {
        bids: {
          select: {
            id: true,
            price: true,
            status: true,
            submittedAt: true,
            consultantId: true,
            // Don't include consultant details for anonymity
          },
          orderBy: {
            submittedAt: 'desc'
          }
        },
        _count: {
          select: {
            bids: true
          }
        }
      }
    })

    if (!requestData) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    return NextResponse.json({
      request: requestData
    })

  } catch (error) {
    console.error('Error fetching request details:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const requestId = id
    const body = await request.json()

    // Verify the request belongs to the user
    const existingRequest = await prisma.request.findUnique({
      where: {
        id: requestId,
        clientId: session.user.id
      }
    })

    if (!existingRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Update the request
    const updatedRequest = await prisma.request.update({
      where: {
        id: requestId
      },
      data: {
        title: body.title,
        description: body.description,
        problemType: body.problemType,
        mineralType: body.mineralType,
        budget: body.budget ? parseFloat(body.budget) : null,
        timeline: body.timeline,
        confidentiality: body.confidentiality,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      request: updatedRequest
    })

  } catch (error) {
    console.error('Error updating request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const requestId = id

    // Verify the request belongs to the user
    const existingRequest = await prisma.request.findUnique({
      where: {
        id: requestId,
        clientId: session.user.id
      }
    })

    if (!existingRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    }

    // Check if request can be cancelled (not in progress or completed)
    if (existingRequest.status === 'IN_PROGRESS' || existingRequest.status === 'COMPLETED') {
      return NextResponse.json(
        { error: 'Cannot cancel request that is in progress or completed' },
        { status: 400 }
      )
    }

    // Update status to cancelled instead of deleting
    const cancelledRequest = await prisma.request.update({
      where: {
        id: requestId
      },
      data: {
        status: 'CANCELLED',
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      request: cancelledRequest
    })

  } catch (error) {
    console.error('Error cancelling request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
