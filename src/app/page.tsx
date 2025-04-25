"use client"

import GlobeWrapper from "@/components/globe-wrapper"

export default function Home() {
  return (
    <>
      <div className="relative h-[80vh] w-full bg-gradient-to-b from-background/50 to-background">
        <div className="absolute inset-0 z-0">
          <GlobeWrapper />
        </div>
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent sm:text-5xl md:text-6xl">
            Welcome to EcoShare Hub
          </h1>
          <p className="text-lg mb-8 max-w-2xl text-muted-foreground">
            Track, visualize, and reduce your environmental impact with our platform. Join a global community committed to making a difference.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium">
              Get Started
            </button>
            <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-card text-card-foreground shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Resource Sharing</h2>
            <p className="text-muted-foreground">Share and request items within your community to reduce waste and promote sustainability.</p>
          </div>
          <div className="p-6 rounded-lg bg-card text-card-foreground shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Impact Tracking</h2>
            <p className="text-muted-foreground">Monitor your environmental impact with detailed analytics and personalized insights.</p>
          </div>
          <div className="p-6 rounded-lg bg-card text-card-foreground shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Community Challenges</h2>
            <p className="text-muted-foreground">Participate in challenges to earn rewards and make a meaningful difference in your community.</p>
          </div>
        </div>
      </div>
    </>
  )
}
