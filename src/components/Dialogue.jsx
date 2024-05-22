import React, { useState, useEffect } from 'react'
import { useTypewriter } from 'react-simple-typewriter'

const DialogueBox = ( { text, onDialogueFinished }) => {
    const [showContent, setShowContent] = useState(false)
    const [finishedTyping, setFinishedTyping] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true)
        }, 1000)

        return () => clearTimeout(timer)   
    }, [])

    const [typedText] = useTypewriter({
        words: text,
        loop: 1,
        typeSpeed: 30,
        delaySpeed: 1500,
        deleteSpeed: 0,
        onLoopDone: () => setFinishedTyping(true)
     })

     // Monitoring the finishedTyping state and calls onDialogueFinished 
     useEffect(() => {
        if (finishedTyping) {
            const finishTimeout = setTimeout(() => {
                onDialogueFinished()
            }, (2000))
            return () => clearTimeout(finishTimeout)
        }
     }, [finishedTyping, onDialogueFinished])
    return (
        <>
            {showContent && (
                <div className='dialogue-box'>
                    <div className='text'>{typedText}</div>
                </div>
            )}
        </>
    )
}

export default DialogueBox