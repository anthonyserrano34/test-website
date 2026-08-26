import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPressNewsById } from "@/lib/press-news-store"
import PressNewsEditorForm from "../press-news-editor-form"

export const metadata: Metadata = {
	title: "Altwy Admin — Edit press article",
	robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

type PageProps = { params: Promise<{ id: string }> }

export default async function AdminEditPressNewsPage({ params }: PageProps) {
	const { id: idParam } = await params
	const id = Number(idParam)
	if (!Number.isInteger(id) || id <= 0) notFound()
	const item = await getPressNewsById(id)
	if (!item) notFound()
	return <PressNewsEditorForm mode="edit" initial={item} />
}
