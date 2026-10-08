import { useEffect, useRef } from 'react'
import heroImg from '../assets/profile.jpg'

export default function Hero({ id, onSectionChange }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onSectionChange(id)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [id, onSectionChange])

  const handleScrollTo = (targetId) => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id={id} ref={sectionRef} className="hero">
      <div className="section-container hero-wrapper">
        <div className="hero-content">
          <span className="hero-subtitle animate-pop-in">Welcome to my portfolio</span>
          <h1 className="hero-title animate-slide-up">
            Hi, I'm <span className="highlight">Satyam Patel</span>
          </h1>
          <p className="hero-desc animate-fade-in">
            A passionate Java Full Stack Developer specializing in building modern, interactive, 
            and premium web applications. I design sleek user interfaces and engineer robust backend systems with Spring Boot & Java.
          </p>
          <div className="hero-actions animate-fade-in-delayed">
            <button onClick={() => handleScrollTo('projects')} className="btn btn-primary">
              View Work
            </button>
            <a href="/Satyam_Patel_Software_Engineer.pdf" download="Satyam_Patel_Software_Engineer.pdf" className="btn btn-secondary">
              <svg className="icon" viewBox="0 0 24 24" style={{ width: '18px', height: '18px', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
            <button onClick={() => handleScrollTo('contact')} className="btn btn-secondary">
              Contact Me
            </button>
          </div>
        </div>
        <div className="hero-image-container animate-zoom-in">
          <div className="hero-image-glow"></div>
          <div className="floating-bubble bubble-1"></div>
          <div className="floating-bubble bubble-2"></div>
          <img src={heroImg} alt="Satyam Patel" className="hero-img" />
        </div>
      </div>
    </section>
  )
}
