# Dial-a-Met Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a comprehensive Next.js web portal for Dial-a-Met, a mining and metallurgical consulting marketplace. The platform features AI-powered anonymous matching, competitive bidding, training modules, career placements, and social media integration.

## Key Features to Implement
- **Authentication**: Role-based access (Mine Client, Consultant, Job Seeker, Trainer, Admin)
- **Anonymous Bidding System**: Complete anonymity with ID-based profiles
- **AI Matching**: Expert-to-project matching algorithms
- **Real-time Bid Wars**: Live charts and competitive bidding interface
- **Social Media Integration**: LinkedIn and Twitter posting from requests
- **Training Platform**: Virtual classrooms and certification tracking
- **Career Hub**: Job matching and placement services
- **Admin Console**: Bias audit dashboard and platform monitoring

## Technical Stack Guidelines
- **Frontend**: Next.js 15+ with App Router, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with OAuth (LinkedIn, Google)
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Socket.io for live bidding
- **AI/ML**: Integration ready for Python FastAPI services
- **Payments**: Stripe integration
- **Charts**: Chart.js or Recharts for bid war visualization
- **File Uploads**: Support for mining reports, assay data, images

## Code Style and Conventions
- Use TypeScript strictly with proper type definitions
- Implement proper error handling and loading states
- Follow accessibility guidelines (WCAG 2.1 AA)
- Use server actions for form submissions
- Implement proper SEO with metadata
- Use shadcn/ui components for consistent design
- Implement dark mode support for "Mine Mode"

## Security and Compliance
- Implement strict anonymization for bidding
- Add audit logging for bias monitoring
- Ensure GDPR/SARPRIA compliance
- Use encrypted data transmission
- Implement proper role-based authorization

## UI/UX Guidelines
- Mining-themed color palette with professional appearance
- Responsive design for desktop and mobile
- High-contrast "Mine Mode" for field use
- Intuitive navigation for technical mining professionals
- Real-time updates without overwhelming the interface

## Special Considerations
- Anonymous bidding requires careful identity management
- Real-time bid updates need efficient state management
- File uploads should handle large mining data files
- Social media posting requires proper API integration
- Training modules need video/content delivery capabilities
