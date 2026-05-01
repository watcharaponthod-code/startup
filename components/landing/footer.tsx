"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const links = [
  { label: "Features", href: "#features" },
  { label: "Examples", href: "#examples" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image 
              src="/images/logo.png" 
              alt="PostAI Logo" 
              width={28} 
              height={28}
              className="rounded-md w-auto h-7"
            />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">PostAI</span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
            {links.map((link) => (
              <Link 
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors font-mono tracking-wider uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground/40 font-mono">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
