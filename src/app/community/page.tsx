"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe, Users, X, Calendar, Search } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function CommunityPage() {
  const [joinedGroups, setJoinedGroups] = useState<string[]>([])
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([])
  const [joinedEvents, setJoinedEvents] = useState<string[]>([])
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [showGroups, setShowGroups] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleJoinChallenge = (challengeTitle: string) => {
    if (joinedChallenges.includes(challengeTitle)) {
      toast.info(`You've already joined the ${challengeTitle} challenge`)
      return
    }
    
    setJoinedChallenges([...joinedChallenges, challengeTitle])
    toast.success(`You've joined the ${challengeTitle} challenge!`)
  }

  const handleJoinGroup = (groupName: string) => {
    if (joinedGroups.includes(groupName)) {
      toast.info(`You're already a member of ${groupName}`)
      return
    }
    
    setJoinedGroups([...joinedGroups, groupName])
    toast.success(`You've joined ${groupName}!`)
  }

  const handleJoinEvent = (eventTitle: string) => {
    if (joinedEvents.includes(eventTitle)) {
      toast.info(`You've already registered for ${eventTitle}`)
      return
    }
    
    setJoinedEvents([...joinedEvents, eventTitle])
    toast.success(`You've registered for ${eventTitle}!`)
  }

  const handleViewLeaderboard = () => {
    setShowLeaderboard(true)
  }

  const handleViewEvents = () => {
    setShowEvents(true)
  }

  const handleBrowseGroups = () => {
    setShowGroups(true)
  }

  // Filter groups based on search query
  const filteredGroups = [
    { name: "Urban Gardeners", members: 342, description: "Connect with fellow urban gardeners and share tips for growing food in small spaces." },
    { name: "Zero Waste Living", members: 518, description: "Learn and share strategies for reducing waste and living a more sustainable lifestyle." },
    { name: "Renewable Energy Advocates", members: 276, description: "Discuss renewable energy technologies and advocate for clean energy policies." },
    { name: "Sustainable Fashion", members: 189, description: "Share ideas for sustainable fashion choices and ethical shopping practices." },
    { name: "Plant-Based Foodies", members: 432, description: "Share recipes and tips for delicious plant-based cooking." },
    { name: "Bike Commuters", members: 305, description: "Connect with fellow cyclists and share routes and tips for bike commuting." },
    { name: "Eco-Friendly Parents", members: 267, description: "Share ideas for raising children with eco-friendly values and practices." },
    { name: "Local Food Movement", members: 198, description: "Support local farmers and learn about seasonal eating." },
    { name: "Upcycling Creatives", members: 156, description: "Share creative ideas for upcycling and repurposing items." },
    { name: "Wildlife Conservation", members: 312, description: "Learn about and support wildlife conservation efforts." },
  ].filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Community</h1>
      <p className="text-muted-foreground mb-8">
        Connect with like-minded individuals and participate in community challenges.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Active Challenges */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Active Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ChallengeCard
                title="Zero Waste Week"
                description="Reduce your waste production to zero for one week."
                participants={128}
                daysLeft={5}
                tags={["Waste Reduction", "Beginner"]}
                onJoin={() => handleJoinChallenge("Zero Waste Week")}
                isJoined={joinedChallenges.includes("Zero Waste Week")}
              />
              <ChallengeCard
                title="Bike to Work Month"
                description="Commit to biking to work for a full month."
                participants={86}
                daysLeft={12}
                tags={["Transportation", "Intermediate"]}
                onJoin={() => handleJoinChallenge("Bike to Work Month")}
                isJoined={joinedChallenges.includes("Bike to Work Month")}
              />
              <ChallengeCard
                title="Plant-Based Diet Challenge"
                description="Try a plant-based diet for two weeks."
                participants={215}
                daysLeft={9}
                tags={["Food", "Beginner"]}
                onJoin={() => handleJoinChallenge("Plant-Based Diet Challenge")}
                isJoined={joinedChallenges.includes("Plant-Based Diet Challenge")}
              />
              <ChallengeCard
                title="Energy Saving Challenge"
                description="Reduce your home energy consumption by 20%."
                participants={94}
                daysLeft={18}
                tags={["Energy", "Advanced"]}
                onJoin={() => handleJoinChallenge("Energy Saving Challenge")}
                isJoined={joinedChallenges.includes("Energy Saving Challenge")}
              />
            </div>
          </section>

          {/* Community Projects */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Community Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProjectCard
                title="City Park Cleanup"
                description="Join us for a community cleanup of Central Park."
                location="New York, NY"
                date="May 15, 2023"
                organizer="Green City Initiative"
              />
              <ProjectCard
                title="Community Garden"
                description="Help establish a community garden in the neighborhood."
                location="Portland, OR"
                date="Ongoing"
                organizer="Urban Farmers Collective"
              />
              <ProjectCard
                title="Beach Cleanup Day"
                description="Help remove plastic and debris from our local beaches."
                location="San Diego, CA"
                date="June 5, 2023"
                organizer="Ocean Guardians"
              />
              <ProjectCard
                title="Tree Planting Initiative"
                description="Help plant 1,000 trees in urban areas."
                location="Multiple Locations"
                date="Year-round"
                organizer="Forest Friends"
              />
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top contributors this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Alex Johnson", score: 1250, rank: 1 },
                  { name: "Maria Garcia", score: 1120, rank: 2 },
                  { name: "Sam Taylor", score: 980, rank: 3 },
                  { name: "Jamie Smith", score: 845, rank: 4 },
                  { name: "Chris Lee", score: 790, rank: 5 },
                ].map((user) => (
                  <div key={user.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 text-center font-bold text-muted-foreground">{user.rank}</div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.name}</div>
                    </div>
                    <div className="font-bold text-green-600 dark:text-green-400">{user.score}</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleViewLeaderboard}
              >
                View Full Leaderboard
              </Button>
            </CardFooter>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Environmental events near you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Earth Day Celebration", date: "April 22, 2023", location: "City Park" },
                  { title: "Sustainability Workshop", date: "May 5, 2023", location: "Community Center" },
                  { title: "Farmers Market", date: "Every Saturday", location: "Downtown Square" },
                ].map((event) => (
                  <div key={event.title} className="border-b pb-3 last:border-0 last:pb-0">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleViewEvents}
              >
                View All Events
              </Button>
            </CardFooter>
          </Card>

          {/* Join a Group */}
          <Card>
            <CardHeader>
              <CardTitle>Join a Group</CardTitle>
              <CardDescription>Connect with people who share your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Urban Gardeners", members: 342 },
                  { name: "Zero Waste Living", members: 518 },
                  { name: "Renewable Energy Advocates", members: 276 },
                ].map((group) => (
                  <div key={group.name} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.members} members</p>
                    </div>
                    <Button 
                      variant={joinedGroups.includes(group.name) ? "secondary" : "outline"} 
                      size="sm"
                      onClick={() => handleJoinGroup(group.name)}
                    >
                      {joinedGroups.includes(group.name) ? "Joined" : "Join"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleBrowseGroups}
              >
                Browse All Groups <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Leaderboard Dialog */}
      <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Full Leaderboard</DialogTitle>
            <DialogDescription>
              Top environmental contributors this month
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {[
                { name: "Alex Johnson", score: 1250, rank: 1 },
                { name: "Maria Garcia", score: 1120, rank: 2 },
                { name: "Sam Taylor", score: 980, rank: 3 },
                { name: "Jamie Smith", score: 845, rank: 4 },
                { name: "Chris Lee", score: 790, rank: 5 },
                { name: "Jordan Brown", score: 745, rank: 6 },
                { name: "Taylor Wilson", score: 720, rank: 7 },
                { name: "Casey Martinez", score: 695, rank: 8 },
                { name: "Riley Thompson", score: 670, rank: 9 },
                { name: "Morgan Davis", score: 650, rank: 10 },
              ].map((user) => (
                <div key={user.name} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                      {user.rank}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{user.name}</div>
                  </div>
                  <div className="font-bold text-green-600 dark:text-green-400">{user.score}</div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLeaderboard(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Events Dialog */}
      <Dialog open={showEvents} onOpenChange={setShowEvents}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>All Events</DialogTitle>
            <DialogDescription>
              Upcoming environmental events in your area
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto py-4 pr-2">
            <div className="space-y-6">
              {[
                { title: "Earth Day Celebration", date: "April 22, 2023", location: "City Park", description: "Join us for a day of environmental awareness and activities." },
                { title: "Sustainability Workshop", date: "May 5, 2023", location: "Community Center", description: "Learn practical tips for living a more sustainable lifestyle." },
                { title: "Farmers Market", date: "Every Saturday", location: "Downtown Square", description: "Support local farmers and find fresh, organic produce." },
                { title: "Beach Cleanup", date: "May 15, 2023", location: "Ocean Beach", description: "Help keep our beaches clean and protect marine life." },
                { title: "Tree Planting Day", date: "June 3, 2023", location: "Forest Park", description: "Join us in planting 100 new trees to improve air quality." },
                { title: "Recycling Workshop", date: "May 20, 2023", location: "Green Community Center", description: "Learn about proper recycling techniques and waste reduction." },
                { title: "Electric Vehicle Expo", date: "June 10, 2023", location: "Convention Center", description: "Explore the latest in electric vehicles and sustainable transportation." },
                { title: "Community Garden Day", date: "May 25, 2023", location: "Community Garden", description: "Help plant and maintain our community garden." },
                { title: "Zero Waste Workshop", date: "June 15, 2023", location: "Eco Center", description: "Learn how to reduce your waste and live a zero-waste lifestyle." },
                { title: "Climate Action Rally", date: "June 22, 2023", location: "City Hall", description: "Join us in advocating for stronger climate policies." },
              ].map((event) => (
                <div key={event.title} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant={joinedEvents.includes(event.title) ? "secondary" : "outline"} 
                      size="sm"
                      onClick={() => handleJoinEvent(event.title)}
                      className="ml-4"
                    >
                      {joinedEvents.includes(event.title) ? "Registered" : "Join"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowEvents(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Groups Dialog */}
      <Dialog open={showGroups} onOpenChange={setShowGroups}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Browse All Groups</DialogTitle>
            <DialogDescription>
              Find and join groups that match your interests
            </DialogDescription>
          </DialogHeader>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-y-auto py-4 pr-2">
            <div className="space-y-4">
              {filteredGroups.map((group) => (
                <div key={group.name} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{group.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                      <div className="flex items-center gap-1 text-sm mt-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{group.members} members</span>
                      </div>
                    </div>
                    <Button 
                      variant={joinedGroups.includes(group.name) ? "secondary" : "outline"} 
                      size="sm"
                      onClick={() => handleJoinGroup(group.name)}
                      className="ml-4"
                    >
                      {joinedGroups.includes(group.name) ? "Joined" : "Join"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowGroups(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ChallengeCard({ title, description, participants, daysLeft, tags, onJoin, isJoined }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{participants} participants</span>
          <span>{daysLeft} days left</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={isJoined ? "secondary" : "default"}
          onClick={onJoin}
        >
          {isJoined ? "Joined" : "Join Challenge"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function ProjectCard({ title, description, location, date, organizer }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{organizer}</span>
          </div>
          <div className="text-muted-foreground">
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  )
}
