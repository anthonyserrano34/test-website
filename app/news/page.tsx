import { Metadata } from 'next'
import NewsPage from './news'

export const metadata: Metadata = {
  title: 'Altwy - News',
}

export default function Page() {
    return <NewsPage />
}