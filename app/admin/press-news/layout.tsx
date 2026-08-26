import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/admin-auth"
import AdminShell from "../admin-shell"

export default async function AdminPressNewsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getAdminSession()
	if (!session) redirect("/admin/login")
	return <AdminShell username={session.username}>{children}</AdminShell>
}
