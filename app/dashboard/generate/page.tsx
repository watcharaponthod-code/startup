"use client"

import { useState } from "react"
import { Topbar } from "@/components/dashboard/topbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Instagram, 
  Facebook, 
  Check,
  X,
  Sparkles,
  Target,
  Smile,
  BookOpen,
  MessageCircle,
  Globe,
  Edit3
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const platforms = [
  { id: "instagram", label: "Instagram", icon: Instagram, gradient: "from-pink-500 via-red-500 to-yellow-500" },
  { id: "facebook", label: "Facebook", icon: Facebook, color: "bg-blue-500" },
  { id: "lemon8", label: "Lemon8", color: "bg-yellow-400", text: "L8" },
]

const contentModes = [
  { id: "diverse", label: "Diverse", description: "30 different styles", icon: Sparkles },
  { id: "variation", label: "Variation", description: "Same style, different layouts", icon: Target },
  { id: "mixed", label: "Mixed", description: "Best of both worlds", icon: MessageCircle },
]

const models = [
  { id: "ideogram", label: "Ideogram v3", description: "Best for text on image", badge: "Premium" },
  { id: "flux", label: "Flux 1.1 Pro", description: "Highest quality visuals", badge: "Pro" },
]

const samplePosts = [
  {
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
    caption: "Soft girl vibes! New oversized pastel shirt - super comfy. Only $9.99!",
    textOnImage: "NEW ARRIVAL\n$9.99",
    hashtags: ["#OOTD", "#Fashion"],
  },
  {
    platform: "instagram",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    caption: "Monday mood: Looking cute while staying comfortable! Our new pastel collection is here.",
    textOnImage: "MONDAY MOOD\nSHOP NOW",
    hashtags: ["#PastelVibes", "#NewArrival"],
  },
  {
    platform: "facebook",
    imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
    caption: "Hey fashion lovers! Looking for the perfect everyday shirt? Soft, stylish, and affordable.",
    textOnImage: "SOFT & STYLISH\n20% OFF",
    hashtags: ["#Fashion", "#NewCollection"],
  },
]

