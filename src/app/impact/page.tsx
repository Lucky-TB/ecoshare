"use client"

import { useState, useEffect } from "react"
import RequireAuth from "@/components/RequireAuth"
import ImpactVisualization from "@/components/impact-visualization"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, BarChart3, Leaf, RefreshCw, TrendingUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Define impact actions
const IMPACT_ACTIONS = {
  PLANT_TREE: { points: 10, label: "Plant a Tree", description: "Planting trees helps absorb CO2 and provides habitat for wildlife." },
  USE_TRANSPORT: { points: 5, label: "Use Public Transport", description: "Reduce your carbon footprint by using public transportation." },
  REDUCE_PLASTIC: { points: 3, label: "Reduce Plastic Usage", description: "Switch to reusable alternatives to single-use plastics." },
}

// Initial state values
const INITIAL_STATE = {
  impactScore: 50,
  actionsCompleted: 42,
  carbonFootprint: 2.4,
  achievements: 12
}

export default function ImpactPage() {
  const { toast } = useToast()
  const [impactScore, setImpactScore] = useState(INITIAL_STATE.impactScore)
  const [actionsCompleted, setActionsCompleted] = useState(INITIAL_STATE.actionsCompleted)
  const [carbonFootprint, setCarbonFootprint] = useState(INITIAL_STATE.carbonFootprint)
  const [achievements, setAchievements] = useState(INITIAL_STATE.achievements)

  // Load saved stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem("impactStats")
    if (savedStats) {
      const stats = JSON.parse(savedStats)
      setImpactScore(stats.impactScore)
      setActionsCompleted(stats.actionsCompleted)
      setCarbonFootprint(stats.carbonFootprint)
      setAchievements(stats.achievements)
    }
  }, [])

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      "impactStats",
      JSON.stringify({
        impactScore,
        actionsCompleted,
        carbonFootprint,
        achievements,
      })
    )
  }, [impactScore, actionsCompleted, carbonFootprint, achievements])

  const handleLogAction = (action: keyof typeof IMPACT_ACTIONS) => {
    const { points, label } = IMPACT_ACTIONS[action]
    
    // Update impact score
    setImpactScore((prev) => Math.min(100, prev + points))
    
    // Update actions completed
    setActionsCompleted((prev) => prev + 1)
    
    // Update carbon footprint (reduce by a small amount)
    setCarbonFootprint((prev) => Math.max(0, prev - 0.1))
    
    // Check for achievements
    if (actionsCompleted + 1 >= 50 && achievements === 12) {
      setAchievements((prev) => prev + 1)
      toast({
        title: "New Achievement Unlocked!",
        description: "Environmental Champion - Complete 50 actions",
      })
    }

    // Show success toast
    toast({
      title: "Action Logged Successfully",
      description: `You've completed: ${label}. Impact score increased by ${points} points!`,
    })
  }

  const handleResetApp = () => {
    // Clear localStorage
    localStorage.removeItem("impactStats")
    
    // Reset state to initial values
    setImpactScore(INITIAL_STATE.impactScore)
    setActionsCompleted(INITIAL_STATE.actionsCompleted)
    setCarbonFootprint(INITIAL_STATE.carbonFootprint)
    setAchievements(INITIAL_STATE.achievements)
    
    // Show confirmation toast
    toast({
      title: "App Reset",
      description: "All progress has been reset to initial values.",
    })
  }

  return (
    <RequireAuth>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">Your Environmental Impact</h1>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetApp}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset App
              </Button>
            </div>
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
                    <ImpactVisualization impactScore={impactScore} />
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
                          <div className="text-2xl font-bold">{carbonFootprint.toFixed(1)} tons CO2e</div>
                          <p className="text-sm text-muted-foreground">
                            {carbonFootprint < 2.5 ? "Below" : "Above"} average
                          </p>
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
                          <div className="text-2xl font-bold">{impactScore}/100</div>
                          <p className="text-sm text-muted-foreground">Keep going!</p>
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
                          <div className="text-2xl font-bold">{actionsCompleted}</div>
                          <p className="text-sm text-muted-foreground">Keep up the good work!</p>
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
                          <div className="text-2xl font-bold">{achievements}</div>
                          <p className="text-sm text-muted-foreground">Unlock more by taking action!</p>
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
                {Object.entries(IMPACT_ACTIONS).map(([key, { label, description, points }]) => (
                  <div key={key} className="space-y-2">
                    <h3 className="font-medium">{label}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleLogAction(key as keyof typeof IMPACT_ACTIONS)}
                    >
                      Log Action <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </RequireAuth>
  )
}
