import { useEffect, useRef } from 'react'

const certsData = [
  {
    title: 'AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    date: '2025',
    credentialUrl: 'https://www.credly.com/badges/6077b09c-ee97-44e9-9105-10602ad32a68/public_url'
  },
  {
    title: 'AWS Academy Machine Learning Foundations',
    issuer: 'AWS Academy',
    date: '2025',
    credentialUrl: 'https://www.credly.com/badges/34cf5158-79da-4877-aec8-ec973d569af4/public_url'
  },
  {
    title: 'CCNA: Introduction to Networks (v7)',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    credentialUrl: 'https://drive.google.com/drive/folders/1iLOVWTD_kVZaVEIZClgavMc0Rxr-IxAn?usp=sharing'
  },
  {
    title: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    date: '2024',
    credentialUrl: 'https://drive.google.com/drive/folders/1iLOVWTD_kVZaVEIZClgavMc0Rxr-IxAn?usp=sharing'
  },
  {
    title: 'Python Programming Training',
    issuer: 'Ideal Management Group, Jabalpur',
    date: '2024',
    credentialUrl: 'https://drive.google.com/drive/folders/1iLOVWTD_kVZaVEIZClgavMc0Rxr-IxAn?usp=sharing'
  }
]

export default function Certifications({ id, onSectionChange }) {
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
    <section id={id} ref={sectionRef} className="certifications">
      <div className="section-container">
        <h2 className="section-title">Certifications</h2>
        <div className="certs-grid">
          {certsData.map((cert, index) => (
            <div key={index} className="cert-card">
              <span className="cert-issuer">{cert.issuer}</span>
              <h3 className="cert-title">{cert.title}</h3>
              <span className="cert-date">{cert.date}</span>
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-link">
                <svg className="icon" style={{ width: '16px', height: '16px' }}>
                  <use href="/icons.svg#documentation-icon" />
                </svg>
                Verify Credential
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
