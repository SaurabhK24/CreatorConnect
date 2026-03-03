"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type User = {
  id: string
  name: string
  email: string
  company?: string
  plan?: "free" | "pro" | "enterprise"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, company?: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const STORAGE_KEY = "cc_user_session"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    setError(null)
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 900))
      if (!email || !password) throw new Error("Please fill in all fields.")
      if (password.length < 6) throw new Error("Password must be at least 6 characters.")
      const u: User = {
        id: btoa(email),
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        plan: "free",
      }
      setUser(u)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed.")
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, company?: string) => {
    setError(null)
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 900))
      if (!name || !email || !password) throw new Error("Please fill in all fields.")
      if (password.length < 6) throw new Error("Password must be at least 6 characters.")
      const u: User = {
        id: btoa(email + Date.now()),
        name,
        email,
        company,
        plan: "free",
      }
      setUser(u)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signup failed.")
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, error, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
