"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

export default function AdminLoginForm() {
	const router = useRouter()
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		setLoading(true)
		setError(null)

		try {
			const response = await fetch("/api/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			})
			const data = (await response.json().catch(() => null)) as { error?: string } | null
			if (!response.ok) {
				setError(data?.error || "Login failed.")
				return
			}
			router.replace("/admin/news")
			router.refresh()
		} catch {
			setError("Login failed. Please try again.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm space-y-4">
			<div>
				<label htmlFor="username" className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/75">
					Username
				</label>
				<input
					id="username"
					name="username"
					type="text"
					autoComplete="username"
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className="w-full border border-white/[0.08] bg-[#161616] px-4 py-3 text-sm text-white outline-none focus:border-white/20 focus:ring-2 focus:ring-[#00FF88]/20"
				/>
			</div>
			<div>
				<label htmlFor="password" className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/75">
					Password
				</label>
				<input
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full border border-white/[0.08] bg-[#161616] px-4 py-3 text-sm text-white outline-none focus:border-white/20 focus:ring-2 focus:ring-[#00FF88]/20"
				/>
			</div>
			{error ? (
				<p className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
					{error}
				</p>
			) : null}
			<button
				type="submit"
				disabled={loading}
				className="inline-flex w-full items-center justify-center border border-neutral-800 bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-[#00FF88] disabled:opacity-70"
			>
				{loading ? "Signing in…" : "Sign in"}
			</button>
			<p className="text-center text-xs text-white/45">
				<Link href="/" className="text-[#00FF88] underline underline-offset-2">
					Back to site
				</Link>
			</p>
		</form>
	)
}
