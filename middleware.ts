import { NextRequest, NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session"

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	const isLoginPage = pathname === "/admin/login"
	const isLoginApi = pathname === "/api/admin/login"
	const isAdminPage = pathname.startsWith("/admin")
	const isAdminApi = pathname.startsWith("/api/admin")

	if (!isAdminPage && !isAdminApi) {
		return NextResponse.next()
	}

	if (isLoginApi) {
		return NextResponse.next()
	}

	const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
	const session = token ? await verifyAdminSessionToken(token) : null

	if (isLoginPage) {
		if (session) {
			return NextResponse.redirect(new URL("/admin/news", request.url))
		}
		return NextResponse.next()
	}

	if (!session) {
		if (isAdminApi) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}
		return NextResponse.redirect(new URL("/admin/login", request.url))
	}

	if (pathname === "/admin") {
		return NextResponse.redirect(new URL("/admin/news", request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
}
