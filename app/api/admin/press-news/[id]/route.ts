import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAllowedAdminOrigin } from "@/lib/admin-auth"
import { isFeaturedRank, parsePressNewsInput } from "@/lib/press-news"
import {
	deletePressNews,
	getPressNewsById,
	setPressNewsFeaturedRank,
	updatePressNews,
} from "@/lib/press-news-store"

type RouteContext = { params: Promise<{ id: string }> }

function revalidatePressNews() {
	revalidatePath("/")
	revalidatePath("/press-news")
}

function parseId(idParam: string) {
	const id = Number(idParam)
	if (!Number.isInteger(id) || id <= 0) return null
	return id
}

export async function GET(_request: NextRequest, context: RouteContext) {
	const { id: idParam } = await context.params
	const id = parseId(idParam)
	if (!id) return NextResponse.json({ error: "Not found." }, { status: 404 })
	const item = await getPressNewsById(id)
	if (!item) return NextResponse.json({ error: "Not found." }, { status: 404 })
	return NextResponse.json({ item })
}

export async function PUT(request: NextRequest, context: RouteContext) {
	if (!isAllowedAdminOrigin(request)) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	const { id: idParam } = await context.params
	const id = parseId(idParam)
	if (!id) return NextResponse.json({ error: "Not found." }, { status: 404 })

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	const input = parsePressNewsInput(body)
	if (!input) {
		return NextResponse.json({ error: "Please check the required fields." }, { status: 400 })
	}

	const item = await updatePressNews(id, input)
	if (!item) return NextResponse.json({ error: "Not found." }, { status: 404 })

	revalidatePressNews()
	return NextResponse.json({ item })
}

export async function PATCH(request: NextRequest, context: RouteContext) {
	if (!isAllowedAdminOrigin(request)) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	const { id: idParam } = await context.params
	const id = parseId(idParam)
	if (!id) return NextResponse.json({ error: "Not found." }, { status: 404 })

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	if (!body || typeof body !== "object" || !("featuredRank" in body)) {
		return NextResponse.json({ error: "Please check the required fields." }, { status: 400 })
	}

	const rankRaw = (body as { featuredRank: unknown }).featuredRank
	const rank =
		rankRaw === null || rankRaw === "" || rankRaw === undefined ? null : Number(rankRaw)
	if (rank !== null && !isFeaturedRank(rank)) {
		return NextResponse.json({ error: "Homepage slot must be 1, 2, or 3." }, { status: 400 })
	}

	const item = await setPressNewsFeaturedRank(id, rank)
	if (!item) return NextResponse.json({ error: "Not found." }, { status: 404 })

	revalidatePressNews()
	return NextResponse.json({ item })
}

export async function DELETE(request: NextRequest, context: RouteContext) {
	if (!isAllowedAdminOrigin(request)) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	const { id: idParam } = await context.params
	const id = parseId(idParam)
	if (!id) return NextResponse.json({ error: "Not found." }, { status: 404 })

	const deleted = await deletePressNews(id)
	if (!deleted) return NextResponse.json({ error: "Not found." }, { status: 404 })

	revalidatePressNews()
	return NextResponse.json({ ok: true })
}
