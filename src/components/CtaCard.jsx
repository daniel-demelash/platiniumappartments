import { MessageCircle, Phone } from 'lucide-react'
import { company } from '../data/site.js'

function CtaCard({ title = 'Ready to visit a site?', text = 'Our sales team will walk you through availability, payment plans and site visits.' }) {
  return (
    <div className="cta-card">
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="cta-actions">
        <a href={company.phones[0].href} className="btn btn-light">
          <Phone size={18} /> {company.phones[0].label}
        </a>
        <a href={company.whatsapp} className="btn btn-glass" target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} /> WhatsApp
        </a>
      </div>
    </div>
  )
}

export default CtaCard
