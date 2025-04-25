import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Globe, Users, BarChart3 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About EcoShare Hub</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Our mission is to empower individuals and communities to track, visualize, and reduce their environmental
          impact.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              EcoShare Hub was created with a simple but powerful vision: to make environmental impact tracking
              accessible, engaging, and actionable for everyone. We believe that by providing people with the tools to
              understand their environmental footprint, we can inspire meaningful change at both individual and
              community levels.
            </p>
            <p>
              Our platform combines cutting-edge technology with environmental science to create a unique experience
              that not only educates but also motivates users to take positive action for our planet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard
                icon={<Leaf className="h-8 w-8 text-green-600" />}
                title="Impact Tracking"
                description="Monitor your carbon footprint and environmental impact with detailed metrics and visualizations."
              />
              <FeatureCard
                icon={<Globe className="h-8 w-8 text-green-600" />}
                title="3D Visualizations"
                description="Experience your environmental data through immersive and interactive 3D visualizations."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8 text-green-600" />}
                title="Community Engagement"
                description="Connect with like-minded individuals and participate in community challenges and projects."
              />
              <FeatureCard
                icon={<BarChart3 className="h-8 w-8 text-green-600" />}
                title="Data-Driven Insights"
                description="Gain valuable insights into your environmental impact with detailed analytics and personalized recommendations."
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="mb-6">
              EcoShare Hub is built by a passionate team of environmentalists, developers, and designers who are
              committed to creating a more sustainable future.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Alex Johnson",
                  role: "Founder & CEO",
                  bio: "Environmental scientist with a passion for technology and sustainability.",
                },
                {
                  name: "Maria Garcia",
                  role: "Lead Developer",
                  bio: "Full-stack developer specializing in interactive data visualizations.",
                },
                {
                  name: "Sam Taylor",
                  role: "Environmental Specialist",
                  bio: "Expert in carbon footprint calculation and environmental impact assessment.",
                },
              ].map((member) => (
                <Card key={member.name}>
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Commitment to Sustainability</h2>
            <p className="mb-4">
              At EcoShare Hub, we practice what we preach. Our platform is built with sustainability in mind, using
              energy-efficient technologies and carbon-neutral hosting services.
            </p>
            <p>
              We are committed to transparency and continuously work to improve our own environmental impact. For every
              new user who joins our platform, we plant a tree through our partnership with global reforestation
              initiatives.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-4">
              We'd love to hear from you! Whether you have questions, feedback, or partnership opportunities, feel free
              to reach out to us.
            </p>
            <p className="mb-2">
              <strong>Email:</strong> info@ecosharehub.com
            </p>
            <p className="mb-2">
              <strong>Address:</strong> 123 Green Street, Eco City, EC 12345
            </p>
            <p>
              <strong>Social Media:</strong> @EcoShareHub
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
