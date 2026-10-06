function PageIntro({ eyebrow, title, lead, children }) {
  return (
    <div className="page-intro">
      <div>
        <span className="pill">{eyebrow}</span>
        <h1>{title}</h1>
      </div>
      <div>
        {lead && <p className="page-intro-lead">{lead}</p>}
        {children}
      </div>
    </div>
  )
}

export default PageIntro
