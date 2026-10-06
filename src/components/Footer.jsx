import { Link } from 'react-router-dom'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import logo from '../assets/logo.png'
import SocialIcon from './SocialIcon.jsx'
import { company, navLinks, socials } from '../data/site.js'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src={logo} alt={company.name} width="150" height="64" className="footer-logo" loading="lazy" />
          <p className="footer-about">{company.tagline}.</p>
          <ul className="footer-socials">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <SocialIcon name={s.name} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Explore</h3>
          <ul className="footer-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="footer-list footer-contact">
            {company.phones.map((p) => (
              <li key={p.href}>
                <Phone size={16} /> <a href={p.href}>{p.label}</a>
              </li>
            ))}
            <li>
              <Mail size={16} /> <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <MapPin size={16} /> <span>{company.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3>Office Hours</h3>
          <ul className="footer-list footer-contact">
            {company.hours.map((h) => (
              <li key={h.days}>
                <Clock size={16} /> <span>{h.days}: {h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
