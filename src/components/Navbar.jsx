import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'
import logo from '../assets/logo.png'
import { company, navLinks } from '../data/site.js'
import ThemeToggle from './ThemeToggle.jsx'
import './Navbar.css'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40)
  const { pathname } = useLocation()
  const overHero = pathname === '/' && !scrolled && !open
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = navLinks.map((link, i) => (
    <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={close} style={{ '--i': i }}>
      {link.label}
    </NavLink>
  ))

  return (
    <header
      className={`navbar${overHero ? ' navbar-transparent' : ''}${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
    >
      <div className="container">
        <div className="navbar-bar">
          <Link to="/" className="navbar-logo" aria-label={`${company.name} home`} onClick={close}>
            <img src={logo} alt={company.name} width="130" height="55" />
          </Link>

          <nav className="navbar-links" aria-label="Main">{links}</nav>

          <div className="navbar-actions">
            <ThemeToggle />
            <a href={company.phones[0].href} className="navbar-cta">
              <span className="navbar-cta-icon"><Phone size={15} /></span>
              {company.phones[0].label}
            </a>
            <button
              type="button"
              className="navbar-toggle"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <nav id="mobile-nav" className="navbar-panel" aria-label="Mobile">
          {links}
          <a href={company.phones[0].href} className="btn btn-primary" style={{ '--i': navLinks.length }}>
            <Phone size={16} /> {company.phones[0].label}
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
