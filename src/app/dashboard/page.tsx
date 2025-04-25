import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Globe, Leaf, TrendingUp, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
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
                <div className="text-2xl font-bold">2.4 tons</div>
                <p className="text-xs text-muted-foreground">-12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78/100</div>
                <p className="text-xs text-muted-foreground">+4 points from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24th</div>
                <p className="text-xs text-muted-foreground">Top 10% of users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Actions Completed</CardTitle>
                <BarChart className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+8 new this month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Weekly Impact</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Interactive chart will be displayed here</p>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest environmental actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-green-100 p-2 dark:bg-green-900">
                      <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Planted a tree</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                      <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Used public transport</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                      <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Joined community challenge</p>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
