export const portfolioData = {
    personal: {
        name: "Muhammad Sarmad Javed",
        initials: "MSJ",
        title: "Full Stack Developer",
        email: "sarmadofficial.6@gmail.com",
        phone: "+92 328 7900729",
        location: "Lahore, Punjab, Pakistan",
        availability: "Open to opportunities",
        resumeUrl: "/Muhammad_Sarmad_Javed_FG.pdf",
        socialLinks: {
            github: "https://github.com/imsarmadjaved",
            linkedin: "https://linkedin.com/in/imsarmadjaved",
            email: "mailto:sarmadofficial.6@gmail.com"
        }
    },

    about: {
        summary: "Full Stack Developer with hands-on experience developing modern web applications using React.js, Node.js, Express.js, MongoDB, JavaScript, HTML, CSS, and Next.js. Experienced in building responsive user interfaces, translating UI designs into functional components, and integrating REST APIs with front-end applications. Strong understanding of responsive web design, cross-browser compatibility, and performance optimization. Comfortable working in collaborative development environments using version control systems like Git/GitHub workflows, code reviews, and Agile practices. Passionate about writing clean, maintainable code, debugging complex issues, and improving user experience and interface performance.",
        highlights: [
            "MERN Stack Developer",
            "Experience with API Integration",
            "Strong foundation in OOP and Software Engineering",
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
            legal: [
                { name: 'Privacy', href: '#privacy', type: 'section' },
                { name: 'Terms', href: '#terms', type: 'section' }
            ]
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
            { name: "MVC Architecture", level: 75, icon: "🏗️" }
        ],
        databases: [
            { name: "MongoDB", level: 80, icon: "🍃" },
            { name: "MySQL", level: 70, icon: "🐬" }
        ],
        tools: [
            "VS Code", "GitHub", "Postman", "Microsoft Office", "Git", "Browser DevTools"
        ],
        softSkills: [
            "Teamwork", "Communication", "Agile Collaboration",
            "Problem Solving", "Troubleshooting", "Code Reviews"
        ]
    },

    projects: [
        {
            id: 1,
            title: "NexTrade",
            description: "A local wholesale marketplace platform built with MERN stack. Enables seamless connection between wholesalers and retailers with real-time inventory management.",
            image: "/assets/nextrade.png",
            technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
            liveUrl: "https://nextrade-frontend.vercel.app/",
            githubUrl: "https://github.com/imsarmadjaved/nextrade-frontend",
            featured: true
        },
        {
            id: 2,
            title: "AI Recipe Generator",
            description: "Ai based project showcasing integration of AI APIs with modern web applications. Generate recipes by using given ingredients.",
            image: "/images/Ai-recipie.png",
            technologies: ["React.js"],
            liveUrl: "https://ai-recipe-generator-nine.vercel.app/",
            githubUrl: "https://github.com/imsarmadjaved/Ai-Recipe-Generator",
            featured: false
        }
    ],

    experience: [
        {
            company: "Amrood Labs",
            position: "MERN Stack Developer Intern",
            duration: "02/2026 - Current",
            location: "Lahore, Pakistan",
            description: "Working on developing modern web applications using the MERN stack.",
            achievements: [
                "Developed responsive web interfaces using React.js, HTML5, CSS3, and JavaScript, ensuring compatibility across modern browsers and devices",
                "Translated UI requirements into reusable React components following clean code and modular design practices",
                "Integrated front-end components with backend REST APIs using asynchronous JavaScript and modern data-fetching patterns",
                "Implemented responsive layouts and mobile-friendly designs to improve usability across desktop and mobile platforms",
                "Debugged front-end and API integration issues using browser developer tools and Postman",
                "Assisted in the maintenance of existing applications, ensuring system reliability and performance"
            ]
        }
    ],

    education: [
        {
            degree: "Bachelor's in Computer Science",
            institution: "University Of South Asia",
            location: "Lahore, Pakistan",
            duration: "2022 - 2026",
            grade: "CGPA: 3.83/4.0",
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
            duration: "2018 - 2020",
            grade: ""
        },
        {
            degree: "Matriculation",
            institution: "Sir Syed Ahmad School",
            location: "FarooqAbad, Lahore",
            duration: "2016 - 2018",
            grade: ""
        }
    ]
};