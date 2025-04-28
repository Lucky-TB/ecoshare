"use client"

import GlobeWrapper from "@/components/globe-wrapper"
import { Globe, Users, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full bg-gradient-to-b from-background/50 to-background">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GlobeWrapper />
        </div>
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 text-primary">
            EcoShare Hub
          </h1>
          <p className="text-lg mb-8 max-w-2xl text-muted-foreground">
            Track, visualize, and reduce your environmental impact. Connect with a global community committed to a sustainable future.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => router.push('/auth/sign-up')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium"
            >
              Get Started
            </button>
            <button 
              onClick={() => router.push('/about')}
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-background py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Track Your Environmental Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg bg-card text-card-foreground shadow-sm flex flex-col items-center text-center">
              <Globe className="h-12 w-12 mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Interactive Visualizations</h3>
              <p className="text-muted-foreground">Explore your environmental impact through immersive 3D visualizations and interactive dashboards.</p>
            </div>
            <div className="p-8 rounded-lg bg-card text-card-foreground shadow-sm flex flex-col items-center text-center">
              <Users className="h-12 w-12 mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Community Engagement</h3>
              <p className="text-muted-foreground">Connect with like-minded individuals and participate in community challenges and projects.</p>
            </div>
            <div className="p-8 rounded-lg bg-card text-card-foreground shadow-sm flex flex-col items-center text-center">
              <BarChart3 className="h-12 w-12 mb-4 text-green-500" />
              <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
              <p className="text-muted-foreground">Gain valuable insights into your environmental impact with detailed analytics and personalized recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Movement Section */}
      <section className="bg-green-800 py-20 text-center text-white">
        <div className="container flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-4">Join the Movement</h2>
          <p className="text-lg mb-8 max-w-xl">
            Be part of a global community working together to create a more sustainable future.
          </p>
          <button 
            onClick={() => router.push('/auth/sign-up')}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow"
          >
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8 text-muted-foreground">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">© 2025 EcoShare Hub. All rights reserved.</div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </>
  )
}
