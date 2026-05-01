"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Star, Quote, ArrowRight } from "lucide-react"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote: "I was spending 2+ hours daily just writing captions. Now? 10 minutes max. The AI actually gets my brand voice. My engagement has never been higher.",
    author: "Sarah M.",
    role: "Candle Shop Owner",
    avatar: "SM",
    platform: "Instagram",
    result: "+340% engagement"
  },
  {
    quote: "The swipe feature is genius. Feels like dating apps but for captions. I can quickly pick what matches my vibe. Already recommended to 5 seller friends.",
    author: "David P.",
    role: "Streetwear Founder",
    avatar: "DP",
    platform: "All Platforms",
    result: "3x sales"
  },
  {
    quote: "Just opened my cafe and had NO idea how to market on social. PostAI saved me. Captions sound natural, not robotic. Regulars think I hired a marketing team!",
    author: "Jessica L.",
    role: "Cafe Owner",
    avatar: "JL",
    platform: "Facebook",
    result: "200+ new customers"
  },
  {
    quote: "Running 3 accounts was killing me. Now I generate content for all in one go. The hashtag suggestions alone are worth it. Finally can scale.",
    author: "Amanda T.",
    role: "E-commerce",
    avatar: "AT",
    platform: "Multi-Platform",
    result: "10hrs saved/week"
  },
  {
    quote: "What I love is how it adapts - professional for LinkedIn, casual for IG, trendy for Lemon8. Like having 3 copywriters in one tool.",
    author: "Ryan K.",
    role: "Marketing Coach",
    avatar: "RK",
    platform: "LinkedIn + IG",
    result: "15K signups"
  },
  {
    quote: "As a food blogger, finding the right words was exhausting. PostAI writes captions that make people hungry. My DMs are literally blowing up now.",
    author: "Mike C.",
    role: "Food Creator",
    avatar: "MC",
    platform: "Instagram",
    result: "50K new followers"
  },
]

const stats = [
  { value: "50K+", label: "Creators" },
  { value: "2.5M", label: "Posts" },
  { value: "340%", label: "Avg Growth" },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative"
    >
      <div className="p-6 rounded-lg bg-card/30 worn-border hover:bg-card/50 transition-all duration-500 h-full flex flex-col">
        {/* Quote icon - subtle */}
        <Quote className="w-6 h-6 text-muted-foreground/20 mb-4" />
        
        {/* Quote text */}
        <p className="text-foreground/80 text-sm leading-relaxed mb-6 flex-1">
          {testimonial.quote}
        </p>

        {/* Result badge */}
        <div className="mb-4">
          <span className="text-xs font-mono text-secondary px-2 py-1 rounded bg-secondary/10">
            {testimonial.result}
          </span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-border/30">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
            {testimonial.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
          {/* Stars */}
          <div className="ml-auto flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="fill-secondary text-secondary" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="reviews" ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      
      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-4"
          >
            Real Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Trusted by{" "}
            <span className="gradient-text">creators</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Join thousands who stopped struggling with content and started growing
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-12 md:gap-20 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-mono tracking-wider uppercase mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials grid - 3 columns on desktop */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-sm text-muted-foreground mb-6">
            Ready to join them?
          </p>
          <Button 
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8 btn-worn"
            asChild
          >
            <Link href="/register">
              Start Creating Free
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
