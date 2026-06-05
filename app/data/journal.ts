export interface JournalEntry {
  id: string;
  date: string; // e.g., "August 2021"
  timestamp: string; // ISO format or similar for sorting: "2021-08"
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'milestone' | 'project';
  tags?: string[];
  image?: string;
}

export const journalEntries: JournalEntry[] = [
  {
    id: 'je-5',
    date: 'January 2026',
    timestamp: '2026-01',
    title: 'Completed BS in Information Technology',
    subtitle: 'Central Luzon State University',
    description: 'Successfully graduated with a BSIT degree majoring in Systems Development. Capstone project fully validated and deployed with standard QA checklist guidelines.',
    type: 'education',
    tags: ['Graduation', 'Systems Development', 'BSIT'],
    image: '/images/profile/profile.jpg'
  },
  {
    id: 'je-4',
    date: 'June 2025',
    timestamp: '2025-06',
    title: 'Transitioned to QA Specialization',
    subtitle: 'Self-Directed & Project Audits',
    description: 'Pivoted focus toward manual testing, exploratory test protocols, and comprehensive requirement auditing. Developed deep interest in visual validation and boundary cases.',
    type: 'milestone',
    tags: ['Quality Assurance', 'Exploratory Testing', 'Audit Logs'],
    image: '/images/profile/profile.jpg'
  },
  {
    id: 'je-3',
    date: 'December 2023',
    timestamp: '2023-12',
    title: 'Full-Stack Project Deployments',
    subtitle: 'Systems Development Coursework',
    description: 'Designed and deployed web projects. Built manual verification suites to double-check responsive boundaries, form validation errors, and DB transaction failures.',
    type: 'project',
    tags: ['Next.js', 'PostgreSQL', 'Form Audits'],
    image: '/images/profile/profile.jpg'
  },
  {
    id: 'je-2',
    date: 'October 2022',
    timestamp: '2022-10',
    title: 'Systems Analysis & Design Fundamentals',
    subtitle: 'Academic Milestone',
    description: 'Mastered translating complex user workflows into analytical system requirements. Created detailed entity-relationship structures and flow models.',
    type: 'education',
    tags: ['Systems Analysis', 'Workflow Mapping', 'Databases'],
    image: '/images/profile/profile.jpg'
  },
  {
    id: 'je-1',
    date: 'August 2021',
    timestamp: '2021-08',
    title: 'Started BS in Information Technology',
    subtitle: 'Central Luzon State University',
    description: 'Enrolled in Systems Development at CLSU. Commenced foundational studies in algorithms, object-oriented concepts, and software methodologies.',
    type: 'education',
    tags: ['Academic Start', 'CLSU', 'Carranglan Base'],
    image: '/images/profile/profile.jpg'
  }
];
