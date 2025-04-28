"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFirebase } from "@/firebase/FirebaseProvider"
import { Button } from "@/components/ui/button"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function SignInPage() {
  const { auth } = useFirebase()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to sign in.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form onSubmit={handleSignIn} className="bg-card p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2 text-center">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          className="border rounded px-4 py-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded px-4 py-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </Button>
        <div className="text-sm text-center mt-2">
          Don&apos;t have an account?{' '}
          <span className="text-primary cursor-pointer underline" onClick={() => router.push("/auth/sign-up")}>Sign Up</span>
        </div>
      </form>
    </div>
  )
}
