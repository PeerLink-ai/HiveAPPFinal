"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Youtube, Instagram, Smartphone, Link2, CheckCircle2, AlertCircle, UploadCloud } from "lucide-react"
import { useState, type FormEvent, useCallback } from "react" // Import useCallback
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils" // Import cn for conditional class names

const contentGenres = [
  "Gaming",
  "Education",
  "Comedy",
  "Beauty",
  "Tech",
  "Travel",
  "Music",
  "Lifestyle",
  "Food",
  "DIY/Crafts",
]

interface SocialLink {
  platform: string
  icon: React.ElementType
  linked: boolean
  username?: string
  followers?: string
  color: string
}

export default function ProfileSetupPage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [bio, setBio] = useState(user?.bio || "")
  const [genre, setGenre] = useState(user?.genre || "")
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || `https://avatar.vercel.sh/${user?.username || "user"}.png`)
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false) // New state for drag and drop

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    {
      platform: "YouTube",
      icon: Youtube,
      linked: user?.linkedAccounts?.youtube?.linked || false,
      username: user?.linkedAccounts?.youtube?.username || "",
      followers: "125K",
      color: "bg-red-500",
    },
    {
      platform: "Instagram",
      icon: Instagram,
      linked: user?.linkedAccounts?.instagram?.linked || false,
      username: user?.linkedAccounts?.instagram?.username || "",
      followers: "45.2K",
      color: "bg-pink-500",
    },
    {
      platform: "TikTok",
      icon: Smartphone,
      linked: user?.linkedAccounts?.tiktok?.linked || false,
      username: user?.linkedAccounts?.tiktok?.username || "",
      followers: "78.6K",
      color: "bg-black",
    },
  ])

  const handleLinkSocial = async (platformName: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    setSocialLinks((prev) =>
      prev.map((link) => (link.platform === platformName ? { ...link, linked: !link.linked } : link)),
    )

    // Update user context
    const updatedLinkedAccounts = {
      youtube: {
        username: socialLinks.find((s) => s.platform === "YouTube")?.username || "",
        linked:
          platformName === "YouTube"
            ? !socialLinks.find((s) => s.platform === "YouTube")?.linked
            : socialLinks.find((s) => s.platform === "YouTube")?.linked || false,
      },
      instagram: {
        username: socialLinks.find((s) => s.platform === "Instagram")?.username || "",
        linked:
          platformName === "Instagram"
            ? !socialLinks.find((s) => s.platform === "Instagram")?.linked
            : socialLinks.find((s) => s.platform === "Instagram")?.linked || false,
      },
      tiktok: {
        username: socialLinks.find((s) => s.platform === "TikTok")?.username || "",
        linked:
          platformName === "TikTok"
            ? !socialLinks.find((s) => s.platform === "TikTok")?.linked
            : socialLinks.find((s) => s.platform === "TikTok")?.linked || false,
      },
    }

    updateUser({ linkedAccounts: updatedLinkedAccounts })

    toast({
      title: `${platformName} ${socialLinks.find((s) => s.platform === platformName)?.linked ? "Unlinked" : "Linked"}`,
      description: `Your ${platformName} account has been ${socialLinks.find((s) => s.platform === platformName)?.linked ? "unlinked" : "linked"} successfully.`,
    })

    setIsLoading(false)
  }

  const handleUsernameChange = (platformName: string, newUsername: string) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.platform === platformName ? { ...link, username: newUsername } : link)),
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Update user context with profile info
    updateUser({
      bio,
      genre,
      avatar: avatarUrl,
      linkedAccounts: {
        youtube: {
          username: socialLinks.find((s) => s.platform === "YouTube")?.username || "",
          linked: socialLinks.find((s) => s.platform === "YouTube")?.linked || false,
        },
        instagram: {
          username: socialLinks.find((s) => s.platform === "Instagram")?.username || "",
          linked: socialLinks.find((s) => s.platform === "Instagram")?.linked || false,
        },
        tiktok: {
          username: socialLinks.find((s) => s.platform === "TikTok")?.username || "",
          linked: socialLinks.find((s) => s.platform === "TikTok")?.linked || false,
        },
      },
    })

    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })

    setIsLoading(false)
  }

  // Drag and Drop Handlers
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files && files.length > 0) {
        const file = files[0]
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setAvatarUrl(reader.result as string)
            toast({
              title: "Image Uploaded",
              description: "Profile picture preview updated.",
            })
          }
          reader.readAsDataURL(file)
        } else {
          toast({
            title: "Invalid File Type",
            description: "Please drop an image file.",
            variant: "destructive",
          })
        }
      }
    },
    [toast],
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        const file = files[0]
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setAvatarUrl(reader.result as string)
            toast({
              title: "Image Uploaded",
              description: "Profile picture preview updated.",
            })
          }
          reader.readAsDataURL(file)
        } else {
          toast({
            title: "Invalid File Type",
            description: "Please select an image file.",
            variant: "destructive",
          })
        }
      }
    },
    [toast],
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and connected platforms.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile details and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Image
                      src={avatarUrl || "/placeholder.svg?width=80&height=80&query=User+Avatar"}
                      alt="User Avatar"
                      width={80}
                      height={80}
                      className="rounded-full border"
                    />
                    <div className="flex-1 w-full space-y-2">
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={cn(
                          "flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                          isDragging
                            ? "border-primary bg-primary/5"
                            : "border-gray-300 bg-gray-50 hover:border-gray-400",
                        )}
                      >
                        <UploadCloud
                          className={cn("h-8 w-8 mb-2", isDragging ? "text-primary" : "text-muted-foreground")}
                        />
                        <p className={cn("text-sm font-medium", isDragging ? "text-primary" : "text-muted-foreground")}>
                          {isDragging ? "Drop image here" : "Drag & drop image or click to upload"}
                        </p>
                        <Input
                          id="avatar-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileChange}
                          disabled={isLoading}
                        />
                        <Label
                          htmlFor="avatar-upload"
                          className="mt-2 text-xs text-primary hover:underline cursor-pointer"
                        >
                          Browse files
                        </Label>
                      </div>
                      <p className="text-xs text-muted-foreground text-center sm:text-left">
                        Or enter a URL for your profile picture:
                      </p>
                      <Input
                        id="avatar-url"
                        placeholder="https://example.com/avatar.png"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="rounded-lg"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us a little bit about your content and channel."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be displayed on your profile and in shared content.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre">Primary Content Genre</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger id="genre">
                      <SelectValue placeholder="Select your primary content genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentGenres.map((g) => (
                        <SelectItem key={g} value={g.toLowerCase()}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    This helps us provide more relevant insights and recommendations.
                  </p>
                </div>

                <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts">
          <Card>
            <CardHeader>
              <CardTitle>Connected Platforms</CardTitle>
              <CardDescription>Link your social media accounts to analyze your content performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {socialLinks.map((social) => (
                  <div key={social.platform} className="border rounded-lg overflow-hidden">
                    <div className={`${social.color} h-1 w-full`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`${social.color} bg-opacity-10 p-2 rounded-lg`}>
                            <social.icon className={`h-6 w-6 ${social.color.replace("bg-", "text-")}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{social.platform}</h3>
                            {social.linked && social.followers && (
                              <p className="text-xs text-muted-foreground">{social.followers} followers</p>
                            )}
                          </div>
                          {social.linked && (
                            <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                              <CheckCircle2 className="mr-1 h-3 w-3" /> Connected
                            </Badge>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant={social.linked ? "outline" : "default"}
                          onClick={() => handleLinkSocial(social.platform)}
                          disabled={isLoading}
                        >
                          {social.linked ? (
                            <>Disconnect</>
                          ) : (
                            <>
                              <Link2 className="mr-2 h-4 w-4" />
                              Connect Account
                            </>
                          )}
                        </Button>
                      </div>

                      {social.linked ? (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`${social.platform}-username`}>
                              {social.platform} {social.platform === "YouTube" ? "Channel ID" : "Username"}
                            </Label>
                            <Input
                              id={`${social.platform}-username`}
                              placeholder={`Your ${social.platform} ${social.platform === "YouTube" ? "channel ID" : "username"}`}
                              value={social.username}
                              onChange={(e) => handleUsernameChange(social.platform, e.target.value)}
                            />
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start">
                            <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-blue-700">
                              <p className="font-medium">Note: This is a demo</p>
                              <p className="mt-1">
                                In a production environment, you would be redirected to authenticate with{" "}
                                {social.platform}.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-4 text-sm text-muted-foreground">
                          Connect your {social.platform} account to import analytics and track performance.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
