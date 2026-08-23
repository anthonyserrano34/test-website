import { Metadata } from "next"
import NewsEditorForm from "../news-editor-form"

export const metadata: Metadata = {
	title: "Altwy Admin — Add news",
	robots: { index: false, follow: false },
}

export default function AdminNewNewsPage() {
	return <NewsEditorForm mode="create" />
}
