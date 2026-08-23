import { Metadata } from "next";
import CompanyPage from "../company";

export const metadata: Metadata = {
	title: "Altwy - Our Team",
};

export default function Page() {
	return <CompanyPage />;
}
