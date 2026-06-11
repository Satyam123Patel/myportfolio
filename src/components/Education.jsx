import { useEffect, useRef } from 'react'

const educationData = [
  {
    duration: 'Aug 2025 - Feb 2026',
    title: 'Post Graduate Diploma in Advanced Computing (PG-DAC)',
    org: 'C-DAC, Bengaluru',
    desc: 'A rigorous 6-month postgraduate program specializing in software development. Studied Java, Advanced Java, C++, .NET, OS & SDM, Data Structures & Algorithms (DSA), Web Programming Technologies (React, JavaScript, HTML, CSS, Node.js, Express.js, TypeScript), Database Technologies (MongoDB, MySQL), and Aptitude. Graduated with 62.63%.'
  },
  {
    duration: '2021 - 2025',
    title: 'Bachelor of Technology in Computer Science & Engineering',
    org: 'Gyan Ganga Institute of Technology and Sciences (GGITS), Jabalpur',
    desc: 'Built a strong foundation in core computer science. Core subjects included Cloud Computing, Agile Software Development, Machine Learning, Deep Learning, Data Structures & Algorithms, and Computer Networking. Graduated with a CGPA of 7.97 (79.7%).'
  },
  {
    duration: '2020 - 2021',
    title: 'Senior Secondary Education (Class XII - MP Board)',
    org: 'Kids Care Higher Secondary School, Katni',
    desc: 'Completed secondary high school under the MP Board, scoring 96.0%.'
  },
  {
    duration: '2018 - 2019',
    title: 'Secondary Education (Class X - MP Board)',
    org: 'Kids Care Higher Secondary School, Katni',
    desc: 'Completed secondary school under the MP Board, scoring 96.2%.'
  }
]

export default function Education({ id, onSectionChange }) {
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
    <section id={id} ref={sectionRef} className="education">
      <div className="section-container">
        <h2 className="section-title">Education</h2>
        <div className="timeline">
          {educationData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-duration">{item.duration}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <span className="timeline-org">{item.org}</span>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
