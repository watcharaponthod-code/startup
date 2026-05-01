"use client"

import { useState } from "react"
import { Topbar } from "@/components/dashboard/topbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Instagram, 
  Facebook,
  Copy,
  Share2,
  ChevronDown,
  Bot
} from "lucide-react"
import Link from "next/link"

const posts = [
  {
    id: 1,
    platform: "instagram",
    caption: "New iced coffee recipe! Rich, smooth, and refreshing. Only $2 - come try it today!",
    hashtags: ["#IcedCoffee", "#CoffeeLover", "#CafeLife", "#MorningVibes"],
    date: "May 1, 2026",
    status: "posted",
  },
  {
    id: 2,
    platform: "facebook",
    caption: "Hey coffee lovers! Looking for the perfect pick-me-up? Our signature iced coffee is waiting for you at just $2!",
    hashtags: ["#CoffeeShop", "#IcedCoffee", "#LocalCafe"],
    date: "May 1, 2026",
    status: "posted",
  },
  {
    id: 3,
    platform: "instagram",
    caption: "New arrival! Crop top with floral print - super cute! Only $6.99",
    hashtags: ["#Fashion", "#NewArrival", "#CropTop", "#Cute"],
    date: "Apr 30, 2026",
    status: "pending",
  },
  {
    id: 4,
    platform: "lemon8",
    caption: "Protein shake recipe - low fat, perfect for workout recovery!",
    hashtags: ["#Fitness", "#ProteinShake", "#Healthy", "#Workout"],
    date: "Apr 30, 2026",
    status: "posted",
  },
  {
    id: 5,
    platform: "instagram",
    caption: "Monday motivation! Start your week with our energizing coffee blend.",
    hashtags: ["#MondayMotivation", "#Coffee", "#StartTheWeek"],
    date: "Apr 29, 2026",
    status: "pending",
  },
  {
    id: 6,
    platform: "facebook",
    caption: "Special weekend offer! 20% off all drinks. Valid Saturday and Sunday only!",
    hashtags: ["#WeekendDeal", "#Discount", "#CoffeeTime"],
    date: "Apr 28, 2026",
    status: "posted",
  },
  {
    id: 7,
    platform: "instagram",
    caption: "Behind the scenes of our new menu photoshoot! Which drink looks most tempting?",
    hashtags: ["#BehindTheScenes", "#NewMenu", "#CoffeeLover"],
    date: "Apr 27, 2026",
    status: "pending",
  },
  {
    id: 8,
    platform: "lemon8",
    caption: "Coffee brewing tips: The secret to the perfect cup is all in the water temperature!",
    hashtags: ["#CoffeeTips", "#BrewingTips", "#CoffeeLovers"],
    date: "Apr 26, 2026",
    status: "posted",
  },
  {
    id: 9,
    platform: "facebook",
    caption: "Thank you for 1000 followers! Here is a special 10% discount code: THANKS1K",
    hashtags: ["#ThankYou", "#Milestone", "#Discount"],
    date: "Apr 25, 2026",
    status: "posted",
  },
]

const statusFilters = [
  { id: "all", label: "All", count: 47 },
  { id: "posted", label: "Posted", count: 23 },
  { id: "pending", label: "Pending", count: 24 },
]

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeStatus, setActiveStatus] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")

  const filteredPosts = posts.filter(post => {
    if (activeStatus !== "all" && post.status !== activeStatus) return false
    if (platformFilter !== "all" && post.platform !== platformFilter) return false
    if (searchQuery && !post.caption.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <Topbar title="Post Gallery" />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold mb-1">My Post Gallery</h2>
          <p className="text-muted-foreground">All posts created by AI for you</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted border-border"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              All Platforms
              <ChevronDown size={16} />
            </Button>
            <Button variant="outline" className="gap-2">
              All Status
              <ChevronDown size={16} />
            </Button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 border-b border-border">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveStatus(filter.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeStatus === filter.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all group"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {post.platform === "instagram" ? (
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
                        <Instagram size={12} className="text-white" />
                      </div>
                    ) : post.platform === "facebook" ? (
                      <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center">
                        <Facebook size={12} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-lg bg-yellow-400 flex items-center justify-center text-black font-bold text-xs">
                        L8
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <Badge 
                    variant={post.status === "posted" ? "default" : "secondary"}
                    className={post.status === "posted" ? "bg-green-500/20 text-green-500 border-green-500/30" : ""}
                  >
                    {post.status === "posted" ? "Posted" : "Pending"}
                  </Badge>
                </div>

                {/* Caption */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {post.caption}
                </p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.hashtags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-muted">
                      {tag}
                    </Badge>
                  ))}
                  {post.hashtags.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-muted">
                      +{post.hashtags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <Copy size={14} />
                    Copy
                  </Button>
                  <Button 
                    size="sm" 
                    className={`flex-1 gap-1 ${post.status === "pending" ? "gradient-bg hover:opacity-90 text-white" : ""}`}
                    variant={post.status === "posted" ? "outline" : "default"}
                  >
                    <Share2 size={14} />
                    {post.status === "posted" ? "View" : "Post"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Bot size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first AI-generated post
            </p>
            <Button className="gradient-bg hover:opacity-90 text-white" asChild>
              <Link href="/dashboard/generate">
                Create First Post
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
