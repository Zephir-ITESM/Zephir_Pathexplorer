"use client"

import type React from "react" // Ensure React is imported for JSX
import { useState, useEffect, createContext, useContext } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase" // Make sure this path is correct

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  login: (credentials: { correo: string; contraseña: string }) => Promise<void>
  logout: () => Promise<void>
  refreshSession: () => Promise<void>
}

// Initialize context with a default value that matches the type, or null.
// Using undefined can be tricky with TypeScript's strict null checks.
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const {
          data: { session: currentSession }, // Renamed to avoid conflict
        } = await supabase.auth.getSession()
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
      } catch (error) {
        console.error("Error getting initial session:", error)
        // Set to null on error to ensure a defined state
        setSession(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      setLoading(false) // Ensure loading is set to false here too
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (credentials: { correo: string; contraseña: string }) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.correo,
        password: credentials.contraseña,
      })

      if (error) {
        // It's good practice to throw the original error or a new error with context
        throw new Error(`Login failed: ${error.message}`)
      }

      // Ensure data and data.user/data.session are not null before setting state
      if (data?.user && data?.session) {
        setUser(data.user)
        setSession(data.session)
      } else {
        // Handle cases where login might succeed but not return expected data
        throw new Error("Login successful but no user/session data received.")
      }
    } catch (error) {
      console.error(error) // Log the error
      setUser(null) // Reset user/session on error
      setSession(null)
      throw error // Re-throw for the component to handle
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw new Error(`Logout failed: ${error.message}`)
      }
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const refreshSession = async () => {
    setLoading(true) // Good to indicate loading during refresh
    try {
      const { data, error } = await supabase.auth.refreshSession()
      if (error) {
        throw new Error(`Session refresh failed: ${error.message}`)
      }
      if (data?.session) {
        setSession(data.session)
        setUser(data.session?.user ?? null)
      } else {
        // If refresh fails to return a session, treat as logged out
        setUser(null)
        setSession(null)
      }
    } catch (error) {
      console.error(error)
      setUser(null) // Reset on error
      setSession(null)
      // Optionally re-throw or handle silently
    } finally {
      setLoading(false)
    }
  }

  // This is the value that will be provided to consumers of the context.
  const value = {
    user,
    session,
    loading,
    login,
    logout,
    refreshSession,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
