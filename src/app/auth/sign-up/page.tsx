"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFirebase } from "@/firebase/FirebaseProvider"
import { Button } from "@/components/ui/button"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function SignUpPage() {
  const { auth } = useFirebase()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to sign up.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form onSubmit={handleSignUp} className="bg-card p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2 text-center">Sign Up</h1>
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
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <div className="text-sm text-center mt-2">
          Already have an account?{' '}
          <span className="text-primary cursor-pointer underline" onClick={() => router.push("/auth/sign-in")}>Sign In</span>
        </div>
      </form>
    </div>
  )
}
