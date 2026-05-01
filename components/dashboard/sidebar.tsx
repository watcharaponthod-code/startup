"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Sparkles, 
  Image as ImageIcon, 
  Link2, 
  CreditCard, 
  Settings,
  LogOut
} from "lucide-react"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/generate", icon: Sparkles, label: "Generate Posts" },
  { href: "/dashboard/gallery", icon: ImageIcon, label: "Post Gallery" },
  { href: "/dashboard/connect", icon: Link2, label: "Connect Social" },
  { href: "/dashboard/credits", icon: CreditCard, label: "Buy Credits" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 glass border-r border-sidebar-border flex flex-col z-40">
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image 
            src="/images/logo.png" 
            alt="PostAI Logo" 
            width={32} 
            height={32}
            className="rounded-lg w-auto h-8"
          />
          <span className="text-xl font-bold gradient-text">PostAI</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-sidebar-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon size={18} className={isActive ? "text-primary" : ""} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground">2 credits</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </Link>
      </div>
    </aside>
  )
}
