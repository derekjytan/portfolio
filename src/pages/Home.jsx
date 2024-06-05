import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Loader from '../components/Loader'
import Earth from '../models/Earth'
import Star from '../models/Star'
import DialogueBox from '../components/Dialogue'
import Instructions from '../components/Instructions'
import Rocket from '../models/Rocket'
import Saturn from '../models/Saturn'

function Home() {
  const [mode, setMode] = useState('dialogue') // Initial mode
  const [cameraPosition, setCameraPosition] = useState([0, 0, 1.5]) // Inital Camera  view
  const [canvasKey, setCanvasKey] = useState(0) // Key to force Canvas reload
  const [modelsLoaded, setModelsLoaded] = useState(false) // State to track if models have loaded
  const [showTextBox, setShowTextBox] = useState(false)
  const [showStartButton, setShowStartButton] = useState(true) // State to track if start button should be shown
  const [showDialogue, setShowDialogue] = useState(false) // State to track if dialogue should be shown
  const [dialogueFinished, setDialogueFinished] = useState(false)

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      setShowTextBox(true)
    }, 100)

    const hideTimeout = setTimeout(() => {
      setShowTextBox(false)
    }, 7000)

    return () => {
      clearTimeout(showTimeout)
      clearTimeout(hideTimeout)
    }
  }, [mode])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setModelsLoaded(true)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (dialogueFinished) {
      const resetTimeout = setTimeout(() => {
        setShowStartButton(true)
        setShowDialogue(false)
        setDialogueFinished(false)
      }, 2000)
      return () => {
        clearTimeout(resetTimeout)
      }
    }
  }, [dialogueFinished])

  const toggleMode = () => {
    setMode(mode === 'normal' ? 'dialogue' : 'normal')
    setCameraPosition(mode === 'normal' ? [0, 0, 1.5] : [0, 0, 2])
    setCanvasKey((prevKey) => prevKey + 1)
    setShowStartButton(mode === 'normal' ? true : false)
    setShowDialogue(false)
  }

  const startDialogue = () => {
    setShowStartButton(false)
    setShowDialogue(true)
  }

  const adjustEarthForScreenSize = () => {
    let screenScale, screenPosition
    let rotation = [0, 0, 0]

    if (window.innerWidth < 768) {
      screenScale = [1, 1, 1]
      screenPosition = [0, 0, 0]
    }
    else {
      screenScale = [1, 1, 1]
      screenPosition = [0, 0, 0]
    }

    return [screenScale, screenPosition, rotation]
  }

  const [earthScale, earthPosition, earthRotation] = adjustEarthForScreenSize()

  return (
    <section className='main-section'>
        <Canvas 
        className={`canvas-container 
        ${mode === 'normal' ? 'grabby-cursor' : ''}`}
        key={canvasKey}
        camera={{
          position: cameraPosition,
          fov: 100
        }} 
        >
          {mode === 'normal' && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            zoomSpeed={1}
            minDistance={1}
            maxDistance={15}
          />
          )}
            <Suspense 
              fallback={<Loader onLoaderDisappear={() => setModelsLoaded(true)} />}
            >
                <directionalLight 
                  position={[1, 1, 0]}
                  intensity={8}
                />
                <ambientLight 
                  intensity={0.5}
                />
                <pointLight />
                <spotLight />
                <hemisphereLight 
                  skyColor={0xffffff}
                  groundColor={0xffffff}
                  intensity={5}
                />
                {/* Rendering the space component */}
                {/* <Cluster /> */}
                {/* <StarCluster /> */}
                {/* <Stars /> */}
                {/* <Rocket 
                  position={[0, 0, 0]}
                  mode={mode}
                  rotation={[0, 0, 0]}
                  /> */}
                <Star />
                {/* Rendering the earth component */}
                <Earth
                  position={earthPosition}
                  scale={earthScale}
                  rotation={earthRotation}
                  mode={mode}
                  />
                {/* <Saturn 
                  position={earthPosition}
                  scale={earthScale}
                  rotation={earthRotation}
                 mode={mode}
                /> */}
            </Suspense>
        </Canvas>
        {showStartButton && mode === 'dialogue' && (
          <button className='start-button' onClick={startDialogue}>
            Start Dialogue
          </button>
        )}
        <button className='toggle-button' onClick={toggleMode}> 
          {mode === 'normal' ? 'Dialogue' : 'Orbit'}
        </button>

        {modelsLoaded && showTextBox && mode === 'normal' && (
          <Instructions 
            text={[``, 'Click and drag to rotate.', 'Scroll to zoom in and out.']}
            />
        )}

        {modelsLoaded && showDialogue && mode === 'dialogue' && (
          <DialogueBox 
            text={[
              '',
              `Hey!
              I'm Derek.
              Welcome to my online portfolio!`,
              "I'm a Software Engineering student at Western University.",
              `Currently, I'm a software developer at Robarts Research Institute, 
              and a front end developer at Predictify.`,
              `Click 'About' for my skills and experiences,
              and 'Projects' to see the cool stuff I've made so far!`,
              `I'd love to connect so feel free to send me a message by clicking 'Contact'.`,
              `Click 'Orbit' to explore more about our universe!`,
            ]}
            onDialogueFinished={() => setDialogueFinished(true)}
            />
        )}
    </section>

  )
}

export default Home