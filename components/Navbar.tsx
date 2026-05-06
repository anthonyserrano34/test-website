"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";

interface NavbarProps {
    isTransparent?: boolean;
}

export default function Navbar({ isTransparent = false }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);

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
                        {/* Logo on the left */}
                        <div className="flex-shrink-0 flex items-center w-1/4">
                            <Link href="/" className="flex-shrink-0">
                                <Image
                                    src="/logo.png"
                                    alt="Altwy Logo"
                                    width={110}
                                    height={32}
                                    className="w-22 h-8"
                                />
                            </Link>
                        </div>

                        {/* Links in the center */}
                        <div className="hidden md:flex items-center justify-center space-x-8 w-2/4">
                            <Link
                                href="/"
                                className="text-white hover:text-[#00FF88] transition-colors duration-300 px-3 py-2 text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/company"
                                className="text-white hover:text-[#00FF88] transition-colors duration-300 px-3 py-2 text-sm font-medium"
                            >
                                Company
                            </Link>
                            <Link
                                href="/news"
                                className="text-white hover:text-[#00FF88] transition-colors duration-300 px-3 py-2 text-sm font-medium"
                            >
                                News
                            </Link>
                        </div>

                        {/* Contact Us on the right */}
                        <div className="hidden md:flex items-center justify-end w-1/4">
                            <Link
                                href="/contact"
                                className="group relative inline-flex w-full items-center justify-center border border-neutral-800 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors duration-300 hover:border-[#00FF88] sm:w-auto"
                            >
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF88] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                <div className="group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 opacity-0 w-2 h-2 border-[#00FF88] border-r border-b absolute right-0 bottom-0 translate-x-1 translate-y-1"></div>

                                <div className="relative z-10 flex w-full items-center justify-center gap-2 sm:justify-start">
                                    Contact Us
                                    <ArrowUpRight className="h-4 w-4" />
                                </div>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
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

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden bg-[#0E0E0E]/95 backdrop-blur-md border-t border-neutral-800">
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            <Link
                                href="/"
                                className="text-white hover:bg-[#00FF88]/10 block px-3 py-3 rounded-md text-base font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/company"
                                className="text-white hover:bg-[#00FF88]/10 block px-3 py-3 rounded-md text-base font-medium"
                            >
                                Company
                            </Link>
                            <Link
                                href="/news"
                                className="text-white hover:bg-[#00FF88]/10 block px-3 py-3 rounded-md text-base font-medium"
                            >
                                News
                            </Link>
                            <div className="pt-4 pb-2">
                                <Link
                                    href="/contact"
                                    className="group relative inline-flex w-full items-center justify-center border border-neutral-800 bg-white px-4 py-3 text-sm font-medium text-neutral-900 transition-colors duration-300 hover:border-[#00FF88]"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF88] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"></div>
                                    <div className="group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 opacity-0 w-2 h-2 border-[#00FF88] border-r border-b absolute right-0 bottom-0 translate-x-1 translate-y-1"></div>

                                    <div className="relative z-10 flex w-full items-center justify-center gap-2">
                                        Contact Us
                                        <ArrowUpRight className="h-4 w-4" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
