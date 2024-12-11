// ? : This is a wrapper component that conditionally renders the CookieBanner component, as we don't want to show the banner on the privacy policy page.

'use client'

import { usePathname } from 'next/navigation'
import CookieBanner from './CookieBanner'

export default function CookieBannerWrapper() {
  const pathname = usePathname()

  if (pathname === '/privacy-policy') {
    return null
  }

  return <CookieBanner />
}