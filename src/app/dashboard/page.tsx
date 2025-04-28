"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Globe, Leaf, TrendingUp, Users, RefreshCw, WifiOff, Plus } from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

// Mock data for offline use
const mockStats = {
  carbonFootprint: 2.5,
  impactScore: 75,
  communityRank: "Eco Warrior",
  actionsCompleted: 12,
  carbonChange: "+0.2 tons this week",
  impactChange: "+5 points this week",
  communityRankText: "Top 10% in your area",
  actionsChange: "+3 actions this week",
  recentActivities: [
    { action: "Recycled 5 items", date: "Today" },
    { action: "Used public transport", date: "Yesterday" },
    { action: "Planted a tree", date: "3 days ago" },
    { action: "Reduced meat consumption", date: "Last week" },
  ],
  analytics: [
    { week: "Week 1", impact: 65 },
    { week: "Week 2", impact: 68 },
    { week: "Week 3", impact: 70 },
    { week: "Week 4", impact: 72 },
    { week: "Week 5", impact: 75 },
  ],
}

const mockNotifications = [
  { title: "Achievement Unlocked", body: "You've reached Eco Warrior status!" },
  { title: "Weekly Challenge", body: "Complete 3 eco-friendly actions this week" },
  { title: "Community Event", body: "Join the local clean-up this Saturday" },
]

// Predefined eco-friendly activities with their impact values
const ecoActivities = [
  { id: "recycle", name: "Recycled items", carbonReduction: 0.05, impactPoints: 2 },
  { id: "public_transport", name: "Used public transport", carbonReduction: 0.1, impactPoints: 3 },
  { id: "bike", name: "Biked instead of driving", carbonReduction: 0.15, impactPoints: 4 },
  { id: "plant_tree", name: "Planted a tree", carbonReduction: 0.2, impactPoints: 5 },
  { id: "meat_free", name: "Had a meat-free meal", carbonReduction: 0.03, impactPoints: 1 },
  { id: "energy_save", name: "Reduced energy usage", carbonReduction: 0.08, impactPoints: 3 },
  { id: "water_save", name: "Conserved water", carbonReduction: 0.02, impactPoints: 1 },
  { id: "compost", name: "Composted waste", carbonReduction: 0.07, impactPoints: 2 },
  { id: "reusable", name: "Used reusable items", carbonReduction: 0.04, impactPoints: 2 },
  { id: "local_food", name: "Bought local food", carbonReduction: 0.06, impactPoints: 2 },
]

