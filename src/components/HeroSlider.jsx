import { useEffect, useState } from 'react'
import { getProperty } from '../data/properties.js'
import { heroSlides } from '../data/media.js'
import './HeroSlider.css'

const slides = heroSlides
  .map((s) => ({ ...s, property: getProperty(s.property) }))
  .sort((a, b) => (a.property.status === 'on-sale' ? 0 : 1) - (b.property.status === 'on-sale' ? 0 : 1))
  .slice(0, 5)

const DURATION = 7000

function HeroSlider({ children, footer }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const prev = (active - 1 + count) % count
  const next = (active + 1) % count

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => setActive((a) => (a + 1) % count), DURATION)
    return () => clearTimeout(id)
  }, [active, paused, count])

  return (
    <section
      className={`hero${paused ? ' is-paused' : ''}`}
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-slides">
        {slides.map((s, i) => (
          <div key={s.image.src} className={`hero-slide${i === active ? ' is-active' : ''}`} aria-hidden={i !== active}>
            {/* Only mount neighbours so the browser doesn't fetch every banner upfront. */}
            {(i === active || i === prev || i === next) && (
              <img
                src={s.image.src}
                width={s.image.width}
                height={s.image.height}
                alt=""
                fetchPriority={i === 0 ? 'high' : 'low'}
                decoding="async"
              />
            )}
          </div>
        ))}
      </div>

      <div className="container hero-inner">
        <div className="hero-content">{children}</div>
      </div>

      <div className="container hero-bottom">
        {footer}
        <ol className="hero-dots">
          {slides.map((s, i) => (
            <li key={s.image.src}>
              <button
                type="button"
                className={i === active ? 'is-active' : ''}
                onClick={() => setActive(i)}
                aria-label={`Show ${s.property.name}`}
                aria-current={i === active}
              >
                {i === active && <span key={paused ? 'paused' : 'playing'} style={{ '--duration': `${DURATION}ms` }} />}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HeroSlider
