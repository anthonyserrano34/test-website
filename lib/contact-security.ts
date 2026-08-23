import { CONTACT_LIMITS } from "@/lib/contact-form"

const HEADER_UNSAFE = /[\r\n\0\u000b\u000c\u0085\u2028\u2029]/g

export function sanitizeHeaderValue(value: string) {
	return value.replace(HEADER_UNSAFE, " ").replace(/\s+/g, " ").trim()
}

export function sanitizeMultiline(value: string) {
	return value
		.replace(/[\0\u000b\u000c\u0085]/g, "")
		.replace(/\r\n/g, "\n")
		.replace(/\r/g, "\n")
		.trim()
}

export function isValidEmail(value: string) {
	if (value.length > 254) return false
	if (/[\r\n\0\u000b\u000c\u0085\u2028\u2029]/.test(value)) return false
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function parseFormStartedAt(value: unknown, now = Date.now()) {
	const startedAt =
		typeof value === "number"
			? value
			: typeof value === "string" && /^\d{13}$/.test(value)
				? Number(value)
				: null

	if (startedAt === null || !Number.isFinite(startedAt)) return "invalid"
	if (startedAt > now + 5_000) return "invalid"
	if (now - startedAt < CONTACT_LIMITS.minSubmitMs) return "too_fast"
	if (now - startedAt > CONTACT_LIMITS.maxFormAgeMs) return "expired"
	return "ok"
}

export function isAllowedOrigin(request: Request) {
	const origin = request.headers.get("origin")
	const host = request.headers.get("host")
	if (!origin || !host) return false

	try {
		if (new URL(origin).host === host) return true
	} catch {
		return false
	}

	const extra = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
		.split(",")
		.map((value) => value.trim())
		.filter(Boolean)

	return extra.includes(origin)
}

export function isJsonContentType(request: Request) {
	const contentType = request.headers.get("content-type")
	return Boolean(contentType?.toLowerCase().startsWith("application/json"))
}

export function isBodyTooLarge(request: Request) {
	const length = request.headers.get("content-length")
	if (!length) return false
	const size = Number(length)
	return Number.isFinite(size) && size > CONTACT_LIMITS.maxBodyBytes
}

export function getClientIp(request: Request) {
	const realIp = request.headers.get("x-real-ip")?.trim()
	if (realIp) return realIp

	const forwarded = request.headers.get("x-forwarded-for")
	if (forwarded) {
		const first = forwarded.split(",")[0]?.trim()
		if (first) return first
	}

	return "unknown"
}

const rateLimitStore = new Map<string, number[]>()

function pruneRateLimitStore(now: number) {
	if (rateLimitStore.size < 8000) return
	for (const [key, timestamps] of rateLimitStore) {
		const recent = timestamps.filter((timestamp) => now - timestamp < 60 * 60 * 1000)
		if (recent.length === 0) rateLimitStore.delete(key)
		else rateLimitStore.set(key, recent)
	}
}

function isBucketLimited(key: string, windowMs: number, max: number, now: number) {
	const recent = (rateLimitStore.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs)
	if (recent.length >= max) {
		rateLimitStore.set(key, recent)
		return true
	}
	recent.push(now)
	rateLimitStore.set(key, recent)
	return false
}

export function isFlooded(ip: string) {
	const now = Date.now()
	pruneRateLimitStore(now)
	return isBucketLimited(`flood:${ip}`, 60 * 1000, 20, now)
}

export function isRateLimited(ip: string, email: string) {
	const now = Date.now()
	pruneRateLimitStore(now)

	return (
		isBucketLimited(`ip:${ip}:burst`, 10 * 60 * 1000, 3, now) ||
		isBucketLimited(`ip:${ip}:hour`, 60 * 60 * 1000, 8, now) ||
		isBucketLimited(`email:${email.toLowerCase()}`, 60 * 60 * 1000, 3, now)
	)
}

export async function verifyTurnstileToken(token: string, ip: string) {
	const secret = process.env.TURNSTILE_SECRET_KEY
	if (!secret || !token) return false

	const body = new URLSearchParams()
	body.set("secret", secret)
	body.set("response", token)
	if (ip !== "unknown") body.set("remoteip", ip)

	try {
		const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body,
		})
		const data = (await response.json()) as { success?: boolean }
		return data.success === true
	} catch (error) {
		console.error("Turnstile verification failed:", error)
		return false
	}
}
