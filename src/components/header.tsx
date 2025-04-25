"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400">
              EcoShare Hub
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400">
            Dashboard
          </Link>
          <Link href="/community" className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400">
            Community
          </Link>
          <Link href="/impact" className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400">
            Impact
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-green-600 dark:hover:text-green-400">
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/community"
              className="px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/impact"
              className="px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Impact
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
