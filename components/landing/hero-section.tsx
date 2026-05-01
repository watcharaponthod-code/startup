"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"

// Dynamically import 3D scene to avoid SSR issues
const Hero3DScene = dynamic(
  () => import("./hero-3d-scene").then((mod) => mod.Hero3DScene),
  { ssr: false }
)

// Sample story posts that slide continuously
const storyPosts = [
  {
    id: 1,
    platform: "Instagram",
    content: "Start your morning right with our signature blend. Life is too short for bad coffee.",
    hashtags: ["#CoffeeLover", "#MorningVibes"],
    engagement: "2.4k"
  },
  {
    id: 2,
    platform: "Facebook", 
    content: "New arrivals just dropped! Oversized fits for your everyday comfort.",
    hashtags: ["#Fashion", "#NewIn"],
    engagement: "1.8k"
  },
  {
    id: 3,
    platform: "Lemon8",
    content: "Skincare routine that actually works. Glow from within.",
    hashtags: ["#Skincare", "#GlowUp"],
    engagement: "3.1k"
  },
  {
    id: 4,
    platform: "Instagram",
    content: "Weekend vibes only. Where are you headed this weekend?",
    hashtags: ["#WeekendMood", "#Travel"],
    engagement: "4.2k"
  },
  {
    id: 5,
    platform: "Facebook",
    content: "Handcrafted with love. Each piece tells a story.",
    hashtags: ["#Handmade", "#Artisan"],
    engagement: "1.5k"
  },
  {
    id: 6,
    platform: "Lemon8",
    content: "Minimalist living. Less stuff, more life.",
    hashtags: ["#Minimalism", "#Lifestyle"],
    engagement: "2.9k"
  }
]

function StoryPostCard({ post, index }: { post: typeof storyPosts[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex-shrink-0 w-72 p-5 rounded-lg glass-card group transition-all duration-500"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground font-mono tracking-wider uppercase">
          {post.platform}
        </span>
        <span className="text-xs text-muted-foreground">{post.engagement} likes</span>
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed mb-3 line-clamp-3">
        {post.content}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {post.hashtags.map((tag) => (
          <span key={tag} className="text-xs text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function AnimatedWord({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className="relative inline-block w-48 h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute left-0 gradient-text"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function HeroSection() {
  const animatedWords = ["smarter", "faster", "better", "effortless"]
  
  return (
    <section className="relative min-h-screen flex flex-col pt-20 overflow-hidden vignette">
      {/* 3D Background Scene */}
      <Hero3DScene />
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none z-[1]" />
      
      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Minimal badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider text-muted-foreground bg-muted/50 worn-border">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              AI-POWERED CONTENT
            </span>
          </motion.div>

          {/* Main headline with animated word */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight text-balance"
          >
            Create content
            <br />
            <AnimatedWord words={animatedWords} />
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-pretty"
          >
            Type your product. Get 30 unique posts instantly. 
            Swipe to select. Auto-post to all your platforms.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <Button 
              size="lg" 
              className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8 text-sm font-medium btn-worn" 
              asChild
            >
              <Link href="/register">
                Start Free
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="glass" 
              className="h-12 px-8 text-sm font-medium" 
              asChild
            >
              <Link href="#examples">
                See Examples
              </Link>
            </Button>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-muted-foreground/60 font-mono"
          >
            No credit card required
          </motion.p>
        </div>
      </div>

      {/* Story-like sliding posts section */}
      <div className="relative z-10 pb-16 mt-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="overflow-hidden"
        >
          {/* Section label */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <p className="text-xs text-muted-foreground/50 font-mono tracking-wider uppercase">
              AI-Generated Posts Preview
            </p>
          </div>
          
          {/* Auto-scrolling posts */}
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="flex auto-scroll">
              {/* First set */}
              <div className="flex gap-5 px-4">
                {storyPosts.map((post, index) => (
                  <StoryPostCard key={post.id} post={post} index={index} />
                ))}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex gap-5 px-4">
                {storyPosts.map((post, index) => (
                  <StoryPostCard key={`dup-${post.id}`} post={post} index={index} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground/40 font-mono tracking-wider">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  )
}
