import { useState } from 'react'
import './App.css'
import './components/portfolio.css'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import BackgroundClock from './components/BackgroundClock'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  return (
    <div className="app">
      <BackgroundClock />
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main>
        <Hero id="hero" onSectionChange={setActiveSection} />
        <About id="about" onSectionChange={setActiveSection} />
        <Education id="education" onSectionChange={setActiveSection} />
        <Skills id="skills" onSectionChange={setActiveSection} />
        <Projects id="projects" onSectionChange={setActiveSection} />
        <Certifications id="certifications" onSectionChange={setActiveSection} />
        <Contact id="contact" onSectionChange={setActiveSection} />
      </main>
      <Footer />
    </div>
  )
}

export default App