import { useEffect, useRef, useState } from 'react'

export default function Contact({ id, onSectionChange }) {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
    const body = encodeURIComponent(`Hi Satyam,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:satyampatelkatni2003@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 6000)
  }

  return (
    <section id={id} ref={sectionRef} className="contact">
      <div className="section-container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-wrapper">
          <div className="contact-info">
            <p className="contact-text">
              I'm always open to discussing new projects, backend roles, creative ideas, or opportunities 
              to contribute. Feel free to reach out directly via email, phone, or LinkedIn!
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div className="contact-item-text">
                  <h4>Location</h4>
                  <p>Katni, Madhya Pradesh, India</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <div className="contact-item-text">
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:satyampatelkatni2003@gmail.com" className="contact-link">
                      satyampatelkatni2003@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div className="contact-item-text">
                  <h4>Phone</h4>
                  <p>
                    <a href="tel:9302601702" className="contact-link">
                      9302601702
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href="https://github.com/Satyam123Patel" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub" aria-label="GitHub Profile">
                <svg className="icon" viewBox="0 0 19 19"><use href="/icons.svg#github-icon" /></svg>
              </a>
              <a href="https://linkedin.com/in/satyam-patel-sp" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn" aria-label="LinkedIn Profile">
                <svg className="icon" viewBox="0 0 24 24"><use href="/icons.svg#linkedin-icon" /></svg>
              </a>
            </div>
          </div>
          <div>
            {submitted ? (
              <div style={{
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent)',
                padding: '28px',
                borderRadius: '16px',
                textAlign: 'center',
                color: 'var(--text-h)'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: 'var(--accent)' }}>Opening Your Email Client!</h3>
                <p style={{ margin: '0 0 14px 0' }}>If your mail client didn't open automatically, you can also write directly to:</p>
                <a href="mailto:satyampatelkatni2003@gmail.com" className="btn btn-primary" style={{ display: 'inline-block' }}>
                  satyampatelkatni2003@gmail.com
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input"
                    style={{ minHeight: '120px', resize: 'vertical' }}
                    placeholder="Your Message..."
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Send Message via Email
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
