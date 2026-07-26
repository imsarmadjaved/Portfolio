export const portfolioData = {
    personal: {
        name: "Muhammad Sarmad Javed",
        initials: "MSJ",
        title: "Full Stack Developer",
        email: "sarmadofficial.6@gmail.com",
        phone: "+92 328 7900729",
        location: "Lahore, Punjab, Pakistan",
        availability: "Open to opportunities",
        resumeUrl: "/resume/Muhammad_Sarmad_Javed_Resume.pdf",
        socialLinks: {
            github: "https://github.com/imsarmadjaved",
            linkedin: "https://linkedin.com/in/imsarmadjaved",
            email: "mailto:sarmadofficial.6@gmail.com"
        }
    },

    about: {
        summary: "AI-driven Full Stack Developer specializing in the MERN stack and AI-enhanced web applications. I combine reliable backend architecture with thoughtful interfaces to build scalable products, REST APIs, and maintainable solutions with a strong focus on testing, security, and performance.",
        highlights: [
            "MERN Stack Developer",
            "Experience with API Integration",
            "Strong foundation in OOP and DSA",
            "Fast Learner",
        ]
    },

    footer: {
        brandDescription: "Full Stack Developer passionate about building modern web applications with React, Node.js, and MongoDB. Focused on writing clean, maintainable code and creating exceptional user experiences.",
        links: {
            product: [
                { name: 'Home', href: 'home', type: 'section' },
                { name: 'About', href: 'about', type: 'section' },
                { name: 'Skills', href: 'skills', type: 'section' },
                { name: 'Projects', href: 'projects', type: 'section' },
                { name: 'Experience', href: 'experience', type: 'section' },
                { name: 'Contact', href: 'contact', type: 'section' }
            ],
            connect: [
                { name: 'GitHub', href: 'https://github.com/imsarmadjaved', type: 'external', icon: 'github' },
                { name: 'LinkedIn', href: 'https://linkedin.com/in/imsarmadjaved', type: 'external', icon: 'linkedin' },
                { name: 'Email', href: 'mailto:sarmadofficial.6@gmail.com', type: 'external', icon: 'email' }
            ],
            legal: []
        }
    },

    skills: {
        frontend: [
            { name: "React.js", level: 85, icon: "⚛️" },
            { name: "Next.js", level: 75, icon: "▲" },
            { name: "JavaScript", level: 85, icon: "📜" },
            { name: "TypeScript", level: 70, icon: "🔷" },
            { name: "HTML5", level: 90, icon: "🌐" },
            { name: "CSS3", level: 85, icon: "🎨" },
            { name: "Tailwind CSS", level: 80, icon: "💨" }
        ],
        backend: [
            { name: "Node.js", level: 80, icon: "🚀" },
            { name: "Express.js", level: 80, icon: "⚡" },
            { name: "RESTful APIs", level: 85, icon: "🔄" },
            { name: "MVC Architecture", level: 75, icon: "🏗️" },
            { name: "Python", level: 70, icon: "🐍" },
            { name: "Java", level: 65, icon: "☕" },
            { name: "JWT Authentication", level: 70, icon: "🔐" }
        ],
        databases: [
            { name: "MongoDB", level: 60, icon: "🍃" },
            { name: "PostgreSQL", level: 70, icon: "🐘" },
            { name: "SQL / NoSQL", level: 70, icon: "◫" }
        ],
        tools: [
            { name: "VS Code", level: 90 },
            { name: "GitHub", level: 85 },
            { name: "Postman", level: 80 },
            { name: "Git", level: 85 },
            { name: "Cloudinary", level: 70 },
            { name: "Vercel", level: 75 },
            { name: "FastAPI", level: 65 },
            { name: "ChatGPT", level: 80 }
        ],
        softSkills: [
            { name: "Teamwork", level: 85 },
            { name: "Communication", level: 80 },
            { name: "Agile Collaboration", level: 75 },
            { name: "Troubleshooting", level: 85 },
            { name: "Code Reviews", level: 75 },
            { name: "Technical Writing", level: 70 }
        ]
    },

    projects: [
        {
            id: 1,
            title: "NexTrade",
            description: "An AI-enhanced B2B marketplace connecting wholesalers and retailers, with scalable REST APIs, optimized media delivery, and intelligent product recommendations.",
            image: "/images/projects/nextrade.png",
            technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Python", "Cloudinary"],
            liveUrl: "https://nextrade-frontend.vercel.app/",
            githubUrl: "https://github.com/imsarmadjaved/nextrade-frontend",
            featured: true
        },
        {
            id: 2,
            title: "AI Recipe Generator",
            description: "An AI-based recipe generator that turns available ingredients into recipe ideas through a focused, responsive web experience.",
            image: "/images/projects/ai-recipe.png",
            technologies: ["React.js", "Tailwind CSS", "AI API"],
            liveUrl: "https://ai-recipe-generator-nine.vercel.app/",
            githubUrl: "https://github.com/imsarmadjaved/Ai-Recipe-Generator",
            featured: false
        },
        {
            id: 3,
            title: "First E-commerce Page",
            description: "An early responsive e-commerce interface built to strengthen practical React and Tailwind CSS skills.",
            image: null,
            technologies: ["React.js", "Tailwind CSS"],
            liveUrl: "https://first-ecommerce-react-qy7u.vercel.app/",
            githubUrl: "https://github.com/imsarmadjaved/First--Ecommerce-React-",
            featured: false
        },
        {
            id: 4,
            title: "React Portfolio",
            description: "A portfolio interface built with React and Tailwind CSS, featuring dark and light presentation modes.",
            image: null,
            technologies: ["React.js", "Tailwind CSS"],
            liveUrl: "https://portfolio-react-ecru-two.vercel.app/",
            githubUrl: "https://github.com/imsarmadjaved/portfolio_react",
            featured: false
        },
        {
            id: 5,
            title: "Job Portal",
            description: "A MERN stack job portal with role-based access for managing opportunities and applications.",
            image: null,
            technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
            liveUrl: "https://job-portal-pmvm.vercel.app/",
            githubUrl: "https://github.com/imsarmadjaved/Job-Portal",
            featured: true
        },
        {
            id: 6,
            title: "RAG Resume System",
            description: "An AI-powered recruitment platform for resume analysis, semantic search, skill matching, and structured candidate comparison.",
            image: null,
            technologies: ["Next.js", "Python", "FastAPI", "MongoDB", "Pinecone", "OpenAI"],
            liveUrl: "https://rag-system-wkm3.vercel.app/",
            githubUrl: "https://github.com/imsarmadjaved/RAG_SYSTEM",
            featured: true
        },
    ],

    experience: [
        {
            company: "Amrood Labs",
            position: "MERN Stack Developer Intern",
            duration: "Feb 2026 – Apr 2026",
            location: "Lahore, Punjab, Pakistan",
            description: "Developed and maintained responsive MERN applications, REST API integrations, and reliable cross-device experiences.",
            achievements: [
                "Engineered responsive MERN applications with a focus on performance and efficient implementation",
                "Developed and integrated RESTful APIs with Node.js and Express.js to support reliable frontend–backend data flow",
                "Tested cross-browser compatibility and mobile responsiveness while troubleshooting frontend and API issues",
                "Collaborated on code reviews and technical discussions to improve maintainability and version-control practices"
            ]
        }
    ],

    education: [
        {
            degree: "Bachelor's in Computer Science",
            institution: "University of South Asia",
            location: "Lahore, Pakistan",
            duration: "Apr 2022 – Jan 2026",
            grade: "CGPA: 3.83 / 4.0",
            courses: [
                "Web Design and Development",
                "Database Management",
                "Object-Oriented Programming (OOP)",
                "Software Engineering"
            ]
        },
        {
            degree: "Intermediate",
            institution: "Government Degree College Raiwind",
            location: "Raiwind, Pakistan",
            duration: "2018 – 2020",
            grade: ""
        },
        {
            degree: "Matriculation",
            institution: "Sir Syed Ahmad School",
            location: "Farooqabad, Lahore",
            duration: "2016 – 2018",
            grade: ""
        }
    ]
};