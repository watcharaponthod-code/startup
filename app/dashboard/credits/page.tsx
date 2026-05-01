"use client"

import { useState } from "react"
import { Topbar } from "@/components/dashboard/topbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Sparkles, 
  Crown,
  Building,
  Check,
  X,
  CreditCard,
  Smartphone
} from "lucide-react"

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Sparkles,
    credits: 10,
    posts: 300,
    price: 2.49,
    features: [
      "Never expires",
      "All platforms",
      "All AI tones",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    credits: 30,
    posts: 900,
    price: 5.99,
    originalPrice: 7.49,
    savings: "Save 20%",
    badge: "Most Popular",
    features: [
      "Never expires",
      "All platforms",
      "All AI tones",
      "Priority generation",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    icon: Building,
    credits: 100,
    posts: 3000,
    price: 16.99,
    savings: "Save 30%",
    features: [
      "Never expires",
      "All platforms",
      "All AI tones",
      "Priority generation",
      "Analytics dashboard",
    ],
    popular: false,
  },
]

export default function CreditsPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "card">("qr")

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlan(plan)
    setShowPaymentModal(true)
  }

  return (
    <div>
      <Topbar title="Buy Credits" />
      
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-1">Buy Credits</h2>
          <p className="text-muted-foreground">1 credit = 30 AI-generated posts</p>
        </div>

        {/* Current Credits */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full gradient-bg flex items-center justify-center mb-3">
            <span className="text-4xl font-bold text-white">2</span>
          </div>
          <p className="text-muted-foreground">credits remaining</p>
          <div className="w-48 h-2 bg-muted rounded-full overflow-hidden mt-3">
            <div className="w-1/5 h-full bg-primary rounded-full" />
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-card border rounded-2xl p-6 ${
                plan.popular 
                  ? "border-primary glow-purple scale-105 z-10" 
                  : "border-border"
              }`}
            >
              {plan.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg text-white border-0">
                  {plan.badge}
                </Badge>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${plan.popular ? "gradient-bg" : "bg-muted"} flex items-center justify-center mb-4`}>
                <plan.icon size={24} className={plan.popular ? "text-white" : "text-muted-foreground"} />
              </div>

              {/* Plan Info */}
              <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
              <p className="text-3xl font-bold mb-1">
                {plan.credits} <span className="text-base font-normal text-muted-foreground">credits</span>
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold">${plan.price}</span>
                {plan.originalPrice && (
                  <span className="text-muted-foreground line-through">${plan.originalPrice}</span>
                )}
              </div>
              {plan.savings && (
                <Badge variant="secondary" className="bg-green-500/20 text-green-500 border-green-500/30 mb-3">
                  {plan.savings}
                </Badge>
              )}
              <p className="text-sm text-muted-foreground mb-4">
                = {plan.posts.toLocaleString()} posts
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                onClick={() => handleSelectPlan(plan)}
                className={`w-full ${plan.popular ? "gradient-bg hover:opacity-90 text-white" : ""}`}
                variant={plan.popular ? "default" : "outline"}
              >
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/60"
              onClick={() => setShowPaymentModal(false)}
            />
            <div className="relative w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-xl">
              {/* Close */}
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

              {/* Order Details */}
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">{selectedPlan.name} ({selectedPlan.credits} credits)</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium">${selectedPlan.price}</span>
              </div>

              {/* Payment Method Tabs */}
              <div className="flex gap-2 mt-6 mb-4">
                <button
                  onClick={() => setPaymentMethod("qr")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                    paymentMethod === "qr"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Smartphone size={18} />
                  <span className="text-sm font-medium">QR Payment</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <CreditCard size={18} />
                  <span className="text-sm font-medium">Credit Card</span>
                </button>
              </div>

              {paymentMethod === "qr" ? (
                <div className="space-y-4">
                  {/* QR Code */}
                  <div className="flex flex-col items-center py-4">
                    <div className="w-48 h-48 bg-white rounded-xl p-3 mb-3">
                      <div className="w-full h-full bg-muted rounded flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">QR Code</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium">Scan to pay ${selectedPlan.price}</p>
                    <p className="text-xs text-muted-foreground mt-1">Bank: Chase xxx-xxx-1234</p>
                    <p className="text-xs text-amber-500 mt-2">QR expires in 14:32</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="bg-muted border-border"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry</Label>
                      <Input 
                        id="expiry"
                        placeholder="MM/YY"
                        className="bg-muted border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input 
                        id="cvv"
                        placeholder="123"
                        className="bg-muted border-border"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <Button 
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
              >
                Confirm Payment ${selectedPlan.price}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
