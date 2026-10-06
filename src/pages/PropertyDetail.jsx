import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpDown,
  BedDouble,
  CalendarDays,
  Car,
  Cctv,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  ConciergeBell,
  Dumbbell,
  HardHat,
  Images,
  Mail,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  PhoneCall,
  Sun,
  Trees,
  Users,
  Waves,
  X,
  Zap,
} from 'lucide-react'
import PropertyCard from '../components/PropertyCard.jsx'
import NotFound from './NotFound.jsx'
import { getProperty, properties } from '../data/properties.js'
import { company, statusLabel } from '../data/site.js'
import { parseDescription } from '../utils/description.js'
import { revealDelay } from '../utils/reveal.js'
import './PropertyDetail.css'

const featureIcons = {
  Parking: Car,
  Elevator: ArrowUpDown,
  Terrace: Sun,
  Generator: Zap,
  'CCTV Camera': Cctv,
  Intercom: PhoneCall,
  'Green Area': Trees,
  Gym: Dumbbell,
  Reception: ConciergeBell,
  'Swimming Pool': Waves,
}

function Lightbox({ images, start, title, onClose }) {
  const ref = useRef(null)
  const [index, setIndex] = useState(start)
  const image = images[index]
  const many = images.length > 1

  useEffect(() => {
    ref.current.showModal()
  }, [])

  const step = (d) => setIndex((i) => (i + d + images.length) % images.length)

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={title}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && ref.current.close()}
      onKeyDown={(e) => {
        if (!many) return
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
      }}
    >
      <img src={image.src} width={image.width} height={image.height} alt={`${title} ${index + 1}`} />
      <button type="button" className="lightbox-close" onClick={() => ref.current.close()} aria-label="Close">
        <X size={22} />
      </button>
      {many && (
        <>
          <button type="button" className="lightbox-nav is-prev" onClick={() => step(-1)} aria-label="Previous image">
            <ChevronLeft size={24} />
          </button>
          <button type="button" className="lightbox-nav is-next" onClick={() => step(1)} aria-label="Next image">
            <ChevronRight size={24} />
          </button>
          <span className="lightbox-count">{index + 1} / {images.length}</span>
        </>
      )}
    </dialog>
  )
}

function Thumb({ image, alt, eager, onOpen, children }) {
  return (
    <button type="button" className="thumb" onClick={onOpen} aria-label={`Enlarge ${alt}`}>
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
      />
      {children ?? <span className="thumb-zoom" aria-hidden="true"><Maximize2 size={16} /></span>}
    </button>
  )
}

