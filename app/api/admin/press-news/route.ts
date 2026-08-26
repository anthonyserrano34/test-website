import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAllowedAdminOrigin } from "@/lib/admin-auth"
import { parsePressNewsInput } from "@/lib/press-news"
import { createPressNews, readPressNews } from "@/lib/press-news-store"

function revalidatePressNews() {
	revalidatePath("/")
	revalidatePath("/press-news")
}

export async function GET() {
	const items = await readPressNews()
	return NextResponse.json({ items })
}

export async function POST(request: NextRequest) {
	if (!isAllowedAdminOrigin(request)) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

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

	const item = await createPressNews(input)
	revalidatePressNews()
	return NextResponse.json({ item }, { status: 201 })
}
