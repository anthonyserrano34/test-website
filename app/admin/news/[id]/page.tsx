import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNewsById } from "@/lib/news-store"
import NewsEditorForm from "../news-editor-form"

export const metadata: Metadata = {
	title: "Altwy Admin — Edit news",
	robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

type PageProps = { params: Promise<{ id: string }> }

export default async function AdminEditNewsPage({ params }: PageProps) {
	const { id: idParam } = await params
	const id = Number(idParam)
	if (!Number.isInteger(id) || id <= 0) notFound()
	const item = await getNewsById(id)
	if (!item) notFound()
	return <NewsEditorForm mode="edit" initial={item} />
}
