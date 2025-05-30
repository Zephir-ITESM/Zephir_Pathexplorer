import { supabase } from "@/lib/supabase"

export interface LoginCredentials {
  correo: string
  contraseña: string
}

export interface User {
  id: string
  email: string
  profile?: any
}

export const authService = {
  // Login user
  async login(credentials: LoginCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.correo,
      password: credentials.contraseña,
    })

    if (error) {
      throw new Error(error.message)
    }

    return {
      user: data.user,
      session: data.session,
    }
  },

  // Logout user
  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  },

  // Get current session
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    if (error) {
      throw new Error(error.message)
    }
    return session
  },

  // Get current user
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      throw new Error(error.message)
    }
    return user
  },

  // Refresh session
  async refreshSession() {
    const { data, error } = await supabase.auth.refreshSession()
    if (error) {
      throw new Error(error.message)
    }
    return data.session
  },
}
