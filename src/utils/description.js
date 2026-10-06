const BULLET = /^(?:\d{1,2}[.)]\s+|[-•·]\s*)(.+)$/

const isHeading = (line, next) =>
  /^[A-Za-z]/.test(line) &&
  line.length < 50 &&
  !/[.,]$/.test(line) &&
  (line.endsWith(':') || (next !== undefined && BULLET.test(next)))

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

const clean = (text) => capitalize(text.replace(/[,;.]\s*$/, '').trim())

// Turns the free-form listing text into paragraphs and titled bullet lists.
export function parseDescription(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  const blocks = []
  let run = []

  const flushRun = () => {
    if (!run.length) return
    if (run.length >= 3 && run.every((l) => l.length < 80)) {
      if (run[0].length > 45) blocks.push({ type: 'p', text: capitalize(run.shift()) })
      blocks.push({ type: 'list', items: run.map(clean) })
    } else {
      let para = ''
      for (const line of run) {
        if (para && /[.!?:]$/.test(para)) {
          blocks.push({ type: 'p', text: capitalize(para) })
          para = line
        } else {
          para = para ? `${para} ${line}` : line
        }
      }
      if (para) blocks.push({ type: 'p', text: capitalize(para) })
    }
    run = []
  }

  lines.forEach((line, i) => {
    const bullet = line.match(BULLET)
    if (bullet) {
      flushRun()
      const last = blocks.at(-1)
      if (last?.type === 'list' && last.open) last.items.push(clean(bullet[1]))
      else blocks.push({ type: 'list', items: [clean(bullet[1])], open: true })
    } else if (isHeading(line, lines[i + 1])) {
      flushRun()
      blocks.push({ type: 'list', title: capitalize(line.replace(/:$/, '')), items: [], open: true })
    } else if (blocks.at(-1)?.open && blocks.at(-1).items.length && BULLET.test(lines[i + 1] ?? '') && line.length < 60) {
      const items = blocks.at(-1).items
      items[items.length - 1] += `, ${clean(line)}`
    } else {
      const last = blocks.at(-1)
      if (last?.open) last.open = false
      run.push(line)
    }
  })
  flushRun()

  return blocks.filter((b) => b.type === 'p' || b.items.length)
}
