import { Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { earth } from "../assets/icons"

const Navbar = () => {
  return (
    <header className="header">
        <NavLink to="/" className="w-10 h-10 items-center justify-center flex">
            <img src={earth} />
        </NavLink>
        <nav className="flex text-lg gap-7 font-medium">
            <NavLink 
                to="/about" 
                className={({ isActive }) => 
                    isActive ? 'text-blue-500' : 'text-white'}>
                About
            </NavLink>
            <NavLink 
                to="/projects" 
                className={({ isActive }) => 
                    isActive ? 'text-blue-500' : 'text-white'}>
                Projects
            </NavLink>
            <NavLink
                to="/contact"
                className={({ isActive }) => 
                    isActive ? 'text-blue-500' : 'text-white'}>
                Contact
            </NavLink>
        </nav>
    </header>
  )
}

export default Navbar