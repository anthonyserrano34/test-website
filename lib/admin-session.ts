import { SignJWT, jwtVerify } from "jose"
import { NextResponse } from "next/server"

export const ADMIN_SESSION_COOKIE = "altwy_admin_session"
export const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7

function getSecretKey() {
	const secret = process.env.ADMIN_SESSION_SECRET
	if (!secret || secret.length < 32) return null
	return new TextEncoder().encode(secret)
}

export async function createAdminSessionToken(username: string) {
	const key = getSecretKey()
	if (!key) throw new Error("ADMIN_SESSION_SECRET must be set (min 32 characters)")
	return new SignJWT({ role: "admin", username })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
		.sign(key)
}

export async function verifyAdminSessionToken(token: string) {
	const key = getSecretKey()
	if (!key) return null
	try {
		const { payload } = await jwtVerify(token, key)
		if (payload.role !== "admin" || typeof payload.username !== "string") return null
		return { username: payload.username }
	} catch {
		return null
	}
}

export function setAdminSessionCookie(response: NextResponse, token: string) {
	response.cookies.set(ADMIN_SESSION_COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_MAX_AGE_SEC,
	})
}

export function clearAdminSessionCookie(response: NextResponse) {
	response.cookies.set(ADMIN_SESSION_COOKIE, "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 0,
	})
}

export function isAllowedAdminOrigin(request: Request) {
	const origin = request.headers.get("origin")
	const host = request.headers.get("host")
	if (!origin || !host) return false
	try {
		return new URL(origin).host === host
	} catch {
		return false
	}
}
