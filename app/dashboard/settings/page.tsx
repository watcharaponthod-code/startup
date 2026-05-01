"use client"

import { useState } from "react"
import { Topbar } from "@/components/dashboard/topbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  User, 
  Lock, 
  Bell,
  CreditCard,
  Camera,
  Check,
  ChevronDown
} from "lucide-react"

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Account & Credits", icon: CreditCard },
]

const purchaseHistory = [
  { date: "Apr 28, 2026", plan: "Pro", credits: 30, price: "$5.99", status: "Completed" },
  { date: "Apr 15, 2026", plan: "Starter", credits: 10, price: "$2.49", status: "Completed" },
  { date: "Apr 1, 2026", plan: "Starter", credits: 10, price: "$2.49", status: "Completed" },
]

const usageHistory = [
  { date: "May 2, 2026", activity: "Generated 30 posts", credits: -1 },
  { date: "May 1, 2026", activity: "Generated 30 posts", credits: -1 },
  { date: "Apr 30, 2026", activity: "Generated 30 posts", credits: -1 },
  { date: "Apr 28, 2026", activity: "Purchased Pro Pack", credits: 30 },
  { date: "Apr 25, 2026", activity: "Generated 30 posts", credits: -1 },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div>
      <Topbar title="Settings" />
      
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Side Navigation */}
          <div className="lg:w-56 flex-shrink-0">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <tab.icon size={18} className={activeTab === tab.id ? "text-primary" : ""} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "billing" && <BillingTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileTab() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <h3 className="text-lg font-semibold">Profile Settings</h3>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <Button variant="outline" size="sm">Change Photo</Button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input 
            id="fullName"
            defaultValue="John Doe"
            className="bg-muted border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input 
              id="email"
              defaultValue="john@example.com"
              className="bg-muted border-border pr-24"
              disabled
            />
            <Badge className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500/20 text-green-500 border-green-500/30">
              Verified
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone"
            defaultValue="+1 (555) 123-4567"
            className="bg-muted border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Button variant="outline" className="w-full justify-between">
            English
            <ChevronDown size={16} />
          </Button>
        </div>
      </div>

      <Button className="gradient-bg hover:opacity-90 text-white">
        Save Changes
      </Button>
    </div>
  )
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold">Change Password</h3>

        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input 
            id="currentPassword"
            type="password"
            placeholder="Enter current password"
            className="bg-muted border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input 
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            className="bg-muted border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input 
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            className="bg-muted border-border"
          />
        </div>

        <Button className="gradient-bg hover:opacity-90 text-white">
          Update Password
        </Button>
      </div>

      {/* Connected Accounts */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>

        <div className="flex items-center gap-3 p-3 rounded-xl border border-border">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Google</p>
            <p className="text-xs text-muted-foreground">john@example.com - Connected</p>
          </div>
          <Check size={18} className="text-green-500" />
        </div>
      </div>
    </div>
  )
}

function NotificationsTab() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <h3 className="text-lg font-semibold">Notification Preferences</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Token Expiry Alerts</p>
            <p className="text-sm text-muted-foreground">Get notified when tokens are about to expire</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Post Success Notifications</p>
            <p className="text-sm text-muted-foreground">Get notified when posts are published</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Promotional Emails</p>
            <p className="text-sm text-muted-foreground">Receive updates about new features and offers</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Weekly Summary</p>
            <p className="text-sm text-muted-foreground">Get a weekly report of your activity</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  )
}

function BillingTab() {
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Current Plan</h3>
            <p className="text-muted-foreground">Free - 2 credits remaining</p>
          </div>
          <Button className="gradient-bg hover:opacity-90 text-white">
            Upgrade
          </Button>
        </div>
      </div>

      {/* Purchase History */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Purchase History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted-foreground font-medium">Date</th>
                <th className="text-left py-3 text-muted-foreground font-medium">Plan</th>
                <th className="text-left py-3 text-muted-foreground font-medium">Credits</th>
                <th className="text-left py-3 text-muted-foreground font-medium">Price</th>
                <th className="text-left py-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((item, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3">{item.date}</td>
                  <td className="py-3">{item.plan}</td>
                  <td className="py-3">{item.credits}</td>
                  <td className="py-3">{item.price}</td>
                  <td className="py-3">
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage History */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Credit Usage</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted-foreground font-medium">Date</th>
                <th className="text-left py-3 text-muted-foreground font-medium">Activity</th>
                <th className="text-right py-3 text-muted-foreground font-medium">Credits</th>
              </tr>
            </thead>
            <tbody>
              {usageHistory.map((item, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3">{item.date}</td>
                  <td className="py-3">{item.activity}</td>
                  <td className={`py-3 text-right font-medium ${item.credits > 0 ? "text-green-500" : "text-destructive"}`}>
                    {item.credits > 0 ? `+${item.credits}` : item.credits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-destructive/30 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
          Delete Account
        </Button>
      </div>
    </div>
  )
}
