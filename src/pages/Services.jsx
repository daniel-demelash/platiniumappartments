import {
  Briefcase,
  Building2,
  CalendarClock,
  ChartLine,
  Check,
  ClipboardList,
  FileText,
  HandCoins,
  Handshake,
  Hotel,
  KeyRound,
  MapPinned,
  Megaphone,
  PenTool,
  ScrollText,
  Search,
  Users,
  Wallet,
} from 'lucide-react'
import CtaCard from '../components/CtaCard.jsx'
import PageIntro from '../components/PageIntro.jsx'
import { services } from '../data/site.js'
import { revealDelay } from '../utils/reveal.js'
import './Services.css'

const serviceIcons = {
  'Real estate development': Building2,
  'Consulting real estate developers': Handshake,
  'Preparing real estate business feasibility studies': FileText,
  'Selecting the best location for investment': MapPinned,
  'Organizing real estate management structures': ClipboardList,
  'Marketing properties at the best market price': Megaphone,
  'Collection services': Wallet,
  'Design review': PenTool,
  'Agreement preparation': ScrollText,
  'Project financing': HandCoins,
  'Leading and following up project schedules': CalendarClock,
  'Facilitating joint ventures': Users,
  'Property management': KeyRound,
  'Consulting real estate buyers': Search,
  'Consulting hotels and resorts': Hotel,
  'Developing business proposals': Briefcase,
  'Market research': ChartLine,
}

function Services() {
  return (
    <>
      <title>Services | Platinum Properties</title>

      <section className="section page-top">
        <div className="container">
          <PageIntro
            eyebrow="Services"
            title="Everything property, under one roof"
            lead="From feasibility studies to final handover, we support developers, buyers and investors at every step."
          />

          <ol className="service-grid">
            {services.en.map((s, i) => {
              const Icon = serviceIcons[s] ?? Check
              return (
                <li key={s} data-reveal style={revealDelay(i % 4, 80)}>
                  <span className="service-top">
                    <span className="service-icon"><Icon size={22} /></span>
                    <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <h3>{s}</h3>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="section section-alt" lang="am">
        <div className="container services-am">
          <div data-reveal="left">
            <span className="pill">አገልግሎቶች</span>
            <h2>የምንሰጣቸው አገልግሎቶች</h2>
          </div>
          <ul data-reveal="right" style={revealDelay(1, 120)}>
            {services.am.map((s) => (
              <li key={s}><Check size={16} /> {s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container" data-reveal="scale">
          <CtaCard title="Need expert advice?" text="Talk to our team about your project, investment or next home." />
        </div>
      </section>
    </>
  )
}

export default Services
