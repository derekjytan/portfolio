import React, { useState, useEffect } from 'react'
import { useTypewriter } from 'react-simple-typewriter'

const Instructions = ({ text }) => {
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        const showTimeout = setTimeout(() => {
            setShowContent(true)
        }, 1000)

        const hideTimeout = setTimeout(() => {
            setShowTextBox(false)
        }, 5000)

        return () => {
            clearTimeout(showTimeout)
            clearTimeout(hideTimeout)
        }
    }, [])

    const [typedText] = useTypewriter({
        words: text,
        loop: 1,
        typeSpeed: 30,
        delaySpeed: 1500,
        deleteSpeed: 0,
    })

    return (
        <>
        {showContent && (
            <div className='instructions-box'>
                <div className='text'>{typedText}</div>
            </div>
        )}
        </>
    )
}

export default Instructions