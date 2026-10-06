import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="section page-header">
      <title>Page not found | Platinum Properties</title>
      <div className="container">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page you are looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to home</Link>
      </div>
    </section>
  )
}

export default NotFound
