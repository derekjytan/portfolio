import { grandtouring, robarts, predictify, pie, pantry, songguessr, mely, flipthatsheet} from "../assets/images"
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
    tensorflow,
    keras,
    opencv,
    numpy,
    scikitlearn,
    jupyter,
    mediapipe

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
        name: "Tailwind",
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
        imageUrl: tensorflow,
        name: "TensorFlow",
        type: "Software",
    }, 
    {
        imageUrl: keras,
        name: "Keras",
        type: "Software",
    }, 
    {
        imageUrl: scikitlearn,
        name: "SciKit-Learn",
        type: "Software",
    }, 
    {
        imageUrl: pytorch,
        name: "PyTorch",
        type: "Software",
    }, 
    {
        imageUrl: numpy,
        name: "Numpy",
        type: "Software",
    }, 
    {
        imageUrl: pandas,
        name: "Pandas",
        type: "Software",
    }, 
    {
        imageUrl: opencv,
        name: "OpenCV",
        type: "Software",
    }, 
    {
        imageUrl: jupyter,
        name: "Jupyter",
        type: "Software",
    }, 
    {
        imageUrl: unity,
        name: "Unity",
        type: "Software",
    },
]

export const experiences = [
    // {
    //     title: "Software Engineer Intern",
    //     company_name: "Mely.ai",
    //     icon: mely,
    //     iconBg: "#FFFFFF",
    //     date: "Sept 2024 - Present",
    //     points: [
    //     ],
    // },
    {
        title: "Undergraduate Summer Research Student - Machine Learning Intern",
        company_name: "Robarts Research Institute",
        icon: robarts,
        iconBg: "#b7e4c7",
        date: "May 2024 - Aug 2024",
        points: [
            "Spearheaded the development of a Convolutional Neural Network (CNN) in Python using TensorFlow/Keras to identify dental health conditions, resulting in a 100% improvement in classification and labeling accuracy",
            "Improved model prediction accuracy by 60% through advanced data preprocessing and augmentation techniques such as normalization and rescaling, maximizing performance on limited labeled data",
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
            "Assisted the accounting department in preparing monthly, quartely, and annual finiancial reports.",
            "Processed and managed 500+ customer invoices to ensure payments are collected and paid on time.",
            "Performed 100+ bank reconciliations and updated journal entries, ensuring all financial transactions are accurately recorded.",
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
        description: 'Track your food inventory and receive personalized recipe recommendations!',
        link: 'https://github.com/derekjytan/PantryPilot.git',
        tech: [
            { imageUrl: nextjs },
            { imageUrl: react },
            { imageUrl: mui },
            { imageUrl: express },
            { imageUrl: nodejs },
            { imageUrl: firebase },
        ]
    },
    {
        iconUrl: flipthatsheet,
        theme: 'btn-back-red',
        name: 'FlipThatSheet',
        description: 'Flip your music sheets with just a head tilt!',
        link: 'https://github.com/derekjytan/FlipThatSheet.git',
        tech: [
            { imageUrl: nextjs },
            { imageUrl: react },
            { imageUrl: mui },
            { imageUrl: tailwindcss },
            { imageUrl: express },
            { imageUrl: nodejs },
            { imageUrl: python },
            { imageUrl: flask },
            { imageUrl: mongodb },
            { imageUrl: tensorflow },
            { imageUrl: mediapipe },
            { imageUrl: opencv },

        ]
    },
    {
        iconUrl: songguessr,
        theme: 'btn-back-red',
        name: 'SongGuessr',
        description: 'Test how well you know your top 5 artists from Spotify!',
        // tech: 'Next.js, React, Tailwind, Python, Flask, Spotify API',
        link: 'https://github.com/derekjytan/SongGuessr.git',
        tech: [
            { imageUrl: nextjs },
            { imageUrl: react },
            { imageUrl: tailwindcss },
            { imageUrl: python },
            { imageUrl: flask },
        ]
    },
    {
        iconUrl: pie,
        theme: 'btn-back-red',
        name: 'Pie In The Past',
        description: 'Play as an astronaut and travel back in time to find the missing pie!',
        link: 'https://github.com/derekjytan/Pie-in-Past.git',
        tech: [
            { imageUrl: csharp},
            { imageUrl: unity}
        ]
    },
]

export const resume = [
    {
        link: ''
    }
]
