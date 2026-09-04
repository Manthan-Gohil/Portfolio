import type { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Manthan Gohil',
    role: 'AI & Full Stack Developer',
    location: 'Gurgaon / Delhi NCR, India',
    email: 'manthan.gohil.cse@gmail.com',
    domain: 'github.com/Manthan-Gohil',
    availability: 'Open for select internships & roles',
    portrait: '/images/portrait.webp',
    heroChips: ['/images/portrait1.jpg', '/images/pixellearn/cover.jpg'],
    socials: {
      github: 'https://github.com/Manthan-Gohil',
      linkedin: 'https://www.linkedin.com/in/manthan-gohil/',
      leetcode: 'https://leetcode.com/u/Manthan_Gohil/',
    },
  },

  projects: [
    {
      id: 'pixellearn',
      name: 'PixelLearn',
      title: ['PIXEL', 'LEARN'],
      featured: true,
      tags: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Prisma', 'Groq AI', 'Monaco Editor'],
      year: '2026',
      client: 'AI + Full Stack SaaS',
      role: 'Lead Full Stack & AI Engineer',
      services: 'Full Stack Architecture, Code Execution, AI Career Engine',
      imgs: [
        '/images/pixellearn/cover.jpg',
        '/images/pixellearn/1.jpg',
        '/images/pixellearn/2.jpg',
        '/images/pixellearn/3.jpg',
      ],
      intro:
        'Gamified full-stack coding platform uniting interactive in-browser code execution, multi-language exercises, daily streaks, and Groq-powered AI career intelligence.',
      challenge:
        'Traditional coding tutorials isolate theory from actual coding practice, while career preparation remains siloed in third-party tools. The objective was to engineer a cohesive developer platform integrating Monaco Editor, low-latency execution sandboxing, chapter progress, and automated ATS resume scoring into a unified product.',
      approach:
        'Architected on Next.js 15 App Router with TypeScript and PostgreSQL via Prisma ORM. Integrated Monaco Editor with real-time multi-language execution and console output. Built an AI Career Intelligence engine powered by Groq for automated ATS resume scoring, skill-gap detection, and personalized career roadmap generation.',
      architecture: [
        'Next.js 15 App Router',
        'Monaco Code Editor',
        'Piston Code Execution Sandbox',
        'PostgreSQL & Prisma ORM',
        'Groq AI Career & ATS Engine',
        'Clerk Auth & Tier Management',
      ],
      features: [
        {
          title: 'Interactive In-Browser IDE',
          desc: 'Monaco Editor with real-time multi-language execution (Python, JS, Java, C++), console output stream, syntax highlighting, and exercise reset controls.',
        },
        {
          title: 'Gamified Learning Progression',
          desc: '20+ structured exercises across Python, React, and DSA with XP rewards, daily streak counters, course progress tracking, and achievement badges.',
        },
        {
          title: 'AI Career Intelligence & ATS Scoring',
          desc: 'Groq-powered career assistant providing automated ATS resume analysis, skill-gap identification, and step-by-step career milestone roadmaps.',
        },
        {
          title: 'Protected Routes & Tier Access',
          desc: 'Clerk authentication with session management, protected API routes, and Free/Pro role-based permission tiers.',
        },
      ],
      stats: [
        ['20+', 'Interactive coding exercises'],
        ['100%', 'Browser-based execution sandbox'],
        ['Groq AI', 'ATS resume scoring & roadmaps'],
      ],
      github: 'https://github.com/Manthan-Gohil/PixelLearn-Coding-Platform',
      live: 'https://pixel-learn-platform-manthan.vercel.app',
    },
    {
      id: 'codesense',
      name: 'CodeSense AI',
      title: ['CODESENSE', 'AI'],
      featured: true,
      tags: ['RAG', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI', 'React', 'Three.js'],
      year: '2025',
      client: 'AI Developer Tool',
      role: 'AI Systems & Backend Engineer',
      services: 'RAG Pipeline, Vector Embeddings, Semantic Search, FastAPI',
      imgs: [
        '/images/codesense/cover.jpg',
        '/images/codesense/1.jpg',
        '/images/codesense/2.jpg',
        '/images/codesense/3.jpg',
      ],
      intro:
        'AI-powered semantic code intelligence platform that turns public GitHub repositories into explorable, searchable, and conversational knowledge bases.',
      challenge:
        'Onboarding into unfamiliar codebases containing thousands of files is slow and fragmented. Developers struggle to understand distributed architectures, locate function call flows, and grasp interconnected dependencies across sprawling code repositories.',
      approach:
        'Engineered an end-to-end RAG pipeline using LangChain, OpenAI embeddings, and Pinecone vector search over a high-performance FastAPI backend. Built recursive code chunking supporting repositories with 10,000+ files, paired with a React and Three.js frontend featuring an interactive file tree and sub-second semantic retrieval.',
      architecture: [
        'GitHub Repo Content Ingestion',
        'Recursive Code Chunking Engine',
        'OpenAI Vector Embeddings',
        'Pinecone Vector Database',
        'FastAPI Semantic Retrieval Layer',
        'React + Three.js Interactive UI',
      ],
      features: [
        {
          title: 'Natural Language Codebase Chat',
          desc: 'Ask architectural questions, locate implementation logic, and receive cited explanations with exact file references.',
        },
        {
          title: 'Sub-Second Semantic Search',
          desc: 'Vector retrieval powered by OpenAI embeddings and Pinecone to pinpoint relevant code snippets across complex file hierarchies.',
        },
        {
          title: 'Hierarchical Repository Explorer',
          desc: 'Interactive tree navigation with live file code previews, syntax formatting, repository metadata, and analytics.',
        },
        {
          title: 'Multi-User Data Isolation',
          desc: 'Google & GitHub OAuth2 authentication with per-user data boundaries and AES-encrypted custom API key storage.',
        },
      ],
      stats: [
        ['10,000+', 'Files ingested & indexed'],
        ['< 1s', 'Semantic retrieval latency'],
        ['OAuth2', 'GitHub & Google user isolation'],
      ],
      github: 'https://github.com/Manthan-Gohil/CodeSence-AI',
      live: 'https://codesense-ai.onrender.com',
    },
    {
      id: 'travel-planner',
      name: 'Multi-Agent Travel Planner',
      title: ['AGENTIC', 'PLANNER'],
      featured: true,
      tags: ['Python', 'LangGraph', 'LangChain', 'Groq', 'MCP', 'PostgreSQL', 'Streamlit'],
      year: '2026',
      client: 'Multi-Agent AI System',
      role: 'AI Agent Architect',
      services: 'Agentic Workflows, LangGraph Routing, MCP Connectors',
      imgs: [
        '/images/travel-planner/cover.jpg',
        '/images/travel-planner/1.webp',
        '/images/travel-planner/2.webp',
        '/images/travel-planner/3.webp',
      ],
      intro:
        'LangGraph-orchestrated multi-agent travel planning system where a supervisor dynamically coordinates specialist agents for flights, hotels, weather, budget, and itinerary with human approval.',
      challenge:
        'Single-prompt LLMs fail when planning complex trips with multi-variable constraints like live flight schedules, weather conditions, and strict budget caps. Monolithic prompts hallucinate availability and produce non-executable itineraries.',
      approach:
        'Designed a modular multi-agent architecture using LangGraph. Implemented a supervisor guardrail that validates inputs and dynamically routes tasks to dedicated agents: Flight (AviationStack), Hotel (Tavily/MCP), Weather (OpenWeather), and Budget. Added PostgreSQL checkpointing for persistent state and human-in-the-loop approval before final itinerary generation.',
      architecture: [
        'User Travel Request',
        'Supervisor Guardrail Validation',
        'Dynamic Agent Routing',
        'Specialist Execution (Flight, Hotel, Weather, Budget)',
        'Model Context Protocol (MCP) Tools',
        'PostgreSQL State Checkpointing',
        'Human-in-the-Loop Approval',
      ],
      features: [
        {
          title: 'Supervisor-Driven Routing',
          desc: 'Input guardrail agent extracts constraints and dynamically routes tasks to only the required specialists rather than executing wasteful prompts.',
        },
        {
          title: 'Dedicated Specialist Agents',
          desc: 'Modular sub-agents for Flights (AviationStack), Hotels (Tavily/MCP), Weather (OpenWeather), and financial budget constraint evaluation.',
        },
        {
          title: 'Model Context Protocol (MCP)',
          desc: 'Standardized protocol connecting specialist agents with live external travel APIs and data sources.',
        },
        {
          title: 'Human-in-the-Loop Interruption',
          desc: 'LangGraph workflow interrupt mechanism allowing travelers to review, edit, and approve draft itineraries before final itinerary compilation.',
        },
      ],
      stats: [
        ['5', 'Specialized AI agents'],
        ['MCP', 'External tool protocol integration'],
        ['1 Gate', 'Human approval before finalization'],
      ],
      github: 'https://github.com/Manthan-Gohil/Multi-Agent-Travel-Planner',
    },
    {
      id: 'coursedocify',
      name: 'CourseDocify',
      title: ['COURSE', 'DOCIFY'],
      featured: false,
      tags: ['React.js', 'Node.js', 'Express', 'MongoDB', 'PDF-lib', 'XLSX', 'JWT'],
      year: '2025',
      client: 'EdTech Automation',
      role: 'Full Stack Developer',
      services: 'Document Automation, Excel Processing, JWT Authentication',
      imgs: [
        '/images/coursedocify/cover.jpg',
        '/images/coursedocify/1.jpg',
        '/images/coursedocify/2.jpg',
        '/images/coursedocify/3.jpg',
      ],
      intro:
        'Academic document automation platform that processes multiple academic files, merges them into structured course-file PDFs, and analyzes student marks from Excel to identify slow learners.',
      challenge:
        'University faculty spend days manually gathering syllabi, assignments, quizzes, and marksheets into standardized course files for accreditation audits, and manually calculating which students need remedial intervention.',
      approach:
        'Built a full-stack document pipeline with React and Node.js/Express. Implemented a multi-file upload handler that parses and merges PDFs using PDF-lib with dynamic table-of-contents generation. Added automated XLSX parsing that calculates student performance thresholds to flag slow learners for academic support.',
      architecture: [
        'Faculty Authentication (JWT)',
        'Batch File Upload Pipeline (Multer)',
        'PDF Classification & Processing',
        'Excel Marksheet Analysis (XLSX)',
        'Dynamic TOC & Cover Page Synthesis',
        'Final Course-File PDF Generation (PDF-lib)',
      ],
      features: [
        {
          title: 'Automated Course File Assembly',
          desc: 'Merges syllabus, question papers, quiz keys, and assignments into a single standardized PDF with formatted cover page and table of contents.',
        },
        {
          title: 'Slow Learner Analytics Engine',
          desc: 'Parses Excel marksheets, evaluates threshold scores, and automatically flags students requiring academic remedial attention.',
        },
        {
          title: 'Multi-Document Ingestion',
          desc: 'Upload multiple files simultaneously with automatic classification and title extraction for seamless faculty workflows.',
        },
        {
          title: 'Secure Faculty Authentication',
          desc: 'JWT authentication with bcrypt password encryption, role-based access, and secure token cookies.',
        },
      ],
      stats: [
        ['100%', 'Automated PDF assembly'],
        ['XLSX', 'Student analysis pipeline'],
        ['JWT', 'Role-based faculty security'],
      ],
      github: 'https://github.com/Manthan-Gohil/CourseDocify',
    },
    {
      id: 'aayu-ai',
      name: 'Aayu.ai',
      title: ['AAYU', 'AI'],
      featured: false,
      tags: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'HealthTech', 'JWT'],
      year: '2026',
      client: 'HealthTech Mobile Ecosystem',
      role: 'Full Stack & Mobile Engineer',
      services: 'Mobile Architecture, Food Intelligence, Doctor Consultation',
      imgs: [
        '/images/aayu/cover.jpg',
        '/images/aayu/1.webp',
        '/images/aayu/2.webp',
        '/images/aayu/3.webp',
      ],
      intro:
        'National hackathon-winning mobile application uniting Ayurvedic Prakriti profiling, computer-vision food recognition, nutrition analytics, and doctor consultation workflows.',
      challenge:
        'Traditional wellness concepts often lack accessible digital tooling, while modern fitness apps ignore holistic body constitutions (Doshas) and food compatibility rules (Viruddha Ahara).',
      approach:
        'Developed a cross-platform React Native/Expo application with TypeScript. Created a 10-point Prakriti assessment algorithm, image-based food recognition pipeline tracking macronutrients and Dosha impact, an interactive Diet AI assistant, and a full doctor appointment booking workflow. Won 1st place in the HealthTech track at HACK KRMU 5.0.',
      architecture: [
        'React Native & Expo Client',
        '10-Point Prakriti Assessment Engine',
        'Computer Vision Food Classifier',
        'Nutritional & Dosha Impact Engine',
        'Diet AI Conversational Assistant',
        'Doctor Booking & Consultation Service',
      ],
      features: [
        {
          title: 'Prakriti & Dosha Profiling',
          desc: 'Interactive 10-question constitution onboarding calculating Vata, Pitta, and Kapha scores with personalized wellness recommendations.',
        },
        {
          title: 'Food Recognition & Nutrition Scanner',
          desc: 'Capture meal photos to calculate calories, macronutrients (protein, carbs, fats), and check Ayurvedic food compatibility (Viruddha alerts).',
        },
        {
          title: 'Diet AI & Personalized Meal Plans',
          desc: 'Interactive AI diet chatbot providing Dosha-specific recipes, seasonal guidance, and automated grocery shopping lists.',
        },
        {
          title: 'Doctor Portal & Consultations',
          desc: 'Browse verified Ayurvedic practitioners, filter by specialty and consultation fee, view open slots, and book appointments.',
        },
      ],
      stats: [
        ['1st Place', 'HACK KRMU 5.0 Track Winner'],
        ['3', 'Dosha balance tracking'],
        ['54h', 'National hackathon build'],
      ],
      github: 'https://github.com/Manthan-Gohil/Aayu.ai-Mobile-Application',
    },
  ],

  experiences: [
    {
      company: 'Careerwill',
      role: 'Full Stack Web Developer Intern',
      period: 'May 2025 — July 2025',
      location: 'Delhi / Hybrid',
      description:
        'Contributed to a live, production EdTech platform used for online learning, test preparation, and student performance tracking.',
      bullets: [
        'Engineered 10+ responsive React.js components, analytics dashboards, and chatbot UI modules.',
        'Developed and optimized RESTful Node.js APIs within an MVC service-layer architecture.',
        'Implemented JWT authentication with role-based access control (RBAC) and cookie security.',
        'Collaborated with senior engineers using GitLab, validating API contracts in Postman, and performing manual testing.',
      ],
      tech: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'GitLab', 'Postman'],
      image: '/images/experience/careerwill.jpg',
      stats: '10+ Components Built',
    },
    {
      company: 'USTART',
      role: 'Web Developer Intern',
      period: 'March 2025 — April 2025',
      location: 'Remote',
      description:
        'Focused on frontend development and production UI engineering, translating high-fidelity Figma designs into pixel-accurate web applications.',
      bullets: [
        'Built responsive landing pages and interactive marketing UI components using React.js and Tailwind CSS.',
        'Ensured pixel-accurate implementation, cross-device responsiveness, and optimized asset loading.',
        'Collaborated with product designers and engineering team members using GitHub version control.',
      ],
      tech: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'Figma', 'GitHub'],
      image: '/images/experience/ustart.jpg',
      stats: 'Pixel-Perfect SaaS UI',
    },
  ],

  hackathons: [
    {
      title: 'DevXpo Hackathon 2025',
      rank: '🥇 1st Position',
      event: 'GDSC NSUT Delhi',
      date: '2025',
      project: 'Full-Stack Rapid Prototyping',
      description:
        'Secured 1st place competing in rapid full-stack product development and technical problem solving under strict time constraints.',
      tags: ['1st Place', 'GDSC NSUT', 'Full Stack', 'Rapid Build'],
      image: '/images/hackathons/devxpo.jpg',
      highlight: 'Gold Trophy Winner • GDSC NSUT',
    },
    {
      title: 'HACK KRMU 5.0',
      rank: '🥇 Track Winner (HealthTech)',
      event: '54-Hour National Hackathon',
      date: 'February 2026',
      project: 'Aayu.ai — Ayurvedic Wellness Ecosystem',
      description:
        'Won 1st place in the HealthTech track building Aayu.ai — an AI mobile app uniting Ayurvedic Prakriti profiling, food intelligence, and doctor booking.',
      tags: ['Track Winner', 'HealthTech', 'React Native', 'AI Vision'],
      image: '/images/hackathons/hack-krmu.jpg',
      link: 'https://github.com/Manthan-Gohil/Aayu.ai-Mobile-Application',
      highlight: 'National Track Winner • 54-Hour Build',
    },
    {
      title: 'Smart India Hackathon (SIH) 2025',
      rank: '🥈 2nd Position',
      event: 'Internal University Selection',
      date: '2025',
      project: 'Problem Solving & System Build',
      description:
        'Secured 2nd position in the internal hackathon selection, demonstrating strong problem-solving fundamentals, system design, and execution.',
      tags: ['2nd Place', 'SIH Internals', 'Problem Solving', 'System Design'],
      image: '/images/hackathons/sih.jpg',
      highlight: 'Podium Finish • Internal Finals',
    },
    {
      title: 'LeetCode Problem Solving',
      rank: '💻 180+ Solved & 50 Days Badge',
      event: 'Competitive Programming & DSA',
      date: '2026',
      project: 'Data Structures & Algorithms',
      description:
        'Solved 180+ problems in C++ and MySQL covering arrays, trees, dynamic programming, two pointers, and graph traversals.',
      tags: ['180+ Solved', 'C++', 'MySQL', '50 Days Badge 2026'],
      image: '/images/hackathons/leetcode.jpg',
      link: 'https://leetcode.com/u/Manthan_Gohil/',
      highlight: '50-Day Consistency Streak • 180+ DSA',
    },
  ],

  skills: [
    {
      category: 'Languages',
      skills: ['C++', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML5 / CSS3'],
    },
    {
      category: 'AI & Generative AI',
      skills: [
        'LangGraph',
        'LangChain',
        'RAG Pipelines',
        'Pydantic AI',
        'OpenAI API',
        'Groq API',
        'Model Context Protocol (MCP)',
        'Vector Search (Pinecone, FAISS, Chroma)',
        'Prompt Engineering',
      ],
    },
    {
      category: 'Full Stack & Frontend',
      skills: [
        'Next.js 15',
        'React.js',
        'Tailwind CSS',
        'Node.js',
        'Express.js',
        'FastAPI',
        'Monaco Editor',
        'Three.js',
        'React Native / Expo',
      ],
    },
    {
      category: 'Databases & ORM',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM', 'Redis', 'Mongoose'],
    },
    {
      category: 'Security & Tools',
      skills: [
        'JWT Authentication',
        'OAuth2 (Google, GitHub)',
        'Role-Based Access Control (RBAC)',
        'Docker',
        'Git & GitHub / GitLab',
        'Postman',
        'Vercel & Render',
      ],
    },
  ],

  services: [
    {
      name: 'AI & Agentic Systems',
      count: '01',
      desc: 'Designing production-ready Generative AI systems, LangGraph multi-agent workflows, and RAG pipelines grounded in external knowledge and vector databases.',
      chips: ['LangGraph', 'LangChain', 'RAG', 'Pydantic AI', 'OpenAI API', 'Groq', 'MCP', 'Vector Search'],
    },
    {
      name: 'Full Stack Engineering',
      count: '02',
      desc: 'Building scalable, secure web and SaaS applications with Next.js 15, React, TypeScript, Node.js, Express, FastAPI, PostgreSQL, and Prisma ORM.',
      chips: ['Next.js 15', 'React.js', 'TypeScript', 'Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Prisma'],
    },
    {
      name: 'Developer Tools & Code Intelligence',
      count: '03',
      desc: 'Crafting in-browser IDE experiences, semantic repository search engines, code execution sandboxes, and developer productivity tools.',
      chips: ['Monaco Editor', 'Semantic Search', 'Pinecone', 'FAISS', 'AST Analysis', 'Docker', 'Vercel'],
    },
    {
      name: 'Product & Document Automation',
      count: '04',
      desc: 'Automating complex document pipelines, PDF synthesis, Excel spreadsheet analysis, authentication systems, and role-based access control.',
      chips: ['PDF-lib', 'XLSX Parsing', 'JWT Auth', 'OAuth2', 'RBAC', 'MongoDB', 'REST APIs'],
    },
  ],

  principles: [
    {
      name: 'Build systems that scale — not just projects that run.',
      count: '01',
      desc: 'Going beyond toy demos: architecting applications with robust data models, persistent state, error handling, security, and real deployment considerations.',
      chips: ['Architecture', 'Scalability', 'System Design'],
    },
    {
      name: 'Grounded retrieval over hallucinated generation.',
      count: '02',
      desc: 'Constraining LLMs with vector search, contextual chunking, dynamic tool calling, and guardrails to deliver verifiable and trustworthy answers.',
      chips: ['RAG', 'Guardrails', 'Verification'],
    },
    {
      name: 'Full-lifecycle product ownership.',
      count: '03',
      desc: 'Bridging frontend design systems with backend performance, database design, API contracts, and intuitive developer experiences.',
      chips: ['End-to-End', 'APIs', 'UX'],
    },
    {
      name: 'Algorithmic depth and continuous practice.',
      count: '04',
      desc: 'Maintaining sharp problem-solving fundamentals in Data Structures and Algorithms with 180+ problems solved on LeetCode primarily in C++.',
      chips: ['LeetCode', 'C++', 'DSA', 'SQL'],
    },
  ],

  awards: [
    {
      name: '1st Position — DevXpo Hackathon 2025',
      detail: 'GDSC NSUT Delhi — Rapid Product Development & Engineering',
      badge: '🥇 1st Place',
    },
    {
      name: 'Track Winner (HealthTech) — HACK KRMU 5.0',
      detail: '54-Hour National Hackathon — Aayu.ai AI Wellness Ecosystem',
      badge: '🏆 Track Winner',
    },
    {
      name: '2nd Position — Smart India Hackathon 2025',
      detail: 'Internal Selection / Competition — Problem Solving & System Build',
      badge: '🥈 2nd Place',
    },
    {
      name: '180+ Solved & 50 Days Badge — LeetCode',
      detail: 'Data Structures & Algorithms in C++ with MySQL Problem Solving',
      badge: '💻 180+ Solved',
    },
  ],
};