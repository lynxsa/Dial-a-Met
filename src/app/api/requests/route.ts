import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      title,
      description,
      problemType,
      mineralType,
      budget,
      timeline,
      confidentiality,
      broadcastToSocial,
      socialPlatforms,
      geologicalData
    } = await request.json()

    // Validate required fields
    if (!title || !description || !problemType || !mineralType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create the request in the database
    const newRequest = await prisma.request.create({
      data: {
        title,
        description,
        problemType,
        mineralType,
        budget: budget ? parseFloat(budget) : null,
        timeline,
        confidentiality,
        broadcastToSocial,
        socialPlatforms,
        geologicalData,
        clientId: session.user.id,
        status: 'OPEN'
      }
    })

    // TODO: Trigger AI matching process
    // This would typically call an external AI service to match experts
    
    // TODO: Handle social media broadcasting
    if (broadcastToSocial && socialPlatforms.length > 0) {
      // Implement social media posting logic
      console.log('Broadcasting to social media:', socialPlatforms)
    }

    // TODO: Send notifications to potential experts
    // This could be done via email, push notifications, etc.

    return NextResponse.json({
      success: true,
      request: {
        id: newRequest.id,
        title: newRequest.title,
        status: newRequest.status,
        createdAt: newRequest.createdAt
      }
    })

  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: { clientId: string; status?: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' } = {
      clientId: session.user.id
    }

    if (status && ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].includes(status)) {
      where.status = status as 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
    }

    const requests = await prisma.request.findMany({
      where,
      include: {
        bids: {
          select: {
            id: true,
            price: true,
            status: true,
            submittedAt: true,
            consultantId: true
          }
        },
        _count: {
          select: {
            bids: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      skip: offset
    })

    const total = await prisma.request.count({ where })

    return NextResponse.json({
      requests,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })

  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
