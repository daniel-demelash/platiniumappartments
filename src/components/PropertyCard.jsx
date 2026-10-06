import { Link } from 'react-router-dom'
import { ArrowUpRight, BedDouble, HardHat, MapPin } from 'lucide-react'
import { statusLabel } from '../data/site.js'
import { revealDelay } from '../utils/reveal.js'
import './PropertyCard.css'

function PropertyCard({ property, index = 0 }) {
  const image = property.images[0]

  return (
    <article className="property-card" data-reveal style={revealDelay(index % 3, 90)}>
      <Link to={`/properties/${property.slug}`} className="property-card-link">
        <div className="property-card-media">
          {image && (
            <img src={image.src} width={image.width} height={image.height} alt={property.name} loading="lazy" decoding="async" />
          )}
          <span className={`property-card-status is-${property.status}`}>{statusLabel[property.status]}</span>
          <span className="property-card-type">{property.type}</span>
        </div>

        <div className="property-card-body">
          <div className="property-card-title">
            <h3>{property.name}</h3>
            {property.nameAm && <p lang="am">{property.nameAm}</p>}
          </div>
          <p className="property-card-location">
            <MapPin size={15} /> <span>{property.location}</span>
          </p>
        </div>

        <div className="property-card-footer">
          <ul className="property-card-chips">
            <li><BedDouble size={15} /> {property.beds.join(', ')} Beds</li>
            <li><HardHat size={15} /> {property.construction}</li>
          </ul>
          <span className="property-card-arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>
    </article>
  )
}

export default PropertyCard
