import { useState } from 'react'

interface PublicImageProps {
  src: string
  alt: string
  fallback: string
  className: string
}

function PublicImage({ src, alt, fallback, className }: PublicImageProps) {
  const [hasImage, setHasImage] = useState(true)

  return (
    <div className={className}>
      <span>{fallback}</span>
      {hasImage && <img src={src} alt={alt} onError={() => setHasImage(false)} />}
    </div>
  )
}

export default PublicImage
