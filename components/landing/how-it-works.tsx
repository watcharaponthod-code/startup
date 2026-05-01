"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Type, Sparkles, Send, Zap } from "lucide-react"
import { useRef } from "react"

const steps = [
  {
    number: "01",
    icon: Type,
    title: "Describe",
    subtitle: "Your product",
    description: "Tell the AI what you sell. One line is all it takes.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Generate",
    subtitle: "30 variations",
    description: "AI creates 30 unique posts with different tones and hashtags.",
  },
  {
    number: "03",
    icon: Send,
    title: "Post",
    subtitle: "Everywhere",
    description: "Swipe to pick favorites. Auto-post to all your platforms.",
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Minimal background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/3 rounded-full blur-3xl pointer-events-none" />
      
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-4"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Three steps to{" "}
            <span className="gradient-text">content</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-lg mx-auto"
          >
            No copywriting skills needed. Just describe and let AI do the work.
          </motion.p>
        </div>

        {/* Steps - horizontal on desktop */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="relative group"
            >
              {/* Connector line - desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px">
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-border to-transparent origin-left"
                  />
                </div>
              )}
              
              <div className="text-center md:text-left">
                {/* Step number */}
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  className="inline-block text-6xl md:text-7xl font-bold text-muted/30 font-mono mb-4"
                >
                  {step.number}
                </motion.span>

                {/* Icon */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-lg bg-muted/50 flex items-center justify-center mb-4 mx-auto md:mx-0 worn-border"
                >
                  <step.icon size={24} className="text-foreground/70" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                <p className="text-sm text-secondary mb-3">{step.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 p-8 rounded-lg bg-card/30 worn-border"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Zap size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{"<"}10s</p>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Generation time</p>
            </div>
          </div>
          
          <div className="h-px w-16 sm:h-12 sm:w-px bg-border" />
          
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Sparkles size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">30</p>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Posts per credit</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
