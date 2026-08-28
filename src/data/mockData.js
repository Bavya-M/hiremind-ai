export const MOCK_USER = {
  id: 'usr-1',
  name: 'Bavya M',
  email: 'bavyamohanreddy28@gmail.com',
  role: 'recruiter', // 'admin' | 'recruiter' | 'candidate'
  title: 'Lead Technical Recruiter',
  company: 'HireMind AI Labs',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
};

export const MOCK_JOBS = [
  {
    id: 'job-101',
    title: 'Senior Full Stack AI Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    salary: '$140,000 - $185,000',
    experience: '4-6 years',
    status: 'Active',
    applicantsCount: 38,
    matchedCandidatesCount: 12,
    postedDate: '2026-08-15',
    description: 'We are seeking a Full Stack AI Engineer to lead the development of enterprise LLM tools, agentic workflows, and high-performance React frontends.',
    skillsRequired: ['React', 'Node.js', 'Python', 'TypeScript', 'LangChain', 'MongoDB', 'Vite'],
    hiringManager: 'Dr. Aris Thorne'
  },
  {
    id: 'job-102',
    title: 'Lead Product Designer (UI/UX)',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $155,000',
    experience: '5+ years',
    status: 'Active',
    applicantsCount: 45,
    matchedCandidatesCount: 15,
    postedDate: '2026-08-18',
    description: 'Looking for a UI/UX visionary to craft scalable design systems, interactive prototypes, and frictionless recruitment user interfaces.',
    skillsRequired: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Ant Design'],
    hiringManager: 'Elena Rostova'
  },
  {
    id: 'job-103',
    title: 'DevOps & Cloud Infrastructure Architect',
    department: 'Infrastructure',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$150,000 - $190,000',
    experience: '6+ years',
    status: 'Active',
    applicantsCount: 22,
    matchedCandidatesCount: 7,
    postedDate: '2026-08-20',
    description: 'Manage AWS multi-region Kubernetes clusters, CI/CD deployment pipelines, zero-downtime microservices, and monitoring.',
    skillsRequired: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'GitHub Actions'],
    hiringManager: 'Marcus Vance'
  },
  {
    id: 'job-104',
    title: 'AI Prompt & Evaluation Specialist',
    department: 'AI Research',
    location: 'Remote',
    type: 'Contract',
    salary: '$90,000 - $120,000',
    experience: '2-4 years',
    status: 'Closed',
    applicantsCount: 64,
    matchedCandidatesCount: 18,
    postedDate: '2026-07-30',
    description: 'Design rigorous evaluation benchmarks, prompt engineering strategies, and LLM fine-tuning quality assurance pipelines.',
    skillsRequired: ['Prompt Engineering', 'Python', 'NLP', 'Evaluation Frameworks', 'PyTorch'],
    hiringManager: 'Dr. Aris Thorne'
  }
];

