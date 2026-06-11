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
