"use client"

import { Topbar } from "@/components/dashboard/topbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Instagram, 
  Facebook,
  RefreshCw,
  Shield,
  AlertTriangle
} from "lucide-react"

const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    description: "Auto-post photos + captions + hashtags",
    icon: Instagram,
    gradient: "from-pink-500 via-red-500 to-yellow-500",
    borderColor: "border-l-pink-500",
    connected: true,
    handle: "@somchai_shop",
    followers: "1,240 followers",
    tokenExpiry: "3 days",
    tokenWarning: true,
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Auto-post to your Facebook Page",
    icon: Facebook,
    color: "bg-blue-500",
    borderColor: "border-l-blue-500",
    connected: true,
    handle: "Somchai Coffee Shop",
    pageType: "Page",
    tokenExpiry: "45 days",
    tokenWarning: false,
  },
  {
    id: "lemon8",
    name: "Lemon8",
    description: "Auto-post to Lemon8 platform",
    text: "L8",
    color: "bg-yellow-400",
    textColor: "text-black",
    borderColor: "border-l-yellow-400",
    connected: false,
  },
]

export default function ConnectPage() {
  return (
    <div>
      <Topbar title="Connect Social" />
      
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Connect Social Media</h2>
          <p className="text-muted-foreground">Connect your accounts for automatic posting</p>
        </div>

        {/* Warning Banner */}
        <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-500">Instagram token expires in 3 days</p>
            <p className="text-xs text-amber-500/80 mt-1">Click Refresh Token to extend access</p>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="space-y-4">
          {platforms.map((platform) => (
            <div 
              key={platform.id}
              className={`bg-card border border-border ${platform.borderColor} border-l-4 rounded-2xl p-6`}
            >
              <div className="flex items-start gap-4">
                {/* Platform Icon */}
                {platform.icon ? (
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.gradient || ""} ${platform.color || ""} flex items-center justify-center flex-shrink-0`}>
                    <platform.icon size={24} className="text-white" />
                  </div>
                ) : (
                  <div className={`w-12 h-12 rounded-xl ${platform.color} flex items-center justify-center flex-shrink-0 text-lg font-bold ${platform.textColor}`}>
                    {platform.text}
                  </div>
                )}

                {/* Platform Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{platform.name}</h3>
                    {platform.connected ? (
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Not Connected
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{platform.description}</p>

                  {platform.connected ? (
                    <div className="space-y-2">
                      {/* Account Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold">
                          {platform.handle?.charAt(1).toUpperCase() || "S"}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{platform.handle}</p>
                          <p className="text-xs text-muted-foreground">
                            {platform.followers || platform.pageType}
                          </p>
                        </div>
                      </div>

                      {/* Token Info */}
                      <p className={`text-xs ${platform.tokenWarning ? "text-amber-500" : "text-green-500"}`}>
                        Token expires: {platform.tokenExpiry}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        {platform.tokenWarning && (
                          <Button size="sm" variant="outline" className="gap-1.5 border-amber-500/50 text-amber-500 hover:bg-amber-500/10">
                            <RefreshCw size={14} />
                            Refresh Token
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                          Disconnect
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button className="gradient-bg hover:opacity-90 text-white">
                      Connect {platform.name}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Info */}
        <div className="flex items-center gap-3 p-4 bg-muted rounded-xl border border-border">
          <Shield size={20} className="text-primary" />
          <p className="text-sm text-muted-foreground">
            Your connection data is encrypted with AES-256 and 100% secure
          </p>
        </div>
      </div>
    </div>
  )
}
