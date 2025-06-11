"use client"

import { createContext, useContext, type ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"

interface User {
  id?: string
  name?: string
  email?: string
  image?: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (provider?: string) => void
  updateUser: (userData: Partial<User>) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const InnerAuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status !== "loading") {
      const isAuthPage = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")
      if (!session && !isAuthPage && pathname !== "/") {
        router.push("/sign-in")
      } else if (session && isAuthPage) {
        router.push("/dashboard")
      }
    }
  }, [session, status, pathname, router])

  const login = (provider?: string) => {
    signIn(provider, { callbackUrl: "/dashboard" })
  }

  const updateUser = (_userData: Partial<User>) => {
    // profile updates would be handled via API routes
  }

  const logout = () => {
    signOut({ callbackUrl: "/sign-in" })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!session,
        user: session?.user as User ?? null,
        login,
        updateUser,
        logout,
        isLoading: status === "loading",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <InnerAuthProvider>{children}</InnerAuthProvider>
    </SessionProvider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
