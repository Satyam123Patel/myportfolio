import { useEffect, useRef } from 'react'

const projectsData = [
  {
    title: 'Pet Adoption Management System',
    desc: 'Developed a comprehensive full-stack web application connecting pet adopters with animal shelters. Implemented an interactive pet catalog, custom adoption applications, and responsive UI components.',
    tags: ['React', 'Java', 'Spring Boot', 'Hibernate', 'MySQL', 'REST APIs'],
    github: 'https://github.com/Satyam123Patel',
    demo: 'https://pet-adoption-management-system.vercel.app/'
  },
  {
    title: 'Secure JWT Auth & OTP Verification Engine',
    desc: 'Engineered a secure, stateless authorization and verification system. Includes token-based authentication (JWT) for secure user sessions, along with OTP-based email verification workflows.',
    tags: ['Spring Security', 'JWT', 'OTP Email', 'Java Mail API', 'Cryptography'],
    github: 'https://github.com/Satyam123Patel/Pet-Adoption-Management-System',
    demo: 'https://pet-adoption-management-system.vercel.app/'
  },
  {
    title: 'Pneumonia Detection from Chest X-Rays',
    desc: 'Developed a deep learning Flask web application utilizing Convolutional Neural Networks (CNNs) to analyze chest X-ray images for automated pneumonia detection. Features user dashboards, prediction histories, and diagnostic reports.',
    tags: ['Python', 'TensorFlow', 'Flask', 'OpenCV', 'CNN', 'SQLite'],
    github: 'https://github.com/Satyam123Patel/Pneumonet-V2',
    demo: 'https://pneumonet-v2-k9c6.onrender.com'
  }
]

export default function Projects({ id, onSectionChange }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onSectionChange(id)
        }
      },
      { threshold: 0.2 }
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
    <section id={id} ref={sectionRef} className="projects">
      <div className="section-container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg className="icon"><use href="/icons.svg#github-icon" /></svg>
                    Code
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                    <svg className="icon"><use href="/icons.svg#documentation-icon" /></svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
