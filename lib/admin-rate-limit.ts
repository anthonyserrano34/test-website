const rateLimitStore = new Map<string, number[]>()

function isBucketLimited(key: string, windowMs: number, max: number) {
	const now = Date.now()
	const recent = (rateLimitStore.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs)
	if (recent.length >= max) {
		rateLimitStore.set(key, recent)
		return true
	}
	recent.push(now)
	rateLimitStore.set(key, recent)
	return false
}

export function isAdminLoginRateLimited(ip: string) {
	return (
		isBucketLimited(`admin-login:${ip}:burst`, 15 * 60 * 1000, 8) ||
		isBucketLimited(`admin-login:${ip}:hour`, 60 * 60 * 1000, 20)
	)
}
