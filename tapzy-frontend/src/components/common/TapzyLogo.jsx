/**
 * TapzyLogo
 * 
 * The logo PNG has a dark background with white "Tapzy" text.
 * Aspect ratio: 1654 × 754 = 2.194 : 1
 *
 * variant="navbar"  — wraps in dark rounded bg so it's visible on light navbar
 * variant="dark"    — bare image, blends into dark surfaces (footer, sidebar, login)
 */

const LOGO_URL = 'https://res.cloudinary.com/k4latagc/image/upload/v1784487298/tapzy/brand/tapzy-logo.png'

import logoLocal from '../../assets/tapzy-logo.png'

const RATIO = 2.194 // width / height

export default function TapzyLogo({ variant = 'navbar', className = '', height = 40 }) {
  const imgW = Math.round(height * RATIO)

  if (variant === 'navbar') {
    return (
      <span
        className={`inline-block rounded-2xl bg-[#111111] overflow-hidden shrink-0 ${className}`}
        style={{
          height:  height + 10,
          width:   imgW + 20,
          padding: '5px 10px',
          lineHeight: 0,
        }}
      >
        <img
          src={LOGO_URL}
          onError={(e) => { e.currentTarget.src = logoLocal }}
          alt="Tapzy"
          width={imgW}
          height={height}
          style={{ display: 'block', width: imgW, height, objectFit: 'contain' }}
          draggable={false}
        />
      </span>
    )
  }

  // Dark variant — no wrapper, logo bg blends with dark surface
  return (
    <img
      src={LOGO_URL}
      onError={(e) => { e.currentTarget.src = logoLocal }}
      alt="Tapzy"
      width={imgW}
      height={height}
      className={`block object-contain ${className}`}
      style={{ width: imgW, height }}
      draggable={false}
    />
  )
}