function Overview({ text }) {
  const [expanded, setExpanded] = useState(false)
  const blocks = text ? parseDescription(text) : []
  const collapsible = text.length > 650

  if (!blocks.length) return <p className="overview-lead">Contact our sales team for full details.</p>

  return (
    <>
      <div id="overview-body" className={`overview${collapsible && !expanded ? ' is-collapsed' : ''}`}>
        {blocks.map((b, i) =>
          b.type === 'p' ? (
            <p key={i} className={i === 0 ? 'overview-lead' : undefined}>{b.text}</p>
          ) : (
            <div key={i} className="overview-group">
              {b.title && <h3>{b.title}</h3>}
              <ul>
                {b.items.map((item) => (
                  <li key={item}>
                    <span className="overview-check" aria-hidden="true"><Check size={13} strokeWidth={3} /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>
      {collapsible && (
        <button
          type="button"
          className={`overview-toggle${expanded ? ' is-expanded' : ''}`}
          aria-expanded={expanded}
          aria-controls="overview-body"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Show less' : 'Read full overview'} <ChevronDown size={16} />
        </button>
      )}
    </>
  )
}

function PropertyDetail() {
  const { slug } = useParams()
  const property = getProperty(slug)
  const [lightbox, setLightbox] = useState(null)

  if (!property) return <NotFound />

  const open = (list, title, index = 0) => setLightbox({ list, title, index })
  const gallery = property.images.slice(0, 3)
  const extra = property.images.length - gallery.length

  const facts = [
    { icon: BedDouble, label: 'Bedrooms', value: property.beds.length ? `${property.beds.join(', ')} BR` : null },
    { icon: HardHat, label: 'Construction', value: property.construction },
    { icon: Users, label: 'Families per floor', value: property.familiesPerFloor },
    { icon: CalendarDays, label: 'Year', value: property.yearBuilt },
  ].filter((f) => f.value)

  const tabs = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'amenities', label: 'Amenities', show: property.features.length > 0 },
    { id: 'plans', label: 'Floor plans', show: property.plans.length > 0 },
    { id: 'progress', label: 'Progress', show: property.progress.length > 0 },
    { id: 'location', label: 'Location', show: Boolean(property.mapEmbed) },
  ].filter((t) => t.show)

  const onSaleFirst = (p) => (p.status === 'on-sale' ? 0 : 1)
  const similar = properties
    .filter((p) => p.slug !== property.slug)
    .sort((a, b) => (b.type === property.type) - (a.type === property.type) || onSaleFirst(a) - onSaleFirst(b))
    .slice(0, 3)

  const whatsapp = `${company.whatsapp}?text=${encodeURIComponent(`Hello, I'm interested in ${property.name}.`)}`

  return (
    <>
      <title>{`${property.name} | Platinum Properties`}</title>
      <meta name="description" content={property.description.slice(0, 155)} />

      <section className="detail page-top">
        <div className="container">
          <Link to="/properties" className="detail-back">
            <ArrowLeft size={16} /> All properties
          </Link>

          <div className={`detail-gallery count-${gallery.length}`}>
            {gallery.map((img, i) => (
              <Thumb
                key={img.src}
                image={img}
                alt={`${property.name} photo ${i + 1}`}
                eager={i === 0}
                onOpen={() => open(property.images, property.name, i)}
              >
                {extra > 0 && i === gallery.length - 1 ? (
                  <span className="thumb-more"><Images size={18} /> +{extra} {extra === 1 ? 'photo' : 'photos'}</span>
                ) : undefined}
              </Thumb>
            ))}
          </div>

          <header className="detail-head" data-reveal>
            <div className="detail-tags">
              <span className={`detail-status is-${property.status}`}>{statusLabel[property.status]}</span>
              <span className="detail-type">{property.type}</span>
            </div>
            <h1>{property.name}</h1>
            {property.nameAm && <p className="detail-am" lang="am">{property.nameAm}</p>}
            <p className="detail-location"><MapPin size={16} /> {property.location}</p>
          </header>

          {facts.length > 0 && (
            <ul className="detail-facts">
              {facts.map(({ icon: Icon, label, value }, i) => (
                <li key={label} data-reveal style={revealDelay(i)}>
                  <span className="detail-fact-icon"><Icon size={20} /></span>
                  <span>
                    <small>{label}</small>
                    <strong>{value}</strong>
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="detail-layout">
            <div className="detail-main">
              {tabs.length > 1 && (
                <nav className="detail-tabs" aria-label="Sections">
                  {tabs.map((t) => (
                    <a key={t.id} href={`#${t.id}`}>{t.label}</a>
                  ))}
                </nav>
              )}

              <section id="overview" className="detail-block" data-reveal>
                <h2>Overview</h2>
                <Overview key={property.slug} text={property.description} />
              </section>

              {property.features.length > 0 && (
                <section id="amenities" className="detail-block" data-reveal>
                  <h2>Amenities</h2>
                  <ul className="detail-amenities">
                    {property.features.map((f) => {
                      const Icon = featureIcons[f] ?? CircleCheck
                      return (
                        <li key={f}><Icon size={20} /> {f}</li>
                      )
                    })}
                  </ul>
                </section>
              )}

              {property.plans.length > 0 && (
                <section id="plans" className="detail-block" data-reveal>
                  <h2>Floor plans</h2>
                  <div className="detail-media-grid">
                    {property.plans.map((img, i) => (
                      <Thumb
                        key={img.src}
                        image={img}
                        alt={`${property.name} floor plan ${i + 1}`}
                        onOpen={() => open(property.plans, `${property.name} floor plan`, i)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {property.progress.length > 0 && (
                <section id="progress" className="detail-block" data-reveal>
                  <h2>Construction progress</h2>
                  <div className="detail-media-grid">
                    {property.progress.map((img, i) => (
                      <Thumb
                        key={img.src}
                        image={img}
                        alt={`${property.name} construction progress ${i + 1}`}
                        onOpen={() => open(property.progress, `${property.name} construction progress`, i)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {property.mapEmbed && (
                <section id="location" className="detail-block" data-reveal>
                  <h2>Location</h2>
                  <iframe
                    className="detail-map"
                    src={property.mapEmbed}
                    title={`${property.name} location map`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </section>
              )}
            </div>

            <aside className="detail-aside">
              <div className="contact-card" data-reveal="right" style={revealDelay(2, 120)}>
                <p className="contact-card-title">Interested in {property.name}?</p>
                <p className="contact-card-text">Ask about availability, payment plans or book a site visit.</p>
                <a href={company.phones[0].href} className="btn btn-primary">
                  <Phone size={18} /> Call {company.phones[0].label}
                </a>
                <a href={whatsapp} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
                <a href={`mailto:${company.email}?subject=${encodeURIComponent(property.name)}`} className="contact-card-email">
                  <Mail size={15} /> {company.email}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2>You may also like</h2>
              <Link to="/properties" className="detail-back">View all properties</Link>
            </div>
            <div className="property-grid">
              {similar.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {lightbox && (
        <Lightbox
          key={`${lightbox.title}-${lightbox.index}`}
          images={lightbox.list}
          start={lightbox.index}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}

export default PropertyDetail