export default function GeneratePage() {
  const [step, setStep] = useState(1)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"])
  const [selectedMode, setSelectedMode] = useState("diverse")
  const [selectedModel, setSelectedModel] = useState("ideogram")
  const [prompt, setPrompt] = useState("")
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [savedPosts, setSavedPosts] = useState<number[]>([])

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    )
  }

  const handleGenerate = () => {
    setStep(2)
  }

  const handleSkip = () => {
    if (currentPostIndex < samplePosts.length - 1) {
      setCurrentPostIndex(prev => prev + 1)
    }
  }

  const handleSave = () => {
    if (!savedPosts.includes(currentPostIndex)) {
      setSavedPosts(prev => [...prev, currentPostIndex])
    }
    if (currentPostIndex < samplePosts.length - 1) {
      setCurrentPostIndex(prev => prev + 1)
    } else {
      setStep(3)
    }
  }

  const handleContinueToPost = () => {
    setStep(3)
  }

  return (
    <div>
      <Topbar title="Generate Posts" />
      
      <div className="p-6 max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= s 
                    ? "bg-primary text-white" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {s}
                </div>
                {i < 2 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-8 text-sm text-muted-foreground mb-8">
          <span className={step === 1 ? "text-foreground font-medium" : ""}>Enter Details</span>
          <span className={step === 2 ? "text-foreground font-medium" : ""}>Select Posts</span>
          <span className={step === 3 ? "text-foreground font-medium" : ""}>Post Now</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Select Platforms</h3>
                <div className="flex flex-wrap gap-3">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => togglePlatform(platform.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                        selectedPlatforms.includes(platform.id)
                          ? "border-primary/50 glass-button bg-primary/20"
                          : "border-white/10 glass-light hover:border-white/30"
                      }`}
                    >
                      {platform.icon ? (
                        <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${platform.gradient || ""} ${platform.color || ""} flex items-center justify-center`}>
                          {platform.icon && <platform.icon size={14} className="text-white" />}
                        </div>
                      ) : (
                        <div className={`w-6 h-6 rounded-lg ${platform.color} flex items-center justify-center text-xs font-bold text-black`}>
                          {platform.text}
                        </div>
                      )}
                      <span className="text-sm font-medium">{platform.label}</span>
                      {selectedPlatforms.includes(platform.id) && (
                        <Check size={14} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Mode Selection */}
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Content Mode</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {contentModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`flex flex-col items-start gap-1 p-4 rounded-xl border transition-all text-left ${
                        selectedMode === mode.id
                          ? "border-primary/50 glass-button bg-primary/20"
                          : "border-white/10 glass-light hover:border-white/30"
                      }`}
                    >
                      <mode.icon size={18} className={selectedMode === mode.id ? "text-primary" : "text-muted-foreground"} />
                      <span className="text-sm font-medium mt-1">{mode.label}</span>
                      <span className="text-xs text-muted-foreground leading-tight">{mode.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Model Selection */}
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">AI Engine</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`flex flex-col items-start gap-1 p-4 rounded-xl border transition-all text-left relative ${
                        selectedModel === model.id
                          ? "border-primary/50 glass-button bg-primary/20"
                          : "border-white/10 glass-light hover:border-white/30"
                      }`}
                    >
                      <Badge variant="secondary" className="absolute top-3 right-3 text-[10px] h-4 px-1 bg-primary/10 text-primary border-primary/20">
                        {model.badge}
                      </Badge>
                      <span className="text-sm font-medium">{model.label}</span>
                      <span className="text-xs text-muted-foreground leading-tight">{model.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Describe Your Product</h3>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Selling oversized pastel shirts for office women, price $9.99, free shipping nationwide"
                  className="min-h-32 bg-muted border-border resize-none"
                />
              </div>

              {/* Credit Info */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border">
                <span className="text-sm text-muted-foreground">
                  Uses 1 credit - 2 credits remaining after
                </span>
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  30 posts
                </Badge>
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleGenerate}
                className="w-full h-12 gradient-bg hover:opacity-90 text-white gap-2"
                disabled={selectedPlatforms.length === 0 || !prompt.trim()}
              >
                <Sparkles size={18} />
                Generate 30 Posts
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Counter */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Post {currentPostIndex + 1} / {samplePosts.length}
                </span>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {savedPosts.length} saved
                </Badge>
              </div>

              <div className="flex justify-center">
                <motion.div
                  key={currentPostIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-sm glass-card overflow-hidden shadow-2xl relative"
                >
                  {/* Platform Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    {samplePosts[currentPostIndex].platform === "instagram" ? (
                      <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                        <Instagram size={16} className="text-white" />
                      </div>
                    ) : samplePosts[currentPostIndex].platform === "facebook" ? (
                      <div className="w-8 h-8 rounded-lg bg-blue-500/80 backdrop-blur-sm flex items-center justify-center">
                        <Facebook size={16} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-yellow-400/80 backdrop-blur-sm flex items-center justify-center text-black font-bold text-sm">
                        L8
                      </div>
                    )}
                  </div>

                  {/* AI Generated Image with Text Overlay */}
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={samplePosts[currentPostIndex].imageUrl} 
                      alt="AI Generated"
                      className="w-full h-full object-cover"
                    />
                    {/* Simulated Text-on-Image (Ideogram/Flux result) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="glass p-4 rounded-xl">
                        <h4 className="text-2xl font-black text-white leading-tight whitespace-pre-line uppercase italic">
                          {samplePosts[currentPostIndex].textOnImage}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Caption & Info */}
                  <div className="p-6">
                    <p className="text-sm leading-relaxed mb-4 text-muted-foreground line-clamp-2">
                      {samplePosts[currentPostIndex].caption}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {samplePosts[currentPostIndex].hashtags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] bg-white/5 border-white/10 h-5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-8">
                <button
                  onClick={handleSkip}
                  className="w-16 h-16 rounded-full border-2 border-destructive/50 flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <X size={28} />
                </button>
                <button
                  onClick={handleSave}
                  className="w-16 h-16 rounded-full border-2 border-green-500/50 flex items-center justify-center text-green-500 hover:bg-green-500/10 transition-colors"
                >
                  <Check size={28} />
                </button>
              </div>

              {/* Saved Posts Preview */}
              {savedPosts.length > 0 && (
                <div className="flex justify-center gap-2 pt-4">
                  {savedPosts.slice(-3).map((index) => (
                    <div 
                      key={index}
                      className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground"
                    >
                      #{index + 1}
                    </div>
                  ))}
                </div>
              )}

              {/* Continue Button */}
              {savedPosts.length > 0 && (
                <Button 
                  onClick={handleContinueToPost}
                  variant="outline"
                  className="w-full"
                >
                  Continue with {savedPosts.length} posts
                </Button>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="font-semibold">Selected Posts ({savedPosts.length})</h3>

              {/* Post Cards Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {savedPosts.map((index) => (
                  <div 
                    key={index}
                    className="glass-card overflow-hidden group relative"
                  >
                    <button 
                      onClick={() => setSavedPosts(prev => prev.filter(i => i !== index))}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full glass text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                      <X size={12} />
                    </button>
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={samplePosts[index].imageUrl} 
                        alt="Selected"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 glass flex items-center justify-center p-2 text-center border-none">
                        <span className="text-[10px] font-bold text-white uppercase italic drop-shadow-md">
                          {samplePosts[index].textOnImage}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 flex items-center gap-2">
                      <Edit3 size={14} className="text-muted-foreground cursor-pointer hover:text-foreground" />
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {samplePosts[index].caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Account Selection */}
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Select Accounts to Post</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-white/5 glass-light hover:bg-white/5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-primary" defaultChecked />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
                      <Instagram size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Instagram</p>
                      <p className="text-xs text-muted-foreground">@somchai_shop</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/50 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-primary" defaultChecked />
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <Facebook size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Facebook</p>
                      <p className="text-xs text-muted-foreground">Somchai Coffee Shop</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  Save for Later
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  Post Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
