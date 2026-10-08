export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <span className="logo-text" style={{ marginRight: '6px' }}>SP</span>
          Satyam Patel
        </div>
        <div className="footer-social-links">
          <a href="https://github.com/Satyam123Patel" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="GitHub" aria-label="GitHub Profile">
            <svg className="icon" viewBox="0 0 19 19"><use href="/icons.svg#github-icon" /></svg>
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/satyam-patel-sp" target="_blank" rel="noopener noreferrer" className="footer-social-link" title="LinkedIn" aria-label="LinkedIn Profile">
            <svg className="icon" viewBox="0 0 24 24"><use href="/icons.svg#linkedin-icon" /></svg>
            <span>LinkedIn</span>
          </a>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Satyam Patel. All rights reserved.
        </p>
        <button onClick={scrollToTop} className="footer-scroll-top">
          Back to Top &uarr;
        </button>
      </div>
    </footer>
  )
}
