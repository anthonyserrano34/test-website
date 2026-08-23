import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import {
	ADMIN_SESSION_COOKIE,
	verifyAdminSessionToken,
} from "@/lib/admin-session"

export {
	ADMIN_SESSION_COOKIE,
	createAdminSessionToken,
	verifyAdminSessionToken,
	setAdminSessionCookie,
	clearAdminSessionCookie,
	isAllowedAdminOrigin,
} from "@/lib/admin-session"

/** Decode env hash. Prefer base64 to avoid dotenv expanding `$` in bcrypt hashes. */
export function resolvePasswordHash(raw: string | undefined) {
	if (!raw) return null
	const value = raw.trim().replace(/^['"]|['"]$/g, "")
	if (!value) return null

	if (value.startsWith("$2")) return value

	try {
		const decoded = Buffer.from(value, "base64").toString("utf8").trim()
		if (decoded.startsWith("$2")) return decoded
	} catch {
		// ignore
	}

	return null
}

export function getAdminCredentials() {
	const username = process.env.ADMIN_USERNAME?.trim()
	const passwordHash = resolvePasswordHash(process.env.ADMIN_PASSWORD_HASH)
	if (!username || !passwordHash) return null
	return { username, passwordHash }
}

export async function verifyAdminPassword(password: string) {
	const credentials = getAdminCredentials()
	if (!credentials) return false
	return bcrypt.compare(password, credentials.passwordHash)
}

export async function getAdminSession() {
	const cookieStore = await cookies()
	const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
	if (!token) return null
	return verifyAdminSessionToken(token)
}
