import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Phone } from 'lucide-react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { company } from '../data/site.js'
import './Layout.css'

function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
    const scan = () => mainRef.current.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el))
    scan()
    // Lazy pages and filtered lists mount after this effect, so pick up new nodes as they appear.
    const mo = new MutationObserver(scan)
    mo.observe(mainRef.current, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" ref={mainRef}>
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <div key={pathname} className="page-enter">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
      <a href={company.phones[0].href} className="call-fab" aria-label="Call our sales team">
        <Phone size={22} />
      </a>
    </>
  )
}

export default Layout
