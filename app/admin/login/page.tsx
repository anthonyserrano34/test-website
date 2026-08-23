import { Metadata } from "next"
import Image from "next/image"
import AdminLoginForm from "./login-form"

export const metadata: Metadata = {
	title: "Altwy Admin — Login",
	robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<div className="mb-6 flex justify-center">
						<Image
							src="/logo.png"
							alt="Altwy"
							width={140}
							height={40}
							className="h-10 w-auto"
							priority
						/>
					</div>
					<h1 className="text-3xl font-bold text-white">Sign in</h1>
					<p className="mt-2 text-sm text-white/60">Manage news and updates</p>
				</div>
				<AdminLoginForm />
			</div>
		</div>
	)
}
