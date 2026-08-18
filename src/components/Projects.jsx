import { useEffect, useRef } from 'react'

const projectsData = [
  {
    title: 'Pet Adoption Management System',
    desc: 'Developed a comprehensive full-stack web application connecting pet adopters with animal shelters. Implemented an interactive pet catalog, custom adoption applications, and responsive UI components.',
    tags: ['React', 'Java', 'Spring Boot', 'Hibernate', 'MySQL', 'REST APIs'],
    github: 'https://github.com/Satyam123Patel/Pet-Adoption-Management-System',
    demo: 'https://pet-adoption-management-system.vercel.app/'
  },
  {
    title: 'Pneumonia Detection from Chest X-Rays',
    desc: 'Developed a deep learning Flask web application utilizing Convolutional Neural Networks (CNNs) to analyze chest X-ray images for automated pneumonia detection. Features user dashboards, prediction histories, and diagnostic reports.',
    tags: ['Python', 'TensorFlow', 'Flask', 'OpenCV', 'CNN', 'SQLite'],
    github: 'https://github.com/Satyam123Patel/Pneumonet-V2',
    demo: 'https://pneumonet-v2-k9c6.onrender.com'
  },
  {
    title: '1,000+ User Scalability & Load Testing Engine',
    desc: 'Engineered a local load testing suite and telemetry dashboard to benchmark web application performance under stress. Proven to handle up to 1,025 safe concurrent virtual user sessions at 1,020+ requests/sec. Developed with the assistance of Antigravity AI.',
    tags: ['Antigravity AI', 'Node.js', 'Load Testing', 'Express', 'WebSockets', 'Benchmarking'],
    github: 'https://github.com/Satyam123Patel/Load_-_Scalability_Testing_System',
    demo: 'https://github.com/Satyam123Patel/Load_-_Scalability_Testing_System'
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
                  {project.demo && project.demo !== project.github && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                      <svg className="icon"><use href="/icons.svg#documentation-icon" /></svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
