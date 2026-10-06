import { Briefcase, Building2, Eye, Gem, Handshake, KeyRound, Megaphone, Search, Target } from 'lucide-react'
import CtaCard from '../components/CtaCard.jsx'
import PageIntro from '../components/PageIntro.jsx'
import logoLarge from '../assets/logo-large.webp'
import { properties } from '../data/properties.js'
import { heroSlides, partners } from '../data/media.js'
import { about, company } from '../data/site.js'
import { revealDelay } from '../utils/reveal.js'
import './About.css'

const banner = (heroSlides.find((s) => s.property === 'city-view-apartment') ?? heroSlides[0]).image

const stats = [
  { value: `${new Date().getFullYear() - company.founded}+`, label: 'Years in real estate' },
  { value: properties.length, label: 'Projects marketed' },
  { value: `${partners.length}+`, label: 'Developer partners' },
]

const activityIcons = {
  'Real Estate Development': Building2,
  'Real Estate Marketing': Megaphone,
  'Consulting Real Estate Developers': Handshake,
  'Consulting Real Estate Buyers': Search,
  'Property Management': KeyRound,
  'Business Consulting': Briefcase,
}

function About() {
  const pillars = [
    { icon: Target, title: 'Our mission', body: <p>{about.mission}</p> },
    { icon: Eye, title: 'Our vision', body: <p>{about.vision}</p> },
    {
      icon: Gem,
      title: 'Our values',
      body: (
        <ul>
          {about.values.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <>
      <title>About Us | Platinum Properties</title>

      <section className="section page-top">
        <div className="container">
          <PageIntro eyebrow="About us" title="Real estate expertise, built on trust" lead={about.intro}>
            <dl className="about-stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </PageIntro>

          <div className="about-banner" data-reveal="scale" style={revealDelay(2, 120)}>
            <img src={banner.src} width={banner.width} height={banner.height} alt="City View Apartment by Platinum" fetchPriority="high" />
            <div className="about-banner-badge">
              <img src={logoLarge} width="800" height="427" alt="" />
              <span>
                <strong>{company.legalName}</strong>
                <small>Addis Ababa · Since {company.founded}</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-what">
        <div className="container about-what-grid">
          <div className="about-what-head" data-reveal>
            <span className="pill">What we do</span>
            <h2>One partner for every step of your property journey</h2>
          </div>
          <ul className="about-activities">
            {about.activities.map((a, i) => {
              const Icon = activityIcons[a] ?? Building2
              return (
                <li key={a} data-reveal style={revealDelay(i % 2, 100)}>
                  <span className="about-activity-icon"><Icon size={22} /></span>
                  {a}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <span className="pill pill-dark" data-reveal>What drives us</span>
          <h2 className="about-pillars-title" data-reveal style={revealDelay(1)}>Mission, vision and values</h2>
          <div className="about-pillars">
            {pillars.map(({ icon: Icon, title, body }, i) => (
              <article key={title} data-reveal style={revealDelay(i, 120)}>
                <span className="about-pillar-icon"><Icon size={22} /></span>
                <h3>{title}</h3>
                {body}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" data-reveal="scale">
          <CtaCard title="Let's find your next home" />
        </div>
      </section>
    </>
  )
}

export default About
