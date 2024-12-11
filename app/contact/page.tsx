import { Metadata } from 'next'
import ContactPage from './contact'

export const metadata: Metadata = {
  title: 'Altwy - Contact',
}

export default function Page() {
    return <ContactPage />
}