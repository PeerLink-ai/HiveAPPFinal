"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, ImagePlus, Feather, Upload, Wand2, Video, BookOpen, Megaphone, MessageCircle } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"

export default function ContentCreationPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState("thumbnail") // Default to thumbnail

  const [thumbnailText, setThumbnailText] = useState("")
  const [thumbnailImage, setThumbnailImage] = useState("")
  const [contentTopic, setContentTopic] = useState("")
  const [contentType, setContentType] = useState("")
  const [isLoadingThumbnail, setIsLoadingThumbnail] = useState(false)
  const [isLoadingContent, setIsLoadingContent] = useState(false)

  useEffect(() => {
    const section = searchParams.get("section")
    if (section === "content") {
      setActiveSection("content")
    } else {
      setActiveSection("thumbnail") // Default or if invalid section
    }
  }, [searchParams])

  const handleGenerateThumbnail = async () => {
    setIsLoadingThumbnail(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast({
      title: "Thumbnail Generated!",
      description: "Your thumbnail is ready for review.",
      action: (
        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-green-600" />
        </div>
      ),
    })
    setIsLoadingThumbnail(false)
    // In a real app, you'd get a generated image URL here
    setThumbnailImage(
      `/placeholder.svg?width=480&height=270&query=${encodeURIComponent(thumbnailText || "generated thumbnail")}`,
    )
  }

  const handleGenerateContent = async () => {
    setIsLoadingContent(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast({
      title: "Content Generated!",
      description: "Your content draft is ready.",
      action: (
        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-green-600" />
        </div>
      ),
    })
    setIsLoadingContent(false)
    // In a real app, you'd get generated text here
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Creation Hub</h1>
        <p className="text-muted-foreground">
          Generate ideas, create stunning thumbnails, and draft content with ease.
        </p>
      </div>

      {activeSection === "thumbnail" && (
        <motion.div
          key="thumbnail-creator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-white border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary shadow-sm">
                  <ImagePlus className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Design Your Thumbnail</CardTitle>
                  <CardDescription>
                    Craft eye-catching visuals to boost your content's click-through rate.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="thumbnail-text">Overlay Text</Label>
                <Input
                  id="thumbnail-text"
                  placeholder="Enter text for your thumbnail (e.g., 'New Video!')"
                  value={thumbnailText}
                  onChange={(e) => setThumbnailText(e.target.value)}
                  className="rounded-lg"
                  disabled={isLoadingThumbnail}
                />
                <p className="text-xs text-muted-foreground">
                  This text will be used to generate a placeholder thumbnail.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="base-image">Base Image (Optional)</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="base-image"
                    type="file"
                    className="rounded-lg file:text-primary file:font-medium"
                    disabled={isLoadingThumbnail}
                  />
                  <Button variant="outline" disabled={isLoadingThumbnail}>
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload a base image, or leave blank for a generated background.
                </p>
              </div>

              {thumbnailImage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <Label>Generated Thumbnail Preview</Label>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-muted">
                    <Image
                      src={thumbnailImage || "/placeholder.svg"}
                      alt="Generated Thumbnail"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-xl font-bold p-4 text-center">
                      {thumbnailText || "Generated Thumbnail"}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This is a preview. Actual generation will be more advanced.
                  </p>
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleGenerateThumbnail}
                  className="w-full rounded-lg bg-gradient-to-r from-primary to-primary-light"
                  disabled={isLoadingThumbnail}
                >
                  {isLoadingThumbnail ? (
                    <>
                      <Wand2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Generate Thumbnail
                    </>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeSection === "content" && (
        <motion.div
          key="content-generator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-white border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary shadow-sm">
                  <Feather className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Draft Your Content</CardTitle>
                  <CardDescription>Get outlines, scripts, or post ideas generated for your next piece.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content-type-select">Content Type</Label>
                <Select value={contentType} onValueChange={setContentType} disabled={isLoadingContent}>
                  <SelectTrigger id="content-type-select" className="rounded-lg">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video-script">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4" /> Video Script
                      </div>
                    </SelectItem>
                    <SelectItem value="blog-outline">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" /> Blog Post Outline
                      </div>
                    </SelectItem>
                    <SelectItem value="social-post">
                      <div className="flex items-center gap-2">
                        <Megaphone className="h-4 w-4" /> Social Media Post
                      </div>
                    </SelectItem>
                    <SelectItem value="qa-script">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" /> Q&A Script
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-topic">Topic / Keywords</Label>
                <Textarea
                  id="content-topic"
                  placeholder="Describe your content topic (e.g., '5 tips for productivity', 'review of new smartphone')"
                  value={contentTopic}
                  onChange={(e) => setContentTopic(e.target.value)}
                  rows={4}
                  className="rounded-lg"
                  disabled={isLoadingContent}
                />
                <p className="text-xs text-muted-foreground">Provide details to help generate relevant content.</p>
              </div>

              <div className="space-y-2">
                <Label>Generated Content Preview</Label>
                <div className="min-h-[120px] w-full rounded-lg border border-muted bg-muted/30 p-4 text-sm text-muted-foreground flex items-center justify-center text-center">
                  {isLoadingContent ? (
                    <span className="animate-pulse">Generating content...</span>
                  ) : (
                    "Your generated content will appear here."
                  )}
                </div>
                <p className="text-xs text-muted-foreground">This section will display the generated content draft.</p>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleGenerateContent}
                  className="w-full rounded-lg bg-gradient-to-r from-primary to-primary-light"
                  disabled={isLoadingContent || !contentType || !contentTopic}
                >
                  {isLoadingContent ? (
                    <>
                      <Wand2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Generate Content
                    </>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
