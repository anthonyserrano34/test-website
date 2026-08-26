"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, ChevronDown, ArrowUpRight, Download } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavbarProps {
    isTransparent?: boolean;
}

const NEWS_LINKS = [
    {
        href: "/news",
        title: "Altwy News",
        description: "Updates from the team",
    },
    {
        href: "/press-news",
        title: "Press News",
        description: "Coverage of the market",
    },
];

const COMPANY_LINKS = [
    {
        href: "/company/altwy",
        title: "Altwy",
        description: "About the company",
    },
    {
        href: "/company/our-team",
        title: "Our Team",
        description: "The people behind it",
    },
];

export default function Navbar({ isTransparent = false }: NavbarProps) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [newsMenuOpen, setNewsMenuOpen] = useState(false);
    const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
    const [mobileNewsMenuOpen, setMobileNewsMenuOpen] = useState(false);
    const [mobileCompanyMenuOpen, setMobileCompanyMenuOpen] = useState(false);

    useEffect(() => {
        setMenuOpen(false);
        setNewsMenuOpen(false);
        setCompanyMenuOpen(false);
        setMobileNewsMenuOpen(false);
        setMobileCompanyMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isTransparent && !menuOpen
                        ? ""
                        : "bg-[#0E0E0E]/95 backdrop-blur-md"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-8">
                            <Link href="/" className="flex-shrink-0">
                                <Image
                                    src="/logo.png"
                                    alt="Altwy Logo"
                                    width={110}
                                    height={32}
                                    className="w-22 h-8"
                                />
                            </Link>
                            <div className="hidden md:flex items-center gap-1">
                                <Link
                                    href="/"
                                    className="text-white hover:text-[#00FF88] transition-colors duration-300 px-3 py-2 text-sm font-medium"
                                >
                                    Home
                                </Link>

                                <DesktopDropdown
                                    label="News"
                                    open={newsMenuOpen}
                                    onOpen={() => setNewsMenuOpen(true)}
                                    onClose={() => setNewsMenuOpen(false)}
                                    onToggle={() => setNewsMenuOpen((prev) => !prev)}
                                    links={NEWS_LINKS}
                                />

                                <DesktopDropdown
                                    label="Company"
                                    open={companyMenuOpen}
                                    onOpen={() => setCompanyMenuOpen(true)}
                                    onClose={() => setCompanyMenuOpen(false)}
                                    onToggle={() => setCompanyMenuOpen((prev) => !prev)}
                                    links={COMPANY_LINKS}
                                />
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                href="/contact"
                                className="inline-flex h-[38px] min-w-[132px] items-center justify-center gap-1.5 border border-neutral-200 bg-white px-3.5 text-sm font-medium text-neutral-900 transition-colors duration-300 hover:border-[#00FF88]"
                            >
                                <span>Contact Us</span>
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/download"
                                className="inline-flex h-[38px] min-w-[132px] items-center justify-center gap-1.5 border border-[#00FF88] bg-[#00FF88] px-3.5 text-sm font-medium text-black transition-colors duration-300 hover:border-[#33FFA0] hover:bg-[#33FFA0]"
                            >
                                <span>Download</span>
                                <Download className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#00FF88]/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden bg-[#0E0E0E]/95 backdrop-blur-md border-t border-neutral-800">
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            <Link
                                href="/"
                                className="text-white hover:bg-[#00FF88]/10 block px-3 py-3 rounded-md text-base font-medium"
                            >
                                Home
                            </Link>
                            <MobileAccordion
                                label="News"
                                open={mobileNewsMenuOpen}
                                onToggle={() => setMobileNewsMenuOpen((prev) => !prev)}
                                links={NEWS_LINKS}
                            />
                            <MobileAccordion
                                label="Company"
                                open={mobileCompanyMenuOpen}
                                onToggle={() => setMobileCompanyMenuOpen((prev) => !prev)}
                                links={COMPANY_LINKS}
                            />
                            <div className="pt-3">
                                <Link
                                    href="/contact"
                                    className="mb-2 inline-flex h-[38px] w-full items-center justify-center gap-1.5 border border-neutral-200 bg-white px-3.5 text-sm font-medium text-neutral-900 transition-colors duration-300 hover:border-[#00FF88]"
                                >
                                    <span>Contact Us</span>
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/download"
                                    className="inline-flex h-[38px] w-full items-center justify-center gap-1.5 border border-[#00FF88] bg-[#00FF88] px-3.5 text-sm font-medium text-black transition-colors duration-300 hover:border-[#33FFA0] hover:bg-[#33FFA0]"
                                >
                                    <span>Download</span>
                                    <Download className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}

function DesktopDropdown({
    label,
    open,
    onOpen,
    onClose,
    onToggle,
    links,
}: {
    label: string;
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    links: { href: string; title: string; description: string }[];
}) {
    return (
        <div
            className="relative pb-2 -mb-2"
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
        >
            <button
                type="button"
                onClick={onToggle}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    open
                        ? "bg-white/[0.12] text-white"
                        : "text-white hover:bg-white/[0.08] hover:text-white"
                }`}
            >
                {label}
                <ChevronDown
                    className={`h-4 w-4 transition-all duration-300 ease-out ${
                        open ? "translate-y-[1px] rotate-180" : "translate-y-0 rotate-0"
                    }`}
                />
            </button>

            <div
                className={`absolute left-0 top-full w-64 origin-top overflow-hidden rounded-xl border border-white/10 bg-[#111111]/95 shadow-2xl backdrop-blur-xl ring-1 ring-white/5 transition-all duration-200 ease-out ${
                    open
                        ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
                }`}
            >
                <div className="p-1.5">
                    {links.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.08]"
                        >
                            <p className="text-sm font-medium text-white">{item.title}</p>
                            <p className="mt-0.5 text-xs text-white/55">{item.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MobileAccordion({
    label,
    open,
    onToggle,
    links,
}: {
    label: string;
    open: boolean;
    onToggle: () => void;
    links: { href: string; title: string; description?: string }[];
}) {
    return (
        <div>
            <button
                type="button"
                onClick={onToggle}
                className="w-full text-white hover:bg-[#00FF88]/10 flex items-center justify-between px-3 py-3 rounded-md text-base font-medium"
            >
                <span>{label}</span>
                <ChevronDown
                    className={`h-4 w-4 transition-all duration-300 ease-out ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>
            <div
                className={`ml-3 grid overflow-hidden border-l border-white/10 transition-all duration-300 ease-out ${
                    open ? "mt-1 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    {links.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2 text-sm text-white/90 hover:bg-[#00FF88]/10"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
