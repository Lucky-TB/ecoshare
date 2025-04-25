"use client"

import dynamic from "next/dynamic"
import ErrorBoundary from "./error-boundary"

// Dynamically import the HeroGlobe component with no SSR
const HeroGlobe = dynamic(() => import("./hero-globe"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="h-32 w-32 animate-pulse rounded-full bg-muted" />
    </div>
  ),
})

export default function GlobeWrapper() {
  return (
    <ErrorBoundary>
      <HeroGlobe />
    </ErrorBoundary>
  )
} 