export const MOCK_CANDIDATES = [
  {
    id: 'cand-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 234-5678',
    title: 'Senior Frontend Architect',
    location: 'Seattle, WA',
    experience: '6 years',
    skills: ['React', 'TypeScript', 'Node.js', 'Vite', 'Ant Design', 'GraphQL'],
    matchScore: 94,
    status: 'Interview',
    appliedJobId: 'job-101',
    appliedJobTitle: 'Senior Full Stack AI Engineer',
    appliedDate: '2026-08-16',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    aiSummary: 'Outstanding match with top-tier expertise in modern React, Vite, and frontend state architectures. Strong experience leading agile teams.',
    skillGaps: ['LangChain (Basic familiarity)'],
    strengths: ['100% React & TypeScript match', '6+ years enterprise scale experience', 'Excellent system design portfolio']
  },
  {
    id: 'cand-2',
    name: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 876-5432',
    title: 'Full Stack & AI Engineer',
    location: 'San Francisco, CA',
    experience: '5 years',
    skills: ['React', 'Python', 'Node.js', 'LangChain', 'MongoDB', 'PyTorch'],
    matchScore: 91,
    status: 'Assessment',
    appliedJobId: 'job-101',
    appliedJobTitle: 'Senior Full Stack AI Engineer',
    appliedDate: '2026-08-17',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    aiSummary: 'Extremely strong AI background with direct experience deploying LLM agents and Python microservices backed by React frontends.',
    skillGaps: ['Ant Design (Prefers Tailwind)'],
    strengths: ['Strong LangChain & AI agent background', 'Full stack capabilities', 'Fast technical assessment score']
  },
  {
    id: 'cand-3',
    name: 'Emily Watson',
    email: 'emily.w@example.com',
    phone: '+1 (555) 345-6789',
    title: 'Principal UI/UX Designer',
    location: 'Austin, TX',
    experience: '7 years',
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'CSS/AntD'],
    matchScore: 96,
    status: 'Selected',
    appliedJobId: 'job-102',
    appliedJobTitle: 'Lead Product Designer (UI/UX)',
    appliedDate: '2026-08-19',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    aiSummary: 'Top tier candidate with proven track record scaling enterprise design systems and accessibility standards across multi-platform web apps.',
    skillGaps: [],
    strengths: ['Deep design systems mastery', '7 years experience in tech scale-ups', 'Unanimous team interview recommendation']
  },
  {
    id: 'cand-4',
    name: 'Marcus Brody',
    email: 'm.brody@example.com',
    phone: '+1 (555) 901-2345',
    title: 'Cloud & Infrastructure Engineer',
    location: 'New York, NY',
    experience: '4 years',
    skills: ['AWS', 'Docker', 'Terraform', 'Kubernetes', 'CI/CD'],
    matchScore: 88,
    status: 'Screening',
    appliedJobId: 'job-103',
    appliedJobTitle: 'DevOps & Cloud Infrastructure Architect',
    appliedDate: '2026-08-21',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    aiSummary: 'Solid infrastructure background with hands-on AWS automation experience. Minor gaps in multi-cluster setup.',
    skillGaps: ['Advanced Kubernetes mesh configuration'],
    strengths: ['AWS Certified Solutions Architect', 'Strong Terraform automation experience']
  },
  {
    id: 'cand-5',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+1 (555) 456-7890',
    title: 'Frontend Engineer',
    location: 'Chicago, IL',
    experience: '3 years',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Redux', 'Git'],
    matchScore: 78,
    status: 'Applied',
    appliedJobId: 'job-101',
    appliedJobTitle: 'Senior Full Stack AI Engineer',
    appliedDate: '2026-08-22',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    aiSummary: 'Solid frontend experience, but junior for senior requirements. Candidate demonstrates high growth trajectory.',
    skillGaps: ['Node.js backend depth', 'LangChain/AI integrations', 'TypeScript mastery'],
    strengths: ['Clean React code style', 'Enthusiastic learner']
  },
  {
    id: 'cand-6',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 678-9012',
    title: 'Senior DevOps Specialist',
    location: 'Denver, CO',
    experience: '8 years',
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'GitHub Actions', 'Python'],
    matchScore: 97,
    status: 'Hired',
    appliedJobId: 'job-103',
    appliedJobTitle: 'DevOps & Cloud Infrastructure Architect',
    appliedDate: '2026-08-10',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    aiSummary: 'Exceptional Cloud Architect. Completed hiring process and accepted offer.',
    skillGaps: [],
    strengths: ['8+ years experience', 'Successfully executed offer letter']
  }
];

export const PIPELINE_STAGES = [
  'Applied',
  'Screening',
  'Interview',
  'Assessment',
  'Selected',
  'Rejected',
  'Hired'
];

export const MOCK_ANALYTICS = {
  funnel: [
    { stage: 'Applied', count: 169 },
    { stage: 'Screening', count: 92 },
    { stage: 'Interview', count: 48 },
    { stage: 'Assessment', count: 26 },
    { stage: 'Selected', count: 12 },
    { stage: 'Hired', count: 7 }
  ],
  monthlyApplications: [
    { month: 'Mar', total: 45, matched: 18 },
    { month: 'Apr', total: 62, matched: 28 },
    { month: 'May', total: 78, matched: 35 },
    { month: 'Jun', total: 95, matched: 42 },
    { month: 'Jul', total: 120, matched: 58 },
    { month: 'Aug', total: 169, matched: 84 }
  ],
  departmentStats: [
    { name: 'Engineering', activeJobs: 6, applicants: 112, avgScore: 86 },
    { name: 'Design', activeJobs: 3, applicants: 48, avgScore: 91 },
    { name: 'Infrastructure', activeJobs: 2, applicants: 34, avgScore: 84 },
    { name: 'AI Research', activeJobs: 4, applicants: 76, avgScore: 88 }
  ]
};
