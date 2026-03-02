# NobelHub Technical Architecture Summary

## System Architecture Flow

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
├─────────────────────────────────────────────────────────┤
│  Web (React/Next.js 14+) │ iOS (Swift) │ Android (Kt)  │
└────────┬──────────────────────────────┬─────────────────┘
         │                              │
         └──────────────┬───────────────┘
                        ▼
┌─────────────────────────────────────────────────────────┐
│         API Gateway & Load Balancer (AWS ALB)          │
│    Rate Limiting │ Authentication │ Request Routing    │
└─────────────────┬───────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
┌──────────────────────────────────────────────────────────┐
│              MICROSERVICES LAYER                        │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │  User    │ │ Content  │ │ Search   │ │ Lecture  │  │
│  │ Service  │ │ Service  │ │ Service  │ │ Service  │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐              │
│  │ Research │ │Analytics │ │Recommend │              │
│  │ Service  │ │ Service  │ │ Service  │              │
│  └──────────┘ └──────────┘ └──────────┘              │
│                                                          │
└─────────┬──────────┬──────────┬─────────────────────────┘
          │          │          │
    ┌─────┴──┐  ┌────┴─────┐  ┌┴──────────┐
    ▼        ▼  ▼          ▼  ▼           ▼
┌─────────┐┌──────┐┌──────┐┌─────┐┌──────────┐
│PostgreSQL││Redis ││Queue ││S3   ││Elasticsearch
│Database  ││Cache ││System││Files││ Search
└─────────┘└──────┘└──────┘└─────┘└──────────┘
```

## Database Schema Overview

### Core Entities

**Users**
- id (UUID)
- email (Unique)
- passwordHash
- displayName
- role (User, Editor, Admin)
- avatar
- preferences (JSON)
- createdAt, updatedAt

**Laureates**
- id (UUID)
- firstName, lastName
- birthDate, deathDate
- birthPlace, nationality
- biography (Text)
- photo (URL)
- website (URL)
- verified (Boolean)

**Nobel Prizes**
- id (UUID)
- year (Integer)
- category (Physics, Chemistry, Medicine, Literature, Peace, Economic Sciences)
- laureate_id (Foreign Key)
- motivation (Text)
- prize_amount (Decimal)
- prize_date (Date)

**Lectures**
- id (UUID)
- title
- speaker_id (Foreign Key to Laureates)
- videoUrl (CDN URL)
- transcriptUrl
- duration (Seconds)
- category
- description
- viewCount
- uploadDate

**Research Papers**
- id (UUID)
- title
- authors (Array)
- abstract
- pdfUrl
- doi
- publicationDate
- category
- citations (Count)
- laureate_id (Foreign Key)

**Collections**
- id (UUID)
- userId (Foreign Key)
- title
- description
- isPrivate (Boolean)
- createdAt, updatedAt

**User Activity**
- id (UUID)
- userId (Foreign Key)
- activityType (view, search, download, rate)
- contentId
- contentType (laureate, lecture, paper)
- timestamp

## API Endpoints Structure

```
/api/v1
├── /auth
│   ├── POST /register
│   ├── POST /login
│   ├── POST /logout
│   └── POST /refresh-token
├── /users
│   ├── GET /profile
│   ├── PUT /profile
│   └── GET /:userId/public-profile
├── /laureates
│   ├── GET (filterable)
│   ├── GET /:id
│   ├── GET /:id/prizes
│   ├── GET /:id/lectures
│   ├── GET /:id/papers
│   └── POST /:id/compare
├── /lectures
│   ├── GET (searchable, filterable)
│   ├── GET /:id
│   ├── GET /:id/transcript
│   ├── GET /:id/related
│   └── POST /:id/view
├── /research
│   ├── GET (searchable, filterable)
│   ├── GET /:id
│   ├── GET /:id/citations
│   └── GET /:id/related
├── /search
│   ├── GET ?q=query
│   ├── GET ?q=query&type=lectures
│   └── GET /suggestions?q=partial
├── /collections
│   ├── GET
│   ├── POST
│   ├── GET /:id
│   ├── PUT /:id
│   ├── DELETE /:id
│   ├── POST /:id/items
│   └── DELETE /:id/items/:itemId
├── /bookmarks
│   ├── GET
│   ├── POST
│   └── DELETE /:id
└── /analytics
    ├── GET /statistics
    ├── GET /trends
    ├── GET /distribution
    └── GET /insights
```

## Technology Stack

### Frontend
- **Framework:** Next.js 14+ (React 18+)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** React Query
- **Video Player:** HLS.js
- **Charts:** Recharts, D3.js
- **Forms:** React Hook Form
- **Testing:** Jest, React Testing Library

### Backend
- **Runtime:** Node.js 18+ LTS
- **Framework:** Express.js or Fastify
- **Language:** TypeScript
- **Database:** PostgreSQL 14+
- **Search:** Elasticsearch 8+
- **Cache:** Redis 7+
- **Queue:** RabbitMQ
- **API Docs:** OpenAPI 3.0
- **Testing:** Jest, Supertest

### Infrastructure
- **Cloud:** AWS
- **Container:** Docker
- **Orchestration:** Kubernetes (EKS)
- **CI/CD:** GitHub Actions
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack

## Development Timeline

```
Phase 1 (MVP) - Q3 2026
├── Weeks 1-4: Foundation & Infrastructure
│   ├── Database schema & design
│   ├── API foundation & auth
│   └── CI/CD pipeline setup
├── Weeks 5-8: Core Features
│   ├── Laureate directory
│   ├── Search functionality
│   ├── Lecture library
│   └── User profiles
└── Weeks 9-12: Polish & Launch
    ├── Analytics dashboard
    ├── Security audit
    ├── QA & testing
    └── Soft launch

Phase 2 (Enhanced) - Q4 2026
├── Advanced search & filtering
├── Mobile apps (iOS/Android)
├── Community features
└── Advanced analytics

Phase 3 (AI & Intelligence) - Q1 2027
├── ML recommendations
├── AI chat assistant
├── Public API release
└── Enterprise features
```

## Key Success Metrics

**Growth Metrics**
- MAU: 50K (Month 6), 500K (Year 2)
- DAU: 10-15% of MAU
- Churn Rate: < 5% monthly
- UAC: < $5

**Engagement Metrics**
- Avg Session Duration: > 5 minutes
- Pages per Session: > 4
- Content Consumption: 70%+
- Lecture Completion: > 40%

**Business Metrics**
- Premium Conversion: 3-5%
- MRR: $50K (Year 2)
- LTV: > $200
- LTV:CAC: > 40:1

**Performance Metrics**
- Page Load Time: < 2 seconds (p95)
- Search Response: < 300ms
- API Response: < 200ms
- Uptime: 99.9%