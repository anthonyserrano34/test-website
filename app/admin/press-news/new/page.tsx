import { Metadata } from "next"
import PressNewsEditorForm from "../press-news-editor-form"

export const metadata: Metadata = {
	title: "Altwy Admin — Add press article",
	robots: { index: false, follow: false },
}

export default function AdminNewPressNewsPage() {
	return <PressNewsEditorForm mode="create" />
}
