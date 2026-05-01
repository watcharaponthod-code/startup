"use client"

import { Topbar } from "@/components/dashboard/topbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CreditCard, 
  FileText, 
  CheckCircle, 
  Link2, 
  ArrowRight,
  Instagram,
  Facebook,
  Clock
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    label: "Credits Remaining",
    value: "2",
    icon: CreditCard,
    color: "text-primary",
    progress: 20,
    link: "/dashboard/credits",
    linkText: "Buy more",
  },
  {
    label: "Posts Created",
    value: "47",
    icon: FileText,
    color: "text-secondary",
  },
  {
    label: "Posts Used",
    value: "23",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    label: "Connected Platforms",
    value: "2/3",
    icon: Link2,
    color: "text-primary",
  },
]

const recentPosts = [
  {
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400&auto=format&fit=crop",
    textOnImage: "NEW ARRIVAL",
    caption: "New arrival! Check out our latest spring collection...",
    time: "2 hours ago",
    status: "posted",
  },
  {
    platform: "facebook",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop",
    textOnImage: "SALE ALERT",
    caption: "Sale alert! Get 20% off all items this weekend...",
    time: "5 hours ago",
    status: "posted",
  },
  {
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop",
    textOnImage: "STYLE TIP",
    caption: "Behind the scenes of our photoshoot today...",
    time: "1 day ago",
    status: "pending",
  },
]

const connectedAccounts = [
  { platform: "Instagram", handle: "@somchai_shop", connected: true },
  { platform: "Facebook", handle: "Somchai Coffee Shop", connected: true },
  { platform: "Lemon8", handle: null, connected: false },
]

export default function DashboardPage() {
  return (
    <div>
      <Topbar title="Dashboard" />
      
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="glass-card p-5 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <stat.icon size={20} className={stat.color} />
                {stat.link && (
                  <Link 
                    href={stat.link}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    {stat.linkText}
                    <ArrowRight size={12} />
                  </Link>
                )}
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              {stat.progress !== undefined && (
                <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="gradient-bg rounded-2xl p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Create New Posts</h2>
            <p className="text-white/80 text-sm">Use 1 credit to get 30 AI-generated posts</p>
          </div>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90"
            asChild
          >
            <Link href="/dashboard/generate">
              <ArrowRight size={20} />
            </Link>
          </Button>
        </div>

        {/* Recent Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Posts</h2>
            <Link 
              href="/dashboard/gallery" 
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post, index) => (
              <div 
                key={index}
                className="glass-card overflow-hidden transition-colors group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt="Recent"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 glass flex items-center justify-center p-2 text-center border-none">
                    <span className="text-xs font-bold text-white uppercase italic drop-shadow-md">
                      {post.textOnImage}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge 
                      variant={post.status === "posted" ? "default" : "secondary"}
                      className={`text-[10px] h-5 ${post.status === "posted" ? "bg-green-500/80 backdrop-blur-sm text-white border-none" : "glass text-white border-none"}`}
                    >
                      {post.status === "posted" ? "Posted" : "Pending"}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {post.platform === "instagram" ? (
                      <Instagram size={14} className="text-pink-500" />
                    ) : (
                      <Facebook size={14} className="text-blue-500" />
                    )}
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{post.platform}</span>
                    <span className="text-[10px] text-muted-foreground ml-auto">{post.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                    {post.caption}
                  </p>
                  <Button 
                    size="sm" 
                    className="w-full"
                    variant={post.status === "posted" ? "glass" : "default"}
                  >
                    {post.status === "posted" ? "View Post" : "Post Now"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Accounts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Connected Accounts</h2>
            <Link 
              href="/dashboard/connect" 
              className="text-sm text-primary hover:underline"
            >
              Manage
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {connectedAccounts.map((account) => (
              <div 
                key={account.platform}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${
                  account.connected 
                    ? "glass-card" 
                    : "glass-light border-dashed"
                }`}
              >
                {account.platform === "Instagram" ? (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
                    <Instagram size={16} className="text-white" />
                  </div>
                ) : account.platform === "Facebook" ? (
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Facebook size={16} className="text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-black font-bold text-xs">
                    L8
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{account.platform}</p>
                  {account.connected ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-xs text-muted-foreground">{account.handle}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not connected</span>
                  )}
                </div>
                {!account.connected && (
                  <Button size="sm" variant="outline" className="ml-2 text-xs">
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
