"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  genre?: string
  linkedAccounts?: {
    youtube?: { username: string; linked: boolean }
    instagram?: { username: string; linked: boolean }
    tiktok?: { username: string; linked: boolean }
  }
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (userData: Partial<User>) => void
  updateUser: (userData: Partial<User>) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Simulate checking auth status from localStorage or an API
    const storedUser = localStorage.getItem("hiveUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const isAuthPage = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")
      if (!user && !isAuthPage && pathname !== "/") {
        router.push("/sign-in")
      } else if (user && isAuthPage) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = (userData: Partial<User>) => {
    const newUser: User = {
      id: userData.id || `user-${Date.now()}`,
      username: userData.username || "User",
      email: userData.email || "user@example.com",
      avatar: userData.avatar || `https://avatar.vercel.sh/${userData.username || "user"}.png`,
      bio: userData.bio || "",
      genre: userData.genre || "",
      linkedAccounts: userData.linkedAccounts || {
        youtube: { username: "", linked: false },
        instagram: { username: "", linked: false },
        tiktok: { username: "", linked: false },
      },
    }
    setUser(newUser)
    localStorage.setItem("hiveUser", JSON.stringify(newUser))
    router.push("/dashboard")
  }

  const updateUser = (userData: Partial<User>) => {
    if (!user) return
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem("hiveUser", JSON.stringify(updatedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("hiveUser")
    router.push("/sign-in")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, updateUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
