import type { ContactProps } from '../types'

interface ContactItemProps extends ContactProps {
  children: React.ReactNode
}

function ContactItem({ href, isEmail, children }: ContactItemProps) {
  const target = isEmail ? `mailto:${href}` : href
  const isExternal = target.startsWith('http')

  return (
    <a
      href={target}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  )
}

export default ContactItem
