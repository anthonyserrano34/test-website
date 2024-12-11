import { Metadata } from 'next'
import PrivacyPolicy from './privacy-policy'

export const metadata: Metadata = {
  title: 'Altwy - Privacy Policy',
}

export default function Page() {
    return <PrivacyPolicy />
}