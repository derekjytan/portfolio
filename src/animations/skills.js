import { animate } from "framer-motion"

export const skillsAnimation = {
    initial: { 
        opacity: 0, 
        x: -50
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5, 
            ease: 'easeOut'
        }
    },
    whileHover : {
        scale: 1.1
    },
}

export const skillTextAnimation = {
    inital: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    },
    whileHover: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    }
}