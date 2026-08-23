import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Altwy - Company",
};

export default function Page() {
	redirect("/company/altwy");
}