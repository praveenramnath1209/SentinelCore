import { FaGithub, FaLinkedin, FaShieldAlt } from "react-icons/fa";
import "./Dashboard.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dashboard-footer">
      <div className="footer-left">
        <div className="footer-logo">
          <FaShieldAlt className="footer-shield" />
        </div>
        <div>
          <h3>SentinelCore SecureOps</h3>
          <p>Enterprise Infrastructure Security Operations Center</p>
        </div>
      </div>

      <div className="footer-center">
        <div className="footer-status-indicator">
          <span className="footer-status-dot"></span>
          <span className="footer-status-label">All Systems Normal</span>
        </div>
        <span className="footer-divider">•</span>
        <span className="footer-meta">v2.5 Enterprise</span>
        <span className="footer-divider">•</span>
        <span className="footer-meta">TLS 1.3 / AES-256</span>
      </div>

      <div className="footer-right">
        <div className="footer-links">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
        <p className="copyright-text">© {year} SentinelCore SecureOps Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
