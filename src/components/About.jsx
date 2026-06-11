import { useEffect, useRef } from 'react'

export default function About({ id, onSectionChange }) {
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

  return (
    <section id={id} ref={sectionRef} className="about">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I am a dedicated Full Stack Developer from Katni, Madhya Pradesh, with a strong foundation 
              in backend engineering and software architecture. I completed my B.Tech in Computer Science 
              and Engineering from GGITS Jabalpur in 2025, and went on to deepen my technical expertise 
              by completing a Post Graduate Diploma in Advanced Computing (PG-DAC) from C-DAC Bengaluru in 2026.
            </p>
            <p>
              My expertise spans Java, Advanced Java, Spring Boot, Hibernate, React, and database systems 
              like MySQL and MongoDB. I hold industry-recognized certifications in AWS Cloud Foundations, 
              Machine Learning Foundations, and Cisco CCNA Networking, showing my commitment to continuous learning.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-num">7.97</span>
              <span className="stat-label">B.Tech CGPA</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">62.6%</span>
              <span className="stat-label">PG-DAC Score</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">5+</span>
              <span className="stat-label">Certs Earned</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">1</span>
              <span className="stat-label">Full Stack System</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
