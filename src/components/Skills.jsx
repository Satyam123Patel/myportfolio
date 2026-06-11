import { useEffect, useRef } from 'react'

const skillCategories = [
  {
    title: 'Programming & Core Concepts',
    skills: ['Java', 'C++', 'Object-Oriented Programming (OOP)', 'Data Structures & Algorithms (DSA)', 'MVC Architecture', 'Shell Scripting (Bash)']
  },
  {
    title: 'Web Technologies',
    skills: ['Spring Boot', 'Hibernate', 'JDBC', 'React', 'Node.js', 'Express.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript']
  },
  {
    title: 'Databases & Systems',
    skills: ['MySQL', 'MongoDB', 'Windows', 'Linux (Ubuntu)', 'Apache Tomcat']
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git & GitHub', 'VS Code', 'Eclipse', 'Maven', 'Postman', 'MySQL Workbench']
  }
]

export default function Skills({ id, onSectionChange }) {
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
    <section id={id} ref={sectionRef} className="skills">
      <div className="section-container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skills-category">
              <h3 className="skills-category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
