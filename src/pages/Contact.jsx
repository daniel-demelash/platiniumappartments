import { useState } from 'react'
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import PageIntro from '../components/PageIntro.jsx'
import SocialIcon from '../components/SocialIcon.jsx'
import { company, socials } from '../data/site.js'
import { revealDelay } from '../utils/reveal.js'
import './Contact.css'

const methods = [
  { icon: Phone, label: 'Call us', value: company.phones[0].label, href: company.phones[0].href },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with our sales team', href: company.whatsapp, external: true },
  { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
  { icon: MapPin, label: 'Office', value: company.address },
]

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // No backend yet: hand the message off to the visitor's mail client.
  const onSubmit = (e) => {
    e.preventDefault()
    const body = `${form.message}\n\n${form.name}\n${form.phone}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <title>Contact | Platinum Properties</title>

      <section className="section page-top contact-page">
        <div className="container">
          <PageIntro
            eyebrow="Contact"
            title="Let's talk about your next home"
            lead="Ask about availability, payment plans or book a site visit. Our team usually replies within one business day."
          />

          <div className="contact-layout">
            <div className="contact-side">
              <ul className="contact-methods">
                {methods.map(({ icon: Icon, label, value, href, external }, i) => {
                  const content = (
                    <>
                      <span className="contact-method-icon"><Icon size={20} /></span>
                      <span className="contact-method-text">
                        <small>{label}</small>
                        <strong>{value}</strong>
                      </span>
                      {href && <ArrowUpRight size={18} className="contact-method-arrow" />}
                    </>
                  )
                  return (
                    <li key={label} data-reveal="left" style={revealDelay(i, 90)}>
                      {href ? (
                        <a
                          href={href}
                          className="contact-method"
                          {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="contact-method">{content}</div>
                      )}
                    </li>
                  )
                })}
              </ul>

              <div className="contact-hours" data-reveal style={revealDelay(4, 90)}>
                <h2><Clock size={18} /> Business hours</h2>
                <dl>
                  {company.hours.map((h) => (
                    <div key={h.days}>
                      <dt>{h.days}</dt>
                      <dd className={h.time === 'Closed' ? 'is-closed' : undefined}>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <ul className="contact-socials">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      <SocialIcon name={s.name} size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <form className="contact-form" onSubmit={onSubmit} data-reveal="right" style={revealDelay(1, 150)}>
              <h2>Send us a message</h2>
              <p>Fill in the form and we'll get back to you.</p>
              <div className="contact-form-row">
                <label>
                  <span>Your name</span>
                  <input name="name" value={form.name} onChange={onChange} required autoComplete="name" placeholder="Full name" />
                </label>
                <label>
                  <span>Phone number</span>
                  <input name="phone" type="tel" value={form.phone} onChange={onChange} required autoComplete="tel" placeholder="+251" />
                </label>
              </div>
              <label>
                <span>Subject</span>
                <input name="subject" value={form.subject} onChange={onChange} required placeholder="e.g. Site visit request" />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows="6" value={form.message} onChange={onChange} required placeholder="How can we help?" />
              </label>
              <button type="submit" className="btn btn-primary">
                <Send size={18} /> Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
