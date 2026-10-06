import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BedDouble, Building2, Handshake, KeyRound, MapPin, Megaphone, Search } from 'lucide-react'
import CtaCard from '../components/CtaCard.jsx'
import HeroSlider from '../components/HeroSlider.jsx'
import { getProperty, properties } from '../data/properties.js'
import { partners } from '../data/media.js'
import { about, company, statusLabel } from '../data/site.js'
import { revealDelay } from '../utils/reveal.js'
import './Home.css'
import '@fontsource-variable/plus-jakarta-sans'

const onSale = properties.filter((p) => p.status === 'on-sale')
const featured = onSale.slice(0, 5)
const types = [...new Set(properties.map((p) => p.type))]
const aboutImage = getProperty('city-view-apartment').images[0]

const stats = [
  { value: `${new Date().getFullYear() - company.founded}+`, label: 'Years of experience' },
  { value: properties.length, label: 'Projects marketed' },
  { value: onSale.length, label: 'Projects on sale now' },
  { value: `${partners.length}+`, label: 'Developer partners' },
]

const offerings = [
  { icon: Building2, title: 'Real estate development', text: 'Planning and delivering residential and mixed-use buildings in prime locations.' },
  { icon: Megaphone, title: 'Real estate marketing', text: 'Full marketing agency for developers, from launch to final handover.' },
  { icon: Handshake, title: 'Consulting', text: 'Feasibility studies, site selection, financing and joint ventures for developers and buyers.' },
  { icon: KeyRound, title: 'Property management', text: 'Building, hotel and property management structures that protect long-term value.' },
]

function SearchBar() {
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    for (const [key, value] of data) if (value) params.set(key, value)
    navigate(`/properties?${params}`)
  }

  return (
    <form className="search-bar" onSubmit={onSubmit} role="search">
      <label>
        <span>Property type</span>
        <select name="type" defaultValue="">
          <option value="">Any type</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Status</span>
        <select name="status" defaultValue="on-sale">
          <option value="">Any status</option>
          {Object.entries(statusLabel).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn btn-primary">
        <Search size={18} /> Search
      </button>
    </form>
  )
}

function FeatureTile({ property, large, index }) {
  const image = property.images[0]

  return (
    <Link
      to={`/properties/${property.slug}`}
      className={`tile${large ? ' tile-large' : ''}`}
      data-reveal="scale"
      style={revealDelay(index, 100)}
    >
      <img src={image.src} width={image.width} height={image.height} alt={property.name} loading="lazy" decoding="async" />
      <span className="tile-badge">{statusLabel[property.status]}</span>
      <span className="tile-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
      <div className="tile-body">
        <h3>{property.name}</h3>
        <p className="tile-meta">
          <span><MapPin size={14} /> {property.location}</span>
          <span><BedDouble size={14} /> {property.beds.join(', ')} Beds</span>
        </p>
      </div>
    </Link>
  )
}

function Home() {
  return (
    <>
      <title>Platinum Properties | Apartments for Sale in Addis Ababa</title>

      <HeroSlider footer={<SearchBar />}>
        <span className="hero-eyebrow">Addis Ababa · Since {company.founded}</span>
        <h1 className="hero-title">
          Homes that move <em>Addis</em> forward.
        </h1>
        <p className="hero-lead">
          Apartments and mixed-use developments in the city's most connected neighbourhoods, marketed by a team you can trust.
        </p>
      </HeroSlider>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <span className="pill">Now selling</span>
              <h2>Featured properties</h2>
            </div>
            <Link to="/properties" className="link-arrow">
              View all properties <ArrowRight size={18} />
            </Link>
          </div>
          <div className="bento">
            {featured.map((p, i) => (
              <FeatureTile key={p.id} property={p} large={i === 0} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-media" data-reveal="left">
            <img src={aboutImage.src} width={aboutImage.width} height={aboutImage.height} alt="City View Apartment" loading="lazy" decoding="async" />
            <div className="split-badge">
              <strong>{company.founded}</strong>
              <span>Trusted since</span>
            </div>
          </div>
          <div data-reveal="right" style={revealDelay(1, 120)}>
            <span className="pill">Who we are</span>
            <h2>A real estate partner built on trust</h2>
            <p className="split-lead">{about.intro} {about.mission}</p>
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            <Link to="/about" className="btn btn-primary">
              More about us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <span className="pill pill-dark">What we do</span>
              <h2>Everything property, under one roof</h2>
            </div>
            <Link to="/services" className="link-arrow">
              All services <ArrowRight size={18} />
            </Link>
          </div>
          <div className="offerings">
            {offerings.map(({ icon: Icon, title, text }, i) => (
              <article key={title} data-reveal style={revealDelay(i, 100)}>
                <span className="offering-icon"><Icon size={24} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section partners-section">
        <div className="container">
          <p className="partners-title" data-reveal>Trusted by leading developers in Addis Ababa</p>
        </div>
        <div className="marquee" data-reveal="fade">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-track" aria-hidden={copy === 1}>
              {partners.map((p) => (
                <li key={p.name}>
                  <img src={p.image.src} width={p.image.width} height={p.image.height} alt={copy ? '' : p.name} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section className="section cta-section">
        <div className="container" data-reveal="scale">
          <CtaCard />
        </div>
      </section>
    </>
  )
}

export default Home
