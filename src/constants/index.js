import { meta, shopify, starbucks, tesla, } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: motion,
        name: "Motion",
        type: "Animation",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    }
];

export const experiences = [
    {
        title: "Accountant Clerk",
        company_name: "Grand Touring Automobiles",
        icon: starbucks,
        iconBg: "#accbe1",
        date: "June 2023 - August 2023",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        title: "Full Stack Developer",
        company_name: "Perdictify Pro.",
        icon: tesla,
        iconBg: "#fbc3bc",
        date: "Apr 2024 - Present",
        points: [
            "Developing a website using Next.js, React.js, and Tailwind CSS to provide users with an interative platform that showcases the companies' services, background, and contact",
        ],
    },
    {
        title: "Software Engineer Intern",
        company_name: "Robarts Research Institute",
        icon: shopify,
        iconBg: "#b7e4c7",
        date: "May 2024 - Present",
        points: [
            "Devloping a GUI for the camera using Python",
            "Developing a camera UI using Kotlin to enable livestreaming connection from a raspberry pi to an android device",
            "Implementing machine learning using Python, OpenCV, and PyTorch to train a dataset of toothbrush movements",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/derektan12',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/derektan12/',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'Pie In Past',
        description: 'Developed a game application in Unity.',
        link: 'https://github.com/derektan12/Pie-in-Past.git',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'Predictify Pro.',
        description: 'Developed a full-stack responsive website for real estate market trends, facilitating the use of AI.',
        link: 'https://github.com/derektan12/Predictify-Pro.git',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Smart Toothbrush',
        description: 'Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.',
        link: 'https://github.com/derektan12/Smart-Toothbrush.git',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Intra-Oral Camera',
        description: 'Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.',
        link: 'https://github.com/derektan12/IOC.git',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Real-Estate Application',
        description: 'Developed a web application for real estate listings, facilitating property searches and connecting buyers with sellers.',
        link: 'https://github.com/adrianhajdin/projects_realestate',
    },
    {
        iconUrl: summiz,
        theme: 'btn-back-yellow',
        name: 'AI Summarizer Application',
        description: 'App that leverages AI to automatically generate concise & informative summaries from lengthy text content, or blogs.',
        link: 'https://github.com/adrianhajdin/project_ai_summarizer',
    }
];