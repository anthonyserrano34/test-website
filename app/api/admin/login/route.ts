import { NextRequest, NextResponse } from "next/server"
import {
	createAdminSessionToken,
	getAdminCredentials,
	isAllowedAdminOrigin,
	setAdminSessionCookie,
	verifyAdminPassword,
} from "@/lib/admin-auth"
import { isAdminLoginRateLimited } from "@/lib/admin-rate-limit"
import { getClientIp } from "@/lib/contact-security"

export async function POST(request: NextRequest) {
	if (!isAllowedAdminOrigin(request)) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	const ip = getClientIp(request)
	if (isAdminLoginRateLimited(ip)) {
		return NextResponse.json(
			{ error: "Too many login attempts. Please try again later." },
			{ status: 429 }
		)
	}

	const credentials = getAdminCredentials()
	if (!credentials) {
		return NextResponse.json(
			{ error: "Admin login is not configured." },
			{ status: 500 }
		)
	}

	let body: { username?: unknown; password?: unknown }
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}

	const username = typeof body.username === "string" ? body.username.trim() : ""
	const password = typeof body.password === "string" ? body.password : ""

	if (!username || !password) {
		return NextResponse.json({ error: "Username and password are required." }, { status: 400 })
	}

	const usernameOk = username === credentials.username
	const passwordOk = await verifyAdminPassword(password)

	if (!usernameOk || !passwordOk) {
		return NextResponse.json({ error: "Invalid username or password." }, { status: 401 })
	}

	try {
		const token = await createAdminSessionToken(username)
		const response = NextResponse.json({ ok: true })
		setAdminSessionCookie(response, token)
		return response
	} catch (error) {
		console.error("Admin session error:", error)
		return NextResponse.json({ error: "Unable to create session." }, { status: 500 })
	}
}
