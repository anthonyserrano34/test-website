import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { isAllowedAdminOrigin } from "@/lib/admin-auth"
import { parseNewsInput } from "@/lib/news"
import { createNews, readNews } from "@/lib/news-store"

export async function GET() {
	const items = await readNews()
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

	const input = parseNewsInput(body)
	if (!input) {
		return NextResponse.json({ error: "Please check the required fields." }, { status: 400 })
	}

	const item = await createNews(input)
	revalidatePath("/news")
	return NextResponse.json({ item }, { status: 201 })
}
