import { NextRequest, NextResponse } from "next/server"
import { clearAdminSessionCookie, isAllowedAdminOrigin } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
	if (!isAllowedAdminOrigin(request)) {
		return NextResponse.json({ error: "Invalid request." }, { status: 400 })
	}
	const response = NextResponse.json({ ok: true })
	clearAdminSessionCookie(response)
	return response
}
