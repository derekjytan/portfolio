import { grandtouring, robarts, predictify, pie, } from "../assets/images"
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
} from "../assets/icons"

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: python,
        name: "Python",
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
        imageUrl: java,
        name: "Java",
        type: "Backend",
    },
    {
        imageUrl: kotlin,
        name: "Kotlin",
        type: "Backend",
    },
    {
        imageUrl: figma,
        name: "Figma",
        type: "Design",
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
        imageUrl: matlab,
        name: "Matlab",
        type: "Backend",
    },
    {
        imageUrl: csharp,
        name: "C#",
        type: "Backend",
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
    },
    {
        imageUrl: cplus,
        name: "C++",
        type: "Backend",
    }, 
    {
        imageUrl: unity,
        name: "Unity",
        type: "Software",
    }, 
    {
        imageUrl: blender,
        name: "Blender",
        type: "Software",
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
        imageUrl: aws,
        name: "AWS",
        type: "Cloud",
    }, 

]

export const experiences = [
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
    {
        title: "Front End Developer",
        company_name: "Predictify Pro",
        icon: predictify,
        iconBg: "#4682b4",
        date: "Apr 2024 - Present",
        points: [
            "Developing a website using Next.js, React.js, and Tailwind CSS to provide users with an interative platform that showcases the companies' services, background, and contact",
            "Implementing machine learning models to predict real estate trends using PyTorch and AWS SageMaker, providing users with valuable insights and improving the decision-making process for users"
        ],
    },
    {
        title: "Software Developer",
        company_name: "Robarts Research Institute",
        icon: robarts,
        iconBg: "#b7e4c7",
        date: "May 2024 - Present",
        points: [
            "Developing an android app using Kotlin to enable livestreaming connection from a raspberry pi to an android device",
            "Implementing machine learning using Python and PyTorch to train a dataset of toothbrush movements",
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
        link: 'https://www.linkedin.com/in/derekjytan/',
    }
]

export const projects = [
    {
        iconUrl: pie,
        theme: 'btn-back-red',
        name: 'Pie In Past',
        description: 'Developed a pixel shooter game in Unity ',
        link: 'https://github.com/derekjytan/Pie-in-Past.git',
    },
    {
        iconUrl: predictify,
        theme: 'btn-back-green',
        name: 'Predictify',
        description: 'Developed a front end responsive website for real estate market trends, facilitating the use of AI.',
        link: 'https://github.com/derekjytan/Predictify-Pro.git',
    },
    {
        theme: 'btn-back-blue',
        name: 'Smart Toothbrush',
        description: 'Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.',
        link: 'https://github.com/derekjytan/Smart-Toothbrush.git',
    },
    {
        theme: 'btn-back-pink',
        name: 'Intra-Oral Camera',
        description: 'Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.',
        link: 'https://github.com/derekjytan/IOC.git',
    },
]

export const resume = [
    {
        link: ''
    }
]
