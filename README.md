# HireMind AI – Intelligent Recruitment & Candidate Management Platform

A modern AI-powered recruitment and candidate management platform designed to streamline job postings, applicant tracking, candidate evaluation, resume analysis, and hiring workflows through an intuitive and professional interface.

## Features

### Authentication & Authorization

- Secure user authentication
- Role-based access control
- Protected routes
- Session management

### Dashboard & Analytics

- Recruitment overview dashboard
- Job and candidate statistics
- Application status tracking
- Hiring funnel visualization
- Recruitment performance analytics
- Recent activity monitoring

### Job Management

- Create and manage job postings
- Update and delete job listings
- Define job requirements and required skills
- Search and filter available jobs
- Track active and closed positions

### Candidate Management

- Create and manage candidate profiles
- Resume management
- Skills and experience tracking
- Education information
- Candidate search and filtering
- Application history

### Applicant Tracking

Manage candidates throughout the recruitment workflow:

- Applied
- Screening
- Interview
- Assessment
- Selected
- Rejected
- Hired

### AI-Powered Features

- AI-powered resume analysis
- Candidate skill extraction
- Intelligent candidate scoring
- Job and candidate matching
- Skill gap identification
- Experience analysis
- AI-generated hiring recommendations

### Analytics

- Hiring trends
- Application statistics
- Candidate analytics
- Job performance insights
- Recruitment funnel analysis
- Hiring performance reports

## User Roles

### Admin

- Manage users
- Monitor platform activity
- Access system analytics
- Manage recruiters and candidates

### Recruiter

- Create and manage job postings
- Review candidate applications
- Manage recruitment workflows
- Analyze candidate profiles
- Use AI-powered candidate matching

### Candidate

- Manage profile information
- Browse available jobs
- Submit applications
- Upload resumes
- Track application status

## Tech Stack

### Frontend

- React
- Vite
- Ant Design
- React Router
- Lucide React
- Recharts
- JavaScript ES6+

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Authentication

- JSON Web Tokens (JWT)

### AI Integration

- AI-powered resume analysis
- Candidate-job matching
- Intelligent candidate evaluation

## Project Structure

```text
src/
├── assets/
├── components/
├── context/
├── data/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/hiremind-ai.git
```

Navigate to the project directory:

```bash
cd hiremind-ai
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will run locally on:

```text
http://localhost:5173
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For the backend:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit environment variables or sensitive credentials to GitHub.

## Application Modules

- Authentication and Authorization
- Recruitment Dashboard
- Job Management
- Candidate Management
- Applicant Tracking
- AI Resume Analysis
- Candidate Matching
- Recruitment Analytics
- Profile and Settings

## API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Jobs

```text
GET    /api/jobs
POST   /api/jobs
GET    /api/jobs/:id
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

### Candidates

```text
GET /api/candidates
GET /api/candidates/:id
PUT /api/candidates/:id
```

### Applications

```text
GET  /api/applications
POST /api/applications
PUT  /api/applications/:id/status
```

## Future Improvements

- AI-powered interview question generation
- Automated interview scheduling
- Email notifications
- Advanced resume parsing
- Automated candidate ranking
- Real-time application updates
- Multi-company support
- Advanced reporting and data export
- AI-powered recruitment insights

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new feature branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Create a pull request

## License

This project is licensed under the MIT License.

## Author

**Bavya M**

---

HireMind AI is a portfolio-focused project designed to demonstrate modern web development, recruitment workflow management, data visualization, and AI-powered application features.
