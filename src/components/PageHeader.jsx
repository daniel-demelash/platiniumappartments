import { Link } from 'react-router-dom'

function PageHeader({ title, subtitle, crumbs = [] }) {
  return (
    <section className="page-header">
      <div className="container">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          {crumbs.map((c) => (
            <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : c.label}</li>
          ))}
          <li aria-current="page">{title}</li>
        </ol>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  )
}

export default PageHeader
