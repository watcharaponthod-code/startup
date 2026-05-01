"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "$2.49",
    credits: 10,
    posts: 300,
    description: "Try it out",
    features: [
      "10 credits",
      "300 posts",
      "3 platforms",
      "All tones",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$5.99",
    originalPrice: "$7.49",
    credits: 30,
    posts: 900,
    description: "Best value",
    badge: "Popular",
    features: [
      "30 credits",
      "900 posts",
      "3 platforms",
      "All tones",
      "Priority speed",
      "Save 20%",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: "$16.99",
    credits: 100,
    posts: 3000,
    description: "Scale up",
    features: [
      "100 credits",
      "3,000 posts",
      "3 platforms",
      "All tones",
      "Priority speed",
      "Analytics",
      "Save 33%",
    ],
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Minimal background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-muted-foreground/60 tracking-wider uppercase mb-4"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Pay as you{" "}
            <span className="gradient-text">go</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            1 credit = 30 posts. No subscriptions. Credits never expire.
          </motion.p>
        </div>

        {/* Free trial note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-secondary/10 text-secondary worn-border">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Start with 1 free credit - no card needed
          </span>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-lg overflow-hidden ${
                plan.popular 
                  ? "glass-card ring-1 ring-secondary/30" 
                  : "glass-card"
              }`}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-mono text-secondary px-2 py-1 rounded bg-secondary/10">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Plan name */}
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                    {plan.posts.toLocaleString()} posts
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-secondary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  className={`w-full h-11 ${
                    plan.popular 
                      ? "bg-foreground text-background hover:bg-foreground/90" 
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  } btn-worn`}
                  asChild
                >
                  <Link href="/register">
                    Choose {plan.name}
                    <ArrowRight size={14} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-xs text-muted-foreground/60 font-mono"
        >
          <span className="flex items-center gap-2">
            <Check size={12} className="text-secondary" />
            Secure payment
          </span>
          <span className="flex items-center gap-2">
            <Check size={12} className="text-secondary" />
            Instant access
          </span>
          <span className="flex items-center gap-2">
            <Check size={12} className="text-secondary" />
            No expiration
          </span>
        </motion.div>
      </div>
    </section>
  )
}
