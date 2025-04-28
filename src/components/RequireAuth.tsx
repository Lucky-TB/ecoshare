"use client"
import { useFirebase } from "@/firebase/FirebaseProvider"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useFirebase()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.replace("/auth/sign-in")
    }
  }, [user, loading, router, mounted])

  // Don't render anything until after hydration to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!user) return null
  return <>{children}</>
} 