"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUpPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!agreedToTerms) return

    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real app, you'd create the user here
    login({ email, username }) // Mock login after sign up
    router.push("/profile-setup") // Redirect to profile setup after sign up
  }

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock social signup
    login({
      email: `user@${provider.toLowerCase()}.com`,
      username: `${provider}User${Math.floor(Math.random() * 1000)}`,
    })
    router.push("/profile-setup")
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8 flex flex-col items-center">
        <Image src="/placeholder.svg?width=60&height=60" alt="Hive Logo" width={60} height={60} />
        <h1 className="mt-3 text-2xl font-bold">Create your account</h1>
        <p className="text-sm text-muted-foreground">Start your journey with Hive</p>
      </div>

      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90 text-white"
              disabled={isLoading || !agreedToTerms}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={() => handleSocialSignup("Google")}
              disabled={isLoading}
            >
              <Image src="/placeholder.svg?width=20&height=20" alt="Google" width={20} height={20} className="mr-2" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11"
              onClick={() => handleSocialSignup("Facebook")}
              disabled={isLoading}
            >
              <Image src="/placeholder.svg?width=20&height=20" alt="Facebook" width={20} height={20} className="mr-2" />
              Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-6 flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
