export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type?: 'work' | 'education';
  isCurrent?: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Frontend Developer',
    company: 'Ascella InfoSec',
    location: 'Chandigarh | Remote',
    period: 'March 2025 – Present',
    type: 'work',
    isCurrent: true,
    summary: 'Building high-performance, responsive web interfaces and reusable components using Next.js, TypeScript, JavaScript, and Tailwind CSS.',
    responsibilities: [
      'Converted Figma designs into responsive, production-ready UI components using Next.js and Tailwind CSS.',
      'Collaborated using Git/GitHub for version control, code reviews, and streamlined continuous integration workflows.',
      'Built custom landing pages and visual components working with Framer, WordPress, and Canva.',
      'Optimized frontend accessibility, mobile responsiveness, and page performance metrics.'
    ],
    technologies: ['Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer', 'Figma', 'Git', 'GitHub', 'WordPress', 'Canva'],
  },
  {
    id: 'exp-2',
    role: 'Full Stack Developer Intern',
    company: 'QSpider',
    location: 'Noida | In-Office, India',
    period: 'June 2025 – Nov 2025',
    type: 'work',
    isCurrent: false,
    summary: 'Developed end-to-end full stack web modules with Java Spring Boot REST APIs and interactive React frontend components.',
    responsibilities: [
      'Developed web modules using Java, Spring Boot, and REST APIs on the backend.',
      'Built responsive front-end components using HTML, CSS, JavaScript, and React.',
      'Worked with MySQL for database design and performed CRUD operations using JPA/Hibernate.',
      'Implemented authentication and role-based authorization using Spring Security.'
    ],
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'React', 'MySQL', 'JPA / Hibernate', 'HTML/CSS/JS'],
  },
  {
    id: 'edu-1',
    role: 'Master of Computer Application (MCA)',
    company: 'Abdul Kalam Technical University (AKTU)',
    location: 'Lucknow, Uttar Pradesh, India',
    period: '2025 – Present',
    type: 'education',
    isCurrent: true,
    summary: 'Advanced postgraduate degree program concentrating on software engineering, distributed systems, cloud computing, and advanced Java technology stacks.',
    responsibilities: [
      'Deep dive into enterprise software architecture, advanced database management systems, and web frameworks.',
      'Active participation in technical seminars, full-stack application development, and coding practice.'
    ],
    technologies: ['Advanced Java', 'Spring Boot', 'Software Architecture', 'DBMS', 'Web Technologies'],
  },
  {
    id: 'edu-2',
    role: 'Bachelor of Computer Application (BCA)',
    company: 'Chaudhary Charan Singh University (CCSU)',
    location: 'Meerut, Uttar Pradesh, India',
    period: '2022 – 2025',
    type: 'education',
    isCurrent: false,
    summary: 'Undergraduate computer application degree with foundational focus on core Java programming, web development, data structures, and database management systems.',
    responsibilities: [
      'Achieved 1st Position Certificate in College Coding Activity.',
      'Developed multiple academic projects utilizing Java, Servlets, JSP, MySQL, and Bootstrap.',
      'Built strong core foundations in Object-Oriented Programming (OOP), Data Structures & Algorithms, and SQL.'
    ],
    technologies: ['Core Java', 'Data Structures', 'MySQL', 'JSP & Servlets', 'HTML/CSS', 'C/C++'],
  },
];
