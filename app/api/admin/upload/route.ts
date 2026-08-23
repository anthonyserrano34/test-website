import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { randomBytes } from "crypto"
import { isAllowedAdminOrigin } from "@/lib/admin-auth"

const MAX_BYTES = 2 * 1024 * 1024
const ALLOWED_TYPES: Record<string, string> = {
	"image/jpeg": ".jpg",
	"image/png": ".png",
	"image/webp": ".webp",
	"image/gif": ".gif",
}

export async function POST(request: NextRequest) {
	if (!isAllowedAdminOrigin(request)) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	let formData: FormData
	try {
		formData = await request.formData()
	} catch {
		return NextResponse.json({ error: "Invalid upload." }, { status: 400 })
	}

	const file = formData.get("file")
	if (!(file instanceof File)) {
		return NextResponse.json({ error: "No file provided." }, { status: 400 })
	}

	if (file.size <= 0 || file.size > MAX_BYTES) {
		return NextResponse.json({ error: "Image must be under 2 MB." }, { status: 400 })
	}

	const extension = ALLOWED_TYPES[file.type]
	if (!extension) {
		return NextResponse.json(
			{ error: "Only JPEG, PNG, WebP, and GIF images are allowed." },
			{ status: 400 }
		)
	}

	const buffer = Buffer.from(await file.arrayBuffer())
	const filename = `${Date.now()}-${randomBytes(6).toString("hex")}${extension}`
	const dir = path.join(process.cwd(), "public", "news")
	await fs.mkdir(dir, { recursive: true })
	await fs.writeFile(path.join(dir, filename), buffer)

	return NextResponse.json({ url: `/news/${filename}` })
}
