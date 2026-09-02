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
      stats: [
        ['1st Place', 'HACK KRMU 5.0 Track Winner'],
        ['3', 'Dosha balance tracking'],
        ['54h', 'National hackathon build'],
      ],
      github: 'https://github.com/Manthan-Gohil/Aayu.ai-Mobile-Application',
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
    },
    {
      name: 'Track Winner (HealthTech) — HACK KRMU 5.0',
      detail: '54-Hour National Hackathon — Aayu.ai AI Wellness Ecosystem',
    },
    {
      name: '2nd Position — Smart India Hackathon 2025',
      detail: 'Internal Selection / Competition — Problem Solving & System Build',
    },
    {
      name: '180+ Solved & 50 Days Badge — LeetCode',
      detail: 'Data Structures & Algorithms in C++ with MySQL Problem Solving',
    },
  ],
};