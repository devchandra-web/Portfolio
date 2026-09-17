export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Full Stack Java & Spring Development',
    description: 'Engineering enterprise-grade full stack applications using Java, Spring Boot, Spring Security, REST APIs, and modern React frontends.',
    iconName: 'Code',
    deliverables: [
      'Spring Boot RESTful Microservices & APIs',
      'Spring Security Authentication & Role-Based Access Control',
      'Clean Layered Architecture (Controller, Service, DAO)',
      'Thread-Safe Code Standards & Performance Tuning',
    ],
  },
  {
    id: 'srv-2',
    title: 'React.js & Web Application Frontend',
    description: 'Building interactive single-page applications (SPAs) and reusable UI component libraries with HTML5, CSS3, JavaScript, and React.',
    iconName: 'Atom',
    deliverables: [
      'Reusable Component Libraries & Custom Hooks',
      'State Orchestration & Responsive UI Design',
      'Bootstrap & Tailwind CSS Styling',
      'Optimistic Rendering & Smooth User Interactions',
    ],
  },
  {
    id: 'srv-3',
    title: 'Database Design & ORM Persistence',
    description: 'Designing normalized relational databases in MySQL and executing efficient object-relational mapping with Spring Data JPA and Hibernate.',
    iconName: 'Database',
    deliverables: [
      'Relational Database Schema Design (MySQL)',
      'Spring Data JPA & Hibernate Repository Abstraction',
      'Optimized SQL Queries & Indexing Strategy',
      'ACID Transaction Security & Data Integrity',
    ],
  },
  {
    id: 'srv-4',
    title: 'Responsive Web Interface Design',
    description: 'Crafting fluid mobile-first layouts that adapt perfectly across smartphones, tablets, and desktop displays with zero horizontal overflow.',
    iconName: 'Smartphone',
    deliverables: [
      'Mobile-First Layouts (Bootstrap & Tailwind CSS)',
      'Cross-Browser Rendering (Chrome, Firefox, Safari)',
      'Accessible Form Validation & Touch Targets',
      'Pixel-Perfect Conversion from Design Spec',
    ],
  },
  {
    id: 'srv-5',
    title: 'REST API Integration & Testing',
    description: 'Developing secure REST endpoints and testing payloads end-to-end with Postman, ensuring robust JSON contracts between server and client.',
    iconName: 'ArrowLeftRight',
    deliverables: [
      'REST API Design & End-to-End Postman Collection Test Suite',
      'Type-Safe JSON Payload Validation',
      'HTTP Status Code & Exception Handling Rules',
      'API Authentication Headers & Token Management',
    ],
  },
  {
    id: 'srv-6',
    title: 'SDLC, Version Control & Code Hygiene',
    description: 'Applying Agile SDLC methodologies, Git/GitHub version control, root-cause debugging, and clean code principles to every project.',
    iconName: 'CheckCircle',
    deliverables: [
      'Git & GitHub Branching Strategy & Pull Request Reviews',
      'Root-Cause Debugging & Issue Resolution',
      'Eclipse & STS Development Workflows',
      'Clean Code & Documentation Standards',
    ],
  },
];
