import Divider from './Divider'

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <header className="section-title">
      <h2 id={id}>{children}</h2>
      <Divider />
    </header>
  )
}

export default SectionTitle
