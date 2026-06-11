import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
]

export default function Navbar({ activeSection, onSectionChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const percentage = (window.scrollY / totalHeight) * 100
        setScrollPercent(percentage)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      onSectionChange(id)
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
          <span className="logo-text">SP</span>
          <span className="logo-name">Satyam Patel</span>
        </a>
        
        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollPercent}%` }}></div>
      </div>
    </nav>
  )
}