export interface Skill {
  name: string;
  category: 'Backend' | 'Frontend' | 'Database' | 'Tools' | 'Styling' | 'Integration';
  level: 'Expert' | 'Advanced' | 'Proficient';
  experience: string;
  usage: string;
  iconName: string;
  featured?: boolean;
}

export const SKILL_CATEGORIES = ['All', 'Backend', 'Frontend', 'Database', 'Tools', 'Styling', 'Integration'] as const;

export const SKILLS_DATA: Skill[] = [
  // Backend & Languages
  {
    name: 'Java (SE/EE)',
    category: 'Backend',
    level: 'Expert',
    experience: '2+ Years',
    usage: 'Core Java, OOP principles, collections framework, multi-threading, Exception handling, J2EE Servlets, and JSP development.',
    iconName: 'Code2',
    featured: true,
  },
  {
    name: 'Spring Boot',
    category: 'Backend',
    level: 'Expert',
    experience: '2+ Years',
    usage: 'RESTful API engineering, Dependency Injection (IoC), Spring MVC controllers, auto-configuration, and microservice modules.',
    iconName: 'Zap',
    featured: true,
  },
  {
    name: 'Spring Security',
    category: 'Backend',
    level: 'Advanced',
    experience: '1.5+ Years',
    usage: 'Authentication managers, Role-Based Access Control (Admin, Faculty, Student), session management, and password hashing.',
    iconName: 'Shield',
    featured: true,
  },
  {
    name: 'J2EE & Servlets',
    category: 'Backend',
    level: 'Advanced',
    experience: '1.5+ Years',
    usage: 'Servlet lifecycle, HTTP request routing, session tracking, and JSP view rendering using MVC architecture.',
    iconName: 'Server',
  },

  // Frontend
  {
    name: 'React.js',
    category: 'Frontend',
    level: 'Advanced',
    experience: '2+ Years',
    usage: 'Building interactive single-page applications, component states, hooks, dynamic dashboards, and REST API integration.',
    iconName: 'Atom',
    featured: true,
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    level: 'Expert',
    experience: '2.5+ Years',
    usage: 'Async/Await fetch calls, DOM manipulation, array transformations, event handlers, and client-side logic.',
    iconName: 'FileCode',
    featured: true,
  },
  {
    name: 'HTML5 & CSS3',
    category: 'Frontend',
    level: 'Expert',
    experience: '3+ Years',
    usage: 'Semantic document markup, CSS Grid & Flexbox layouts, responsive web components, and glassmorphic designs.',
    iconName: 'Layout',
    featured: true,
  },
  {
    name: 'Bootstrap',
    category: 'Styling',
    level: 'Expert',
    experience: '2.5+ Years',
    usage: 'Responsive grid systems, custom UI themes, form styling, modal popups, and cross-browser UI consistency.',
    iconName: 'Palette',
    featured: true,
  },

  // Database
  {
    name: 'MySQL',
    category: 'Database',
    level: 'Expert',
    experience: '2+ Years',
    usage: 'Relational database design, normalized table schemas, indexed queries, joins, and ACID transactional integrity.',
    iconName: 'Database',
    featured: true,
  },
  {
    name: 'Spring Data JPA & Hibernate',
    category: 'Database',
    level: 'Advanced',
    experience: '2+ Years',
    usage: 'Object-Relational Mapping (ORM), entity lifecycle, JPQL queries, repository interfaces, and CRUD operations.',
    iconName: 'Layers',
    featured: true,
  },

  // Tools & Infrastructure
  {
    name: 'Git & GitHub',
    category: 'Tools',
    level: 'Advanced',
    experience: '2.5+ Years',
    usage: 'Version control, feature branching strategies, commit history hygiene, pull requests, and collaborative workflows.',
    iconName: 'GitBranch',
    featured: true,
  },
  {
    name: 'Postman',
    category: 'Tools',
    level: 'Advanced',
    experience: '2+ Years',
    usage: 'REST API testing, endpoint payload validation, environment variables, and authentication header testing.',
    iconName: 'Terminal',
  },
  {
    name: 'Eclipse & STS',
    category: 'Tools',
    level: 'Expert',
    experience: '2+ Years',
    usage: 'Spring Tool Suite (STS) & Eclipse IDE setup, Maven build management, server debugging, and profiling.',
    iconName: 'Cpu',
  },
  {
    name: 'AWS',
    category: 'Tools',
    level: 'Proficient',
    experience: '1+ Year',
    usage: 'Cloud deployment concepts, EC2 instance hosting, and cloud database connectivity.',
    iconName: 'Cloud',
  },

  // Integration & Methodologies
  {
    name: 'REST API Engineering',
    category: 'Integration',
    level: 'Expert',
    experience: '2+ Years',
    usage: 'Designing JSON REST endpoints, HTTP status codes, error handling, and frontend-backend data contracts.',
    iconName: 'ArrowLeftRight',
    featured: true,
  },
  {
    name: 'SDLC & Debugging',
    category: 'Integration',
    level: 'Expert',
    experience: '2.5+ Years',
    usage: 'Agile development cycles, root cause analysis, logging, performance optimization, and problem solving.',
    iconName: 'CheckCircle',
  },
];
