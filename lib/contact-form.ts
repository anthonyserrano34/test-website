export const REQUEST_TYPES = [
	{ value: "product", label: "Product inquiry", subjectTag: "Product" },
	{ value: "partnership", label: "Partnership", subjectTag: "Partnership" },
	{ value: "demo", label: "Request a demo", subjectTag: "Demo" },
	{ value: "support", label: "Support", subjectTag: "Support" },
	{ value: "press", label: "Press & media", subjectTag: "Press" },
	{ value: "other", label: "Other", subjectTag: "Other" },
] as const

export const CONTACT_LIMITS = {
	name: 80,
	company: 150,
	jobTitle: 120,
	country: 80,
	phone: 40,
	subject: 150,
	message: 5000,
	minSubmitMs: 2500,
	maxFormAgeMs: 2 * 60 * 60 * 1000,
	maxBodyBytes: 20_000,
} as const

export type RequestTypeValue = (typeof REQUEST_TYPES)[number]["value"]

export function getRequestType(value: string) {
	return REQUEST_TYPES.find((type) => type.value === value)
}

export function isRequestType(value: unknown): value is RequestTypeValue {
	return typeof value === "string" && REQUEST_TYPES.some((type) => type.value === value)
}
