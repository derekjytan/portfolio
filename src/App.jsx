import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <main className="bg-custom-background">
      <BrowserRouter>
        <Analytics />
        <Navbar />

        {/* Main content */}
        <div>
          <section id="home">
            <Home />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="projects">
            <Projects />
          </section>
        </div>
      </BrowserRouter>
    </main>
  );
};

export default App;
