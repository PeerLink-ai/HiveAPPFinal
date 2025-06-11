"use client"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/dashboard")
      } else {
        router.replace("/sign-in")
      }
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <Image
          src="/placeholder.svg?width=80&height=80"
          alt="Hive Logo"
          width={80}
          height={80}
          className="animate-pulse"
        />
        <p className="mt-4 text-lg text-muted-foreground">Loading Hive...</p>
      </div>
    </div>
  )
}
