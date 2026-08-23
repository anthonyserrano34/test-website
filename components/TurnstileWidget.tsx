"use client"

import Script from "next/script"
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react"

export type TurnstileWidgetHandle = {
	reset: () => void
}

type TurnstileApi = {
	render: (
		element: string | HTMLElement,
		options: {
			sitekey: string
			theme?: "light" | "dark" | "auto"
			size?: "normal" | "flexible" | "compact"
			callback?: (token: string) => void
			"expired-callback"?: () => void
			"error-callback"?: () => void
		}
	) => string
	reset: (widgetId: string) => void
	remove: (widgetId: string) => void
}

declare global {
	interface Window {
		turnstile?: TurnstileApi
	}
}

type TurnstileWidgetProps = {
	onToken: (token: string) => void
	onExpire: () => void
}

const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
	function TurnstileWidget({ onToken, onExpire }, ref) {
		const containerRef = useRef<HTMLDivElement>(null)
		const widgetIdRef = useRef<string | null>(null)
		const onTokenRef = useRef(onToken)
		const onExpireRef = useRef(onExpire)
		const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

		useEffect(() => {
			onTokenRef.current = onToken
			onExpireRef.current = onExpire
		}, [onToken, onExpire])

		const renderWidget = useCallback(() => {
			if (!siteKey || !containerRef.current || !window.turnstile || widgetIdRef.current) {
				return
			}

			widgetIdRef.current = window.turnstile.render(containerRef.current, {
				sitekey: siteKey,
				theme: "dark",
				size: "flexible",
				callback: (token) => onTokenRef.current(token),
				"expired-callback": () => onExpireRef.current(),
				"error-callback": () => onExpireRef.current(),
			})
		}, [siteKey])

		useImperativeHandle(ref, () => ({
			reset: () => {
				if (widgetIdRef.current && window.turnstile) {
					window.turnstile.reset(widgetIdRef.current)
				}
			},
		}))

		useEffect(() => {
			renderWidget()

			return () => {
				if (widgetIdRef.current && window.turnstile) {
					window.turnstile.remove(widgetIdRef.current)
					widgetIdRef.current = null
				}
			}
		}, [renderWidget])

		if (!siteKey) {
			return (
				<p className="text-sm text-red-200">
					Turnstile is not configured. Add NEXT_PUBLIC_TURNSTILE_SITE_KEY to enable the form.
				</p>
			)
		}

		return (
			<>
				<Script
					src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
					strategy="afterInteractive"
					onLoad={renderWidget}
				/>
				<div ref={containerRef} className="min-h-[65px]" />
			</>
		)
	}
)

export default TurnstileWidget
