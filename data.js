
/* =========================================================
   PORTFOLIO WEBSITE
   Centralized Content Configuration
   Edit this file to customize your portfolio.
   ========================================================= */

const portfolioData = {
    /* -----------------------------------------------------
       1. GENERAL INFORMATION
       ----------------------------------------------------- */

    personal: {
        name: "John Myro N. Garcia",
        shortName: "jhn arc",
        professionalTitle: "Full Stack Developer & UI/UX Designer",

        // Replace these sample texts with your preferred wording.
        tagline: "Building thoughtful digital experiences.",
        introduction:
            "I'm an Information Technology graduate passionate about web development, software development, and user-centered design.",

        aboutIntroduction:
            "I am an Information Technology graduate interested in creating practical, accessible, and user-friendly digital solutions. I enjoy combining development and design to turn ideas into meaningful experiences.",

        aboutParagraphs: [
            "My background includes web development, software development, and UI/UX design. I enjoy exploring technologies, improving interfaces, and developing solutions that respond to real user needs.",
            "I value continuous learning, collaboration, attention to detail, and writing maintainable code. I aim to keep improving my technical skills while creating useful digital products."
        ],

        // Replace with your actual image filenames.
        profileImage: "assets/images/profile.jpg",
        heroImage: "assets/images/hero.svg",
        aboutImage: "assets/images/about.svg",

        heroImageAlt: "Portrait of John Myro",
        profileImageAlt: "John Myro's profile photo",
        aboutImageAlt: "John Myro",

        heroCaption: "Development, Design, and Continuous Learning.",

        // Used by the shared navigation and footer.
        brandCaption: "Portfolio Website",

        // Optional: customize the browser tab title.
        siteTitle: "jhn_arc | Portfolio"
    },

    /* -----------------------------------------------------
       2. HOME PAGE
       ----------------------------------------------------- */

    home: {
        eyebrow: "WELCOME TO MY PORTFOLIO",

        headingStart: "Hi, I'm",
        headingHighlight: "John",

        description:
            "I’m a Full Stack Developer and UI/UX Designer interested in building functional, accessible, and visually engaging digital experiences.",

        primaryButtonText: "View My Work",
        primaryButtonLink: "projects.html",

        secondaryButtonText: "Get in Touch",
        secondaryButtonLink: "contact.html",

        showHighlights: true,

        highlightsTitle: "What I Do",

        highlightsDescription:
            "I bring development and design together to create digital solutions.",

        highlights: [
            {
                title: "Web Development",
                description:
                    "Building responsive websites with a focus on usability, structure, and maintainability."
            },
            {
                title: "UI/UX Design",
                description:
                    "Designing intuitive interfaces and thoughtful user experiences."
            },
            {
                title: "Software Development",
                description:
                    "Developing practical software solutions based on user and project requirements."
            },
            
            
        ]
    },

    /* -----------------------------------------------------
       3. ABOUT PAGE: SKILLS
       ----------------------------------------------------- */

    skills: [
        {
            id: "web-development",
            title: "Web Development",
            description:
                "Creating responsive and user-friendly websites.",
            image: "assets/icons/web-development.svg",
            imageAlt: "Web development icon"
        },
        {
            id: "ui-ux-design",
            title: "UI/UX Design",
            description:
                "Designing intuitive interfaces and user-centered experiences.",
            image: "assets/icons/ui-ux-design.svg",
            imageAlt: "UI/UX design icon"
        },
        {
            id: "software-development",
            title: "Software Development",
            description:
                "Developing applications to address practical requirements.",
            image: "assets/icons/software-development.svg",
            imageAlt: "Software development icon"
        },
        {
            id: "frontend-development",
            title: "Front-End Development",
            description:
                "Building interactive interfaces with modern web technologies.",
            image: "assets/icons/frontend-development.svg",
            imageAlt: "Front-end development icon"
        },
        {
            id: "problem-solving",
            title: "Problem Solving",
            description:
                "Analyzing requirements and finding practical solutions.",
            image: "assets/icons/problem-solving.svg",
            imageAlt: "Problem-solving icon"
        },
         {
            id: "data-entry",
            title: "Data Entry and Management",
            description:
                "Accurate and efficient input of data.",
            image: "assets/icons/data-entry.svg",
            imageAlt: "Data entry icon"
        },
         {
            id: "team-collaboration",
            title: "Team Collaboration",
            description:
                "Work effectively with diverse group members.",
            image: "assets/icons/team.svg",
            imageAlt: "Team icon"
        },
          {
            id: "time-management",
            title: "Time Management",
            description:
                "Priotize tasks to meet strict deadlines.",
            image: "assets/icons/time.svg",
            imageAlt: "Time icon"
        },
          {
            id: "communication",
            title: "Communication",
            description:
                "Clear exchange of ideas and information.",
            image: "assets/icons/communication.svg",
            imageAlt: "Communication icon"
        },
        {
            id: "adapdability",
            title: "Adaptability and Continuous Learning",
            description:
                "Quickly adjust and embrace new knowledge.",
            image: "assets/icons/adapt.svg",
            imageAlt: "Adapt icon"
        },
    ],

    /* -----------------------------------------------------
       4. PROGRAMMING AND DESIGN TECHNOLOGIES
       ----------------------------------------------------- */

    technologies: [
        {
            id: "html",
            name: "HTML",
            image: "assets/images/skills/html.png",
            imageAlt: "HTML logo"
        },
        {
            id: "css",
            name: "CSS",
            image: "assets/images/skills/css.png",
            imageAlt: "CSS logo"
        },
        {
            id: "javascript",
            name: "JavaScript",
            image: "assets/images/skills/javascript.png",
            imageAlt: "JavaScript logo"
        },
        {
            id: "vue",
            name: "Vue.js",
            image: "assets/images/skills/vue.png",
            imageAlt: "Vue.js logo"
        },
        {
            id: "bootstrap",
            name: "Bootstrap",
            image: "assets/images/skills/bootstrap.png",
            imageAlt: "Bootstrap logo"
        },
        {
            id: "tailwind",
            name: "Tailwind CSS",
            image: "assets/images/skills/tailwind-css.png",
            imageAlt: "Tailwind CSS logo"
        },
        {
            id: "figma",
            name: "Figma",
            image: "assets/images/skills/figma.png",
            imageAlt: "Figma logo"
        },
        {
            id: "nodejs",
            name: "Node.js",
            image: "assets/images/skills/nodejs.png",
            imageAlt: "Node.js logo"
        },
        {
            id: "mysql",
            name: "MySQL",
            image: "assets/images/skills/mysql.png",
            imageAlt: "MySQL logo"
        },
        {
            id: "laravel",
            name: "Laravel",
            image: "assets/images/skills/laravel.png",
            imageAlt: "Laravel logo"
        },
        {
            id: "github",
            name: "Github",
            image: "assets/images/skills/github.png",
            imageAlt: "Github logo"
        },
        {
            id: "react",
            name: "React",
            image: "assets/images/skills/react.png",
            imageAlt: "React logo"
        },
        
    ],

    /* -----------------------------------------------------
       5. WORK EXPERIENCE
       ----------------------------------------------------- */

    experience: [
 
        {
            id: "lto-gip",
            position: "GIP Administrative Aide",
            organization: "Land Transportation Office",
            location: "Burgos, Ilocos Norte",
            startDate: "October 2024",
            endDate: "September 2025",
            current: false,

            description:
                "Supported administrative and records-related operations, including document verification, plate distribution, registry encoding, and assistance with licensing and client-service activities.",

            responsibilities: [
                "Verified records and supporting documents.",
                "Assisted with the distribution and release of license plates.",
                "Supported CR/RRPL record handling and registry encoding.",
                "Assisted licensing, evaluation, and public assistance personnel."
            ]
        },

        {
            id: "mmsu-itc-internship",
            position: "Software Developer Intern",
            organization: "Information Technology Center, Mariano Marcos State University",
            location: "Batac City, Ilocos Norte",
            startDate: "September 2023",
            endDate: "December 2023",
            current: false,

            description:
                "Contributed to the development of a Facility Reservation Management System, including interface design, application functionality, documentation, and troubleshooting.",

            responsibilities: [
                "Developed front-end and back-end application functionality.",
                "Designed user interfaces and user experiences.",
                "Prepared system documentation, including use cases, ERD, and flowcharts.",
                "Gathered requirements and collaborated with project stakeholders.",
                "Performed troubleshooting and testing."
            ]
        },       

    ],

    /* -----------------------------------------------------
       6. EDUCATIONAL BACKGROUND
       ----------------------------------------------------- */

    education: [
        {
            id: "mmsu-bsit",
            qualification: "Bachelor of Science in Information Technology",
            institution: "Mariano Marcos State University",
            location: "Ilocos Norte, Philippines",

            // Update these fields with your actual school dates.
            startDate: "2020",
            endDate: "2024",

            description:
                "Studied information technology with an interest in web development, software development, and user interface design.",

            achievements: [
                "College Scholar.",
                "Research Colloquim 3rd Place NEDA Bussiness Presentation ",
            ]
        },
         {
            id: "senior-highschool",
            qualification: "Senior Highschool",
            institution: "Burgos Agro Industrial School",
            location: "Ilocos Norte, Philippines",

            // Update these fields with your actual school dates.
            startDate: "2018",
            endDate: "2020",

            description:
                "The General Academic Strand (GAS) provided versatile skills in research, communication, and adaptability for diverse opportunities.",

            achievements: [
                "With Honors",
            ]
        },
        {
            id: "junior-highschool",
            qualification: "Junior Highschool",
            institution: "Burgos Agro Industrial School",
            location: "Ilocos Norte, Philippines",

            // Update these fields with your actual school dates.
            startDate: "2014",
            endDate: "2018",

            description:
                "Technical Vocational Education provided hands on training in electrical circuits, troubleshooting, and device maintenance building pratical skills for technical careers.",

            achievements: [
                "With Honors"
            ]
        },
        {
            id: "elementary",
            qualification: "Elementary School",
            institution: "Burgos Central Elementary School",
            location: "Ilocos Norte, Philippines",

            // Update these fields with your actual school dates.
            startDate: "2008",
            endDate: "2014",

            description:
                "Elementary School built my foundation in learning, discipline, and social skills, shaping my growth and curiosity.",

            achievements: [
                "With Honors"
            ]
        },
        
    ],

    /* -----------------------------------------------------
       7. PROJECTS
       ----------------------------------------------------- */

    projects: [
        {
            id: "facility-reservation-system",
            title: "Facility Reservation Management System",

            description:
                "A management system designed to support facility reservation workflows, administrative monitoring, and reservation record management.",

            image: "assets/images/projects/facility-reservation.svg",
            imageAlt: "Facility Reservation Management System",

            technologies: [
                "Laravel",
                "Vue.js",
                "Tailwind CSS",
                "MySQL"
            ]
        },

        {
            id: "lto-plate-verification",
            title: "Plate Verification and Data Management System",

            description:
                "A plate verification application designed to help users search vehicle plate records and manage related information.",

            image: "assets/images/projects/plate-verification.png",
            imageAlt: "Plate Verification System",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "CSV"
            ]
        },

        {
            id: "portfolio-website",
            title: "Personal Portfolio Website",

            description:
                "A responsive portfolio website presenting professional information, technical skills, experience, education, and selected projects.",

            image: "assets/images/projects/portfolio.png",
            imageAlt: "Personal Portfolio Website",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript"
            ]
        },

        {
            id: "hotel-website",
            title: "Hotel Mangement System",

            description:
                "A system for managing hotel bookings, guest information, and daily operations.",

            image: "assets/images/projects/facility-reservation.svg",
            imageAlt: "Personal Portfolio Website",

            technologies: [
                "React",
                "Bootstrap",
                "Mongo DB"
            ]
        },

        {
            id: "data-grouping",
            title: "Data Grouping Program",

            description:
                "A Program that analyzes, filter, seggragates, and detects missing data for efficient information management",

            image: "assets/images/projects/data-grouping.png",
            imageAlt: "Data Grouping Program",

            technologies: [
                "HTML",
                "CSS",
                "JavaScript",
                "CSV"
            ]
        },

        {
            id: "travel-design",
            title: "Travel App Design",

            description:
                "A design concept for an easy-to-use travel app for planning and managing trips.",

            image: "assets/images/projects/travel.png",
            imageAlt: "Travel App UI/UX Design",

            technologies: [
                "Figma",
                "Wireframe"

            ]
        },

        {
            id: "app-design",
            title: "Econnect App Design",

            description:
                "Mobile - Based E-Commerce for Entrepreneurs.",

            image: "assets/images/projects/app.png",
            imageAlt: "Econnect App Design",

            technologies: [
                "Figma",
                "Wireframe"

            ]
        },
    ],

    /* -----------------------------------------------------
       8. CONTACT INFORMATION
       ----------------------------------------------------- */

    contact: {
        phone: "09267520381",
        email: "garciajohnmyro@gmail.com",
        address:"Ilocos Norte, Philippines",

        // Keep blank unless you want to provide a map URL.
        mapUrl: ""
    },

    /* -----------------------------------------------------
       9. FOOTER
       ----------------------------------------------------- */

    footer: {
        copyrightName: "John Myro N. Garcia",
        message: "Designed with care and built with code."
    }
};
