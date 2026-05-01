"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Sparkles, Heart, MessageCircle, Share2, Bookmark, Copy, Check } from "lucide-react"

const prompts = [
  {
    id: "coffee",
    label: "Iced Coffee",
    prompt: "Selling iced coffee, price $2, cafe in mall",
  },
  {
    id: "fashion",
    label: "Fashion",
    prompt: "Oversized pastel shirt, $9.99, women 18-30",
  },
  {
    id: "skincare",
    label: "Skincare",
    prompt: "Natural face serum, $15, anti-aging benefits",
  },
]

const examplePosts: Record<string, Array<{
  platform: string
  icon: React.ElementType
  iconGradient: string
  tone: string
  caption: string
  hashtags: string[]
}>> = {
  coffee: [
    {
      platform: "Instagram",
      icon: Instagram,
      iconGradient: "from-pink-500 via-red-500 to-yellow-500",
      tone: "Casual & Fun",
      caption: "Need your caffeine fix? Our iced coffee is perfectly balanced - smooth, rich, and refreshing. Only $2! Come grab yours today!",
      hashtags: ["#IcedCoffee", "#CoffeeLover", "#CafeLife", "#MorningVibes", "#CoffeeAddict"],
    },
    {
      platform: "Facebook",
      icon: Facebook,
      iconGradient: "from-blue-600 to-blue-400",
      tone: "Friendly & Inviting",
      caption: "Hey coffee lovers! Looking for the perfect pick-me-up? Our signature iced coffee is waiting for you at just $2. See you at the shop!",
      hashtags: ["#CoffeeShop", "#IcedCoffee", "#LocalCafe"],
    },
    {
      platform: "Lemon8",
      icon: () => (
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-yellow-400 to-lime-500 flex items-center justify-center text-xs font-bold text-black">
          L8
        </div>
      ),
      iconGradient: "from-yellow-400 to-lime-500",
      tone: "Trendy & Educational",
      caption: "Coffee tip: The secret to the perfect iced coffee? Quality beans + proper brewing + the right ice ratio. Our $2 iced coffee has it all!",
      hashtags: ["#CoffeeTips", "#IcedCoffee", "#CoffeeReview", "#MustTry", "#FoodBlogger"],
    },
  ],
  fashion: [
    {
      platform: "Instagram",
      icon: Instagram,
      iconGradient: "from-pink-500 via-red-500 to-yellow-500",
      tone: "Trendy & Aesthetic",
      caption: "That soft girl aesthetic hits different. This oversized pastel shirt is giving main character energy. Only $9.99 and it&apos;s yours!",
      hashtags: ["#OOTD", "#PastelVibes", "#SoftGirl", "#FashionInspo", "#Aesthetic"],
    },
    {
      platform: "Facebook",
      icon: Facebook,
      iconGradient: "from-blue-600 to-blue-400",
      tone: "Value-Focused",
      caption: "Looking for the perfect work-to-weekend shirt? Our oversized pastel collection is both comfy AND stylish. Best part? Just $9.99!",
      hashtags: ["#Fashion", "#AffordableFashion", "#WomenStyle"],
    },
    {
      platform: "Lemon8",
      icon: () => (
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-yellow-400 to-lime-500 flex items-center justify-center text-xs font-bold text-black">
          L8
        </div>
      ),
      iconGradient: "from-yellow-400 to-lime-500",
      tone: "Review Style",
      caption: "Rating this oversized pastel shirt: Comfort 10/10, Style 10/10, Price $9.99 - honestly a steal. Here&apos;s 5 ways to style it!",
      hashtags: ["#FashionReview", "#StyleTips", "#OOTDIdeas", "#BudgetFashion"],
    },
  ],
  skincare: [
    {
      platform: "Instagram",
      icon: Instagram,
      iconGradient: "from-pink-500 via-red-500 to-yellow-500",
      tone: "Luxe & Results-Driven",
      caption: "Your skin deserves this glow-up. Our natural face serum is packed with anti-aging goodness. Just $15 for that glass skin effect!",
      hashtags: ["#Skincare", "#GlassSkin", "#AntiAging", "#NaturalBeauty", "#SkincareTips"],
    },
    {
      platform: "Facebook",
      icon: Facebook,
      iconGradient: "from-blue-600 to-blue-400",
      tone: "Educational & Trust-Building",
      caption: "Why natural skincare? Because your skin absorbs 60% of what you put on it. Our $15 face serum uses only clean ingredients for real anti-aging results.",
      hashtags: ["#NaturalSkincare", "#CleanBeauty", "#SkinHealth"],
    },
    {
      platform: "Lemon8",
      icon: () => (
        <div className="w-full h-full rounded-lg bg-gradient-to-br from-yellow-400 to-lime-500 flex items-center justify-center text-xs font-bold text-black">
          L8
        </div>
      ),
      iconGradient: "from-yellow-400 to-lime-500",
      tone: "Honest Review",
      caption: "30-day serum update: Fine lines? Fading. Skin texture? Smoother. Price? Only $15. This natural face serum is my new holy grail!",
      hashtags: ["#SkincareReview", "#BeautyTips", "#HolyGrail", "#AntiAgingSerum"],
    },
  ],
}

export function ExamplesSection() {
  const [activePrompt, setActivePrompt] = useState("coffee")
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section id="examples" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="bg-secondary/20 text-secondary border-secondary/30 mb-4">
            Live Demo
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            AI-Generated <span className="gradient-text">Examples</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See how AI creates different styles for each platform - click to try different products!
          </p>
        </motion.div>

        {/* Product tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {prompts.map((p) => (
            <Button
              key={p.id}
              variant={activePrompt === p.id ? "default" : "outline"}
              className={activePrompt === p.id ? "gradient-bg border-0" : "border-border"}
              onClick={() => setActivePrompt(p.id)}
            >
              {p.label}
            </Button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Input prompt */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <h3 className="font-semibold">Your Prompt</h3>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePrompt}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-muted rounded-xl p-4 border border-border mb-4"
                >
                  <p className="text-foreground font-medium">
                    {prompts.find(p => p.id === activePrompt)?.prompt}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                AI generating 30 variations...
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-primary">30</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-secondary">3</p>
                  <p className="text-xs text-muted-foreground">Platforms</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Generated posts */}
          <div className="lg:col-span-3 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePrompt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {examplePosts[activePrompt].map((post, index) => (
                  <motion.div
                    key={`${activePrompt}-${post.platform}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${post.iconGradient} flex items-center justify-center`}>
                          {typeof post.icon === 'function' ? (
                            <post.icon />
                          ) : (
                            <post.icon className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <span className="font-semibold">{post.platform}</span>
                          <p className="text-xs text-muted-foreground">{post.tone}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleCopy(post.caption + "\n\n" + post.hashtags.join(" "), index)}
                      >
                        {copiedIndex === index ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {post.caption}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.hashtags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-muted hover:bg-primary/20 transition-colors cursor-pointer">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Social engagement preview */}
                    <div className="flex items-center gap-4 pt-3 border-t border-border text-muted-foreground">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Heart size={14} />
                        <span>2.4K</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <MessageCircle size={14} />
                        <span>128</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <Share2 size={14} />
                        <span>56</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs ml-auto">
                        <Bookmark size={14} />
                        <span>Save</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-sm text-muted-foreground mt-6"
            >
              + 27 more variations with different tones and styles...
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