// Client-side only component
const DashboardContent = () => {
  const [stats, setStats] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOffline, setIsOffline] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<string>("")

  // Check if the browser is online
  useEffect(() => {
    const handleOnline = () => {
      console.log("Browser is online")
      setIsOffline(false)
    }
    
    const handleOffline = () => {
      console.log("Browser is offline")
      setIsOffline(true)
    }
    
    // Set initial state
    const online = navigator.onLine
    console.log("Initial online state:", online)
    setIsOffline(!online)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Load dashboard data from localStorage or use mock data
  useEffect(() => {
    const loadDashboardData = () => {
      try {
        setIsLoading(true)
        console.log("Loading dashboard data")

        // Try to get data from localStorage
        const savedStats = localStorage.getItem('dashboardStats')
        const savedNotifications = localStorage.getItem('dashboardNotifications')
        
        if (savedStats) {
          const parsedStats = JSON.parse(savedStats)
          setStats(parsedStats)
          setActivities(parsedStats.recentActivities || [])
          setAnalytics(parsedStats.analytics || [])
        } else {
          // Use mock data if nothing in localStorage
          setStats(mockStats)
          setActivities(mockStats.recentActivities)
          setAnalytics(mockStats.analytics)
          
          // Save mock data to localStorage for future use
          localStorage.setItem('dashboardStats', JSON.stringify(mockStats))
        }
        
        if (savedNotifications) {
          setNotifications(JSON.parse(savedNotifications))
        } else {
          setNotifications(mockNotifications)
          localStorage.setItem('dashboardNotifications', JSON.stringify(mockNotifications))
        }
        
        console.log("Dashboard data loaded successfully")
      } catch (err: any) {
        console.error("Error loading dashboard data:", err)
        // Fallback to mock data if there's an error
        setStats(mockStats)
        setNotifications(mockNotifications)
        setActivities(mockStats.recentActivities)
        setAnalytics(mockStats.analytics)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  // Function to update stats based on selected activity
  const handleUpdateStats = () => {
    if (!selectedActivity) {
      toast.error("Please select an activity first")
      return
    }

    const activity = ecoActivities.find(a => a.id === selectedActivity)
    if (!activity) return

    const updatedStats = {
      ...stats,
      carbonFootprint: (parseFloat(stats.carbonFootprint) - activity.carbonReduction).toFixed(1),
      impactScore: Math.min(100, stats.impactScore + activity.impactPoints),
      actionsCompleted: stats.actionsCompleted + 1,
      recentActivities: [
        { action: activity.name, date: "Just now" },
        ...stats.recentActivities.slice(0, 3)
      ],
      analytics: [
        ...stats.analytics,
        { week: `Week ${stats.analytics.length + 1}`, impact: Math.min(100, stats.impactScore + activity.impactPoints) }
      ]
    }
    
    setStats(updatedStats)
    setActivities(updatedStats.recentActivities)
    setAnalytics(updatedStats.analytics)
    
    // Save to localStorage
    localStorage.setItem('dashboardStats', JSON.stringify(updatedStats))
    
    // Show success toast
    toast.success(`Added: ${activity.name}`, {
      description: `Reduced carbon by ${activity.carbonReduction} tons and earned ${activity.impactPoints} impact points!`
    })
    
    // Reset selection
    setSelectedActivity("")
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          {isOffline && (
            <Alert variant="outline" className="py-1 px-2">
              <WifiOff className="h-4 w-4 mr-1" />
              <span className="text-xs">Offline Mode</span>
            </Alert>
          )}
          <div className="flex items-center gap-2">
            <Select value={selectedActivity} onValueChange={setSelectedActivity}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select an activity" />
              </SelectTrigger>
              <SelectContent>
                {ecoActivities.map((activity) => (
                  <SelectItem key={activity.id} value={activity.id}>
                    {activity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleUpdateStats}
              disabled={!selectedActivity}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
                <Leaf className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.carbonFootprint ?? "-"} tons</div>
                <p className="text-xs text-muted-foreground">{stats?.carbonChange ?? "-"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.impactScore ?? "-"}/100</div>
                <p className="text-xs text-muted-foreground">{stats?.impactChange ?? "-"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.communityRank ?? "-"}</div>
                <p className="text-xs text-muted-foreground">{stats?.communityRankText ?? "-"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Actions Completed</CardTitle>
                <BarChart className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.actionsCompleted ?? "-"}</div>
                <p className="text-xs text-muted-foreground">{stats?.actionsChange ?? "-"}</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Weekly Impact</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                {analytics.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={analytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="impact" stroke="#22c55e" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground">No analytics data yet.</p>
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest environmental actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.length > 0 ? activities.map((activity, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 rounded-full bg-green-100 p-2 dark:bg-green-900">
                        <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  )) : <p className="text-muted-foreground">No recent activities.</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              {analytics.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="impact" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground">No analytics data yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Downloadable and viewable reports will appear here soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {notifications.length > 0 ? notifications.map((n, i) => (
                  <li key={i} className="border-b pb-2 last:border-0 last:pb-0">
                    <span className="font-medium">{n.title}</span>
                    <div className="text-xs text-muted-foreground">{n.body}</div>
                  </li>
                )) : <li className="text-muted-foreground">No notifications.</li>}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Main dashboard component without authentication
export default function DashboardPage() {
  return <DashboardContent />
}
