import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAllowedAdminOrigin } from "@/lib/admin-auth"
import { parseNewsInput } from "@/lib/news"
import { deleteNews, getNewsById, updateNews } from "@/lib/news-store"

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, context: RouteContext) {
	const { id: idParam } = await context.params
	const id = Number(idParam)
	if (!Number.isInteger(id) || id <= 0) {
		return NextResponse.json({ error: "Not found." }, { status: 404 })
	}
	const item = await getNewsById(id)
	if (!item) {
		return NextResponse.json({ error: "Not found." }, { status: 404 })
	}
	return NextResponse.json({ item })
}

export async function PUT(request: NextRequest, context: RouteContext) {
	if (!isAllowedAdminOrigin(request)) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	const { id: idParam } = await context.params
	const id = Number(idParam)
	if (!Number.isInteger(id) || id <= 0) {
		return NextResponse.json({ error: "Not found." }, { status: 404 })
	}

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	const input = parseNewsInput(body)
	if (!input) {
		return NextResponse.json({ error: "Please check the required fields." }, { status: 400 })
	}

	const item = await updateNews(id, input)
	if (!item) {
		return NextResponse.json({ error: "Not found." }, { status: 404 })
	}

	revalidatePath("/news")
	return NextResponse.json({ item })
}

export async function DELETE(request: NextRequest, context: RouteContext) {
	if (!isAllowedAdminOrigin(request)) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	const { id: idParam } = await context.params
	const id = Number(idParam)
	if (!Number.isInteger(id) || id <= 0) {
		return NextResponse.json({ error: "Not found." }, { status: 404 })
	}

	const deleted = await deleteNews(id)
	if (!deleted) {
		return NextResponse.json({ error: "Not found." }, { status: 404 })
	}

	revalidatePath("/news")
	return NextResponse.json({ ok: true })
}
