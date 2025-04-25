import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe, Users } from "lucide-react"

export default function CommunityPage() {
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
              />
              <ChallengeCard
                title="Bike to Work Month"
                description="Commit to biking to work for a full month."
                participants={86}
                daysLeft={12}
                tags={["Transportation", "Intermediate"]}
              />
              <ChallengeCard
                title="Plant-Based Diet Challenge"
                description="Try a plant-based diet for two weeks."
                participants={215}
                daysLeft={9}
                tags={["Food", "Beginner"]}
              />
              <ChallengeCard
                title="Energy Saving Challenge"
                description="Reduce your home energy consumption by 20%."
                participants={94}
                daysLeft={18}
                tags={["Energy", "Advanced"]}
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
              <Button variant="outline" className="w-full">
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
              <Button variant="outline" className="w-full">
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
                    <Button variant="outline" size="sm">
                      Join
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Browse All Groups <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ChallengeCard({ title, description, participants, daysLeft, tags }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{participants} participants</span>
          </div>
          <div className="text-sm font-medium">{daysLeft} days left</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-green-600 hover:bg-green-700">Join Challenge</Button>
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
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{location}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">{date}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">By: {organizer}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Learn More</Button>
      </CardFooter>
    </Card>
  )
}
