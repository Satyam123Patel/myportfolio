import { useEffect, useRef, useState } from 'react'

// Get your free access key at https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = "97e322fc-7440-4868-89cc-2b441a1b2af0"

export default function Contact({ id, onSectionChange }) {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
      alert("Please configure your Web3Forms Access Key at the top of Contact.jsx to enable sending messages!")
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "New Contact Form Submission - Satyam Patel Portfolio"
        })
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        alert(data.message || 'Something went wrong, please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('Failed to send message. Please check your network connection.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id={id} ref={sectionRef} className="contact">
      <div className="section-container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-wrapper">
          <div className="contact-info">
            <p className="contact-text">
              I'm always open to discussing new projects, creative ideas, or opportunities 
              to be part of your visions. Feel free to reach out via the contact form or social links.
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
              <a href="https://github.com/Satyam123Patel" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                <svg className="icon"><use href="/icons.svg#github-icon" /></svg>
              </a>
              <a href="https://linkedin.com/in/satyam-patel-sp" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                <svg className="icon"><use href="/icons.svg#linkedin-icon" /></svg>
              </a>
            </div>
          </div>
          <div>
            {submitted ? (
              <div style={{
                background: 'var(--accent-bg)',
                border: '1px solid var(--accent)',
                padding: '24px',
                borderRadius: '12px',
                textAlign: 'center',
                color: 'var(--text-h)'
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: 'var(--accent)' }}>Thank You!</h3>
                <p style={{ margin: 0 }}>Your message has been sent successfully. I will get back to you shortly.</p>
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
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
