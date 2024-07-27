import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <main className='bg-custom-background'>
      <Router>
      <Analytics />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/projects' element={<Projects />}/>
          <Route path='/contact' element={<Contact />}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App