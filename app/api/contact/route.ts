import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { CONTACT_LIMITS, getRequestType, isRequestType } from "@/lib/contact-form"
import {
	getClientIp,
	isAllowedOrigin,
	isBodyTooLarge,
	isFlooded,
	isJsonContentType,
	isRateLimited,
	isValidEmail,
	parseFormStartedAt,
	sanitizeHeaderValue,
	sanitizeMultiline,
	verifyTurnstileToken,
} from "@/lib/contact-security"

type ContactPayload = {
	firstName?: unknown
	lastName?: unknown
	email?: unknown
	phone?: unknown
	company?: unknown
	jobTitle?: unknown
	country?: unknown
	requestType?: unknown
	subject?: unknown
	message?: unknown
	website?: unknown
	fax?: unknown
	formStartedAt?: unknown
	turnstileToken?: unknown
}

function genericError() {
	return NextResponse.json(
		{ error: "Unable to send your message. Please try again later." },
		{ status: 400 }
	)
}

function jsonOk() {
	return NextResponse.json({ ok: true })
}

function requiredText(value: unknown, maxLength: number) {
	if (typeof value !== "string") return null
	const sanitized = sanitizeHeaderValue(value)
	if (!sanitized || sanitized.length > maxLength) return null
	return sanitized
}

function optionalText(value: unknown, maxLength: number) {
	if (typeof value !== "string") return undefined
	const sanitized = sanitizeHeaderValue(value)
	if (!sanitized) return undefined
	if (sanitized.length > maxLength) return null
	return sanitized
}

function honeypotFilled(body: ContactPayload) {
	return (
		(typeof body.website === "string" && body.website.trim() !== "") ||
		(typeof body.fax === "string" && body.fax.trim() !== "")
	)
}

export async function POST(request: NextRequest) {
	if (!isAllowedOrigin(request) || !isJsonContentType(request) || isBodyTooLarge(request)) {
		return genericError()
	}

	const ip = getClientIp(request)
	if (isFlooded(ip)) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429 }
		)
	}

	let body: ContactPayload
	try {
		const parsed: unknown = await request.json()
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
			return genericError()
		}
		body = parsed as ContactPayload
	} catch {
		return genericError()
	}

	const formTiming = parseFormStartedAt(body.formStartedAt)
	if (honeypotFilled(body)) {
		return NextResponse.json(
			{ error: "Unable to send your message. Please try again later." },
			{ status: 400 }
		)
	}
	if (formTiming === "invalid" || formTiming === "too_fast") {
		return NextResponse.json(
			{ error: "Please wait a moment and try again." },
			{ status: 400 }
		)
	}
	if (formTiming === "expired") {
		return NextResponse.json(
			{ error: "This form has expired. Please refresh the page and try again." },
			{ status: 400 }
		)
	}

	const firstName = requiredText(body.firstName, CONTACT_LIMITS.name)
	const lastName = optionalText(body.lastName, CONTACT_LIMITS.name)
	const emailRaw = requiredText(body.email, 254)
	const phone = optionalText(body.phone, CONTACT_LIMITS.phone)
	const company = optionalText(body.company, CONTACT_LIMITS.company)
	const jobTitle = optionalText(body.jobTitle, CONTACT_LIMITS.jobTitle)
	const country = optionalText(body.country, CONTACT_LIMITS.country)
	const subjectTitle = requiredText(body.subject, CONTACT_LIMITS.subject)
	const requestTypeValue = requiredText(body.requestType, 50)
	const message =
		typeof body.message === "string"
			? sanitizeMultiline(body.message).slice(0, CONTACT_LIMITS.message)
			: ""

	const email = emailRaw?.toLowerCase() ?? null

	if (
		!firstName ||
		!email ||
		!subjectTitle ||
		!requestTypeValue ||
		!message ||
		lastName === null ||
		phone === null ||
		company === null ||
		jobTitle === null ||
		country === null ||
		!isValidEmail(email) ||
		!isRequestType(requestTypeValue)
	) {
		return NextResponse.json(
			{ error: "Please check the required fields and try again." },
			{ status: 400 }
		)
	}

	const turnstileToken =
		typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : ""
	const turnstileOk = await verifyTurnstileToken(turnstileToken, ip)
	if (!turnstileOk) {
		return NextResponse.json(
			{ error: "Verification failed. Please try again." },
			{ status: 400 }
		)
	}

	const requestType = getRequestType(requestTypeValue)
	if (!requestType) {
		return genericError()
	}

	if (isRateLimited(ip, email)) {
		return NextResponse.json(
			{ error: "Too many requests. Please try again later." },
			{ status: 429 }
		)
	}

	const apiKey = process.env.RESEND_API_KEY
	const toEmail = process.env.CONTACT_TO_EMAIL
	const fromEmail = process.env.CONTACT_FROM_EMAIL || "Altwy <onboarding@resend.dev>"

	if (!apiKey || !toEmail) {
		console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL")
		return NextResponse.json(
			{ error: "Unable to send your message. Please try again later." },
			{ status: 500 }
		)
	}

	const fullName = lastName ? `${firstName} ${lastName}` : firstName
	const subject = `[${requestType.subjectTag}] ${subjectTitle}`
	const details: Array<[string, string | undefined]> = [
		["Request type", requestType.label],
		["Subject", subjectTitle],
		["Name", fullName],
		["Email", email],
		["Phone", phone],
		["Company", company],
		["Job title", jobTitle],
		["Country", country],
	]
	const filledDetails = details.filter((entry): entry is [string, string] => Boolean(entry[1]))
	const text = [
		...filledDetails.map(([label, value]) => `${label}: ${value}`),
		"",
		"Message:",
		message,
	].join("\n")

	const htmlRows = filledDetails
		.map(
			([label, value]) =>
				`<tr><td style="padding: 6px 0; color: #666; width: 140px;">${escapeHtml(label)}</td><td style="padding: 6px 0;">${escapeHtml(value)}</td></tr>`
		)
		.join("")

	const html = `
		<div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5; max-width: 640px;">
			<p style="margin: 0 0 16px;">New contact form submission from the Altwy website.</p>
			<table style="border-collapse: collapse; width: 100%;">
				${htmlRows}
			</table>
			<p style="margin: 20px 0 8px; color: #666;">Message</p>
			<p style="margin: 0; white-space: pre-wrap;">${formatMultiline(message)}</p>
		</div>
	`

	const resend = new Resend(apiKey)
	const { error } = await resend.emails.send({
		from: fromEmail,
		to: [toEmail],
		replyTo: email,
		subject,
		text,
		html,
	})

	if (error) {
		console.error("Resend error:", error)
		return NextResponse.json(
			{ error: "Unable to send your message. Please try again later." },
			{ status: 500 }
		)
	}

	return jsonOk()
}

function escapeHtml(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
}

function formatMultiline(value: string) {
	return escapeHtml(value).replace(/\n/g, "<br />")
}
