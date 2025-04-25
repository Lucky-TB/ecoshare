import ImpactVisualization from "@/components/impact-visualization"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, BarChart3, Leaf, TrendingUp } from "lucide-react"

export default function ImpactPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">Your Environmental Impact</h1>
          <p className="text-muted-foreground mb-6">
            Track your progress and see how your actions are making a difference.
          </p>

          <Tabs defaultValue="visualization" className="space-y-4">
            <TabsList>
              <TabsTrigger value="visualization">Visualization</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="visualization" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Tree</CardTitle>
                  <CardDescription>
                    Your environmental impact visualized as a growing tree. The more positive actions you take, the more
                    your tree grows.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImpactVisualization impactScore={65} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Carbon Footprint</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Leaf className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">2.4 tons CO2e</div>
                        <p className="text-sm text-muted-foreground">12% below average</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Impact Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">65/100</div>
                        <p className="text-sm text-muted-foreground">Increased by 5 points this month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Actions Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <BarChart3 className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">42</div>
                        <p className="text-sm text-muted-foreground">8 new actions this month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Award className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-sm text-muted-foreground">3 new achievements unlocked</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Badges and rewards earned through your environmental actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Tree Planter", "Carbon Reducer", "Waste Warrior", "Energy Saver"].map((achievement) => (
                      <div key={achievement} className="flex flex-col items-center p-4 bg-muted rounded-lg">
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2">
                          <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm font-medium text-center">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full md:w-80">
          <Card>
            <CardHeader>
              <CardTitle>Improve Your Impact</CardTitle>
              <CardDescription>Suggested actions to reduce your environmental footprint</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Plant a Tree</h3>
                <p className="text-sm text-muted-foreground">
                  Planting trees helps absorb CO2 and provides habitat for wildlife.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Log Action <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Use Public Transport</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce your carbon footprint by using public transportation.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Log Action <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Reduce Plastic Usage</h3>
                <p className="text-sm text-muted-foreground">Switch to reusable alternatives to single-use plastics.</p>
                <Button variant="outline" size="sm" className="w-full">
                  Log Action <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
