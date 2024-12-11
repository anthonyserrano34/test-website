import { Metadata } from 'next'
import CompanyPage from './company'

export const metadata: Metadata = {
  title: 'Altwy - Company',
}

export default function Page() {
    return <CompanyPage />
}