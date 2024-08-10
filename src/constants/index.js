import { grandtouring, robarts, predictify, pie, pantry, songguessr, } from "../assets/images"
import {
    car,
    contact,
    css,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    nextjs,
    nodejs,
    react,
    snapgram,
    tailwindcss,
    threads,
    typescript,
    python,
    java,
    kotlin,
    figma,
    matlab,
    csharp,
    cplus,
    unity,
    blender,
    pytorch,
    pandas,
    aws,
    express,
    flask,
    firebase,
    mui,
} from "../assets/icons"

export const skills = [
    {
        imageUrl: python,
        name: "Python",
        type: "Backend",
    },
    {
        imageUrl: java,
        name: "Java",
        type: "Backend",
    },
    {
        imageUrl: csharp,
        name: "C#",
        type: "Backend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: express,
        name: "Express.js",
        type: "Backend",
    },
    {
        imageUrl: flask,
        name: "Flask",
        type: "Backend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: mui,
        name: "Material UI",
        type: "Frontend",
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
        imageUrl: aws,
        name: "AWS",
        type: "Cloud",
    }, 
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Cloud",
    },
    {
        imageUrl: firebase,
        name: "Firebase",
        type: "Cloud",
    },
    {
        imageUrl: pytorch,
        name: "PyTorch",
        type: "Software",
    }, 
    {
        imageUrl: pandas,
        name: "Pandas",
        type: "Software",
    }, 
    {
        imageUrl: unity,
        name: "Unity",
        type: "Software",
    },
]

export const experiences = [
    {
        title: "Undergraduate Summer Research Student - Machine Learning Intern",
        company_name: "Robarts Research Institute",
        icon: robarts,
        iconBg: "#b7e4c7",
        date: "May 2024 - Aug 2024",
        points: [
            "Spearheaded the development of a machine learning algorithm in Python to identify dental health conditions such as plaque, cavities, and gingivitis, resulting in a 100% improvement in labeling accuracy",
            "Improved model prediction accuracy by 70% through training a Convolutional Neural Network (CNN) with PyTorch, leveraging transfer learning to maximize performance on limited labeled data",
            "Received the NSERC Undergraduate Student Research Award ($9268), a prestigious national research award in Canada"
        ],
    },
    {
        title: "Front End Developer",
        company_name: "Predictify Pro",
        icon: predictify,
        iconBg: "#4682b4",
        date: "Apr 2024 - June 2024",
        points: [
            "Developed a website using Next.js and Tailwind to provide users with an interative platform that showcase the company's services, background, and contact information",
            "Enhanced website performance by 30% through client-side routing with React Router and optimized state management using React Context API, resulting in fewer API calls, smoother interactions, and a responsive interface"
        ],
    },
    {
        title: "Accountant Analyst",
        company_name: "Grand Touring Automobiles",
        icon: grandtouring,
        iconBg: "#ffc0cb",
        date: "June 2023 - August 2023",
        points: [
            "Assist in preparing monthly, quartely, and annual finiancial reports.",
            "Processing and managing invoices to ensure payments are collected and paid on time.",
            "Performed bank reconciliations and updated journal entries, ensuring all financial transactions are accurately recorded.",
            "Managed and account for inventory, ensuring accurate records.",
        ],
    },
]

export const socialLinks = [
    // {
    //     name: 'Contact',
    //     iconUrl: contact,
    //     link: '/contact',
    // },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/derekjytan',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/derekjytan',
    }
]

export const projects = [
    {
        iconUrl: pantry,
        theme: 'btn-back-red',
        name: 'PantryPilot',
        description: 'A web app that allows users to manage their food inventory and get personalized recipe suggestions.',
        link: 'https://github.com/derekjytan/PantryPilot.git',
    },
    {
        iconUrl: songguessr,
        theme: 'btn-back-red',
        name: 'SongGuessr',
        description: 'A music quiz game that tests how well you know your top 5 artists.',
        link: 'https://github.com/derekjytan/SongGuessr.git',
    },
    {
        iconUrl: pie,
        theme: 'btn-back-red',
        name: 'Pie In Past',
        description: 'A 2D role-playing game where players are tasked to travel back in time to find the missing pie.',
        link: 'https://github.com/derekjytan/Pie-in-Past.git',
    },
]

export const resume = [
    {
        link: ''
    }
]
