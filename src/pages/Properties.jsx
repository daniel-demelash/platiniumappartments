import { useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import PropertyCard from '../components/PropertyCard.jsx'
import { properties } from '../data/properties.js'
import { statusLabel } from '../data/site.js'
import './Properties.css'

const types = [...new Set(properties.map((p) => p.type))]

function Segmented({ label, value, options, onChange }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      <span className="segmented-label">{label}</span>
      <div className="segmented-track">
        {options.map((o) => (
          <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Properties() {
  const [params, setParams] = useSearchParams()
  const status = params.get('status') ?? ''
  const type = params.get('type') ?? ''

  const list = properties.filter((p) => (!status || p.status === status) && (!type || p.type === type))

  const update = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  return (
    <>
      <title>Properties | Platinum Properties</title>

      <section className="section page-top properties-page">
        <div className="container">
          <h1 className="sr-only">Properties</h1>
          <div className="filters">
            <Segmented
              label="Status"
              value={status}
              onChange={(v) => update('status', v)}
              options={[
                { value: '', label: 'All' },
                ...Object.entries(statusLabel).map(([value, label]) => ({ value, label })),
              ]}
            />
            <Segmented
              label="Type"
              value={type}
              onChange={(v) => update('type', v)}
              options={[{ value: '', label: 'All' }, ...types.map((t) => ({ value: t, label: t }))]}
            />
            {(status || type) && (
              <button type="button" className="filters-clear" onClick={() => setParams({}, { replace: true })}>
                <X size={14} /> Clear
              </button>
            )}
          </div>

          {list.length ? (
            <div className="property-grid">
              {list.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          ) : (
            <p className="empty">No properties match these filters.</p>
          )}
        </div>
      </section>
    </>
  )
}

export default Properties
