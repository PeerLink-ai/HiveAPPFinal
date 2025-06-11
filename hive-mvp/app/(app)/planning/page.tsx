"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PlusCircle,
  Trash2,
  Edit3,
  CalendarIcon,
  Clock,
  Youtube,
  Instagram,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Sparkles,
  Video,
  ImageIcon,
  Camera,
  Film,
  MessageCircle,
  Megaphone,
  Users,
  Flame,
  Zap,
  TrendingUp,
  BookOpen,
  Music,
  Award,
  Heart,
  Star,
  LinkIcon,
  Eye,
  ThumbsUp,
} from "lucide-react"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { format, isSameDay, addDays, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Image from "next/image"

interface PlannedContent {
  id: string
  title: string
  platform: string
  contentType?: string
  scheduledDateTime: Date
  notes?: string
  color?: string
  thumbnail?: string // Added thumbnail property
}

interface ContentTemplate {
  id: string
  name: string
  title: string
  platform: string
  contentType: string
  defaultTime: string
  notes: string
  color: string
  category: string
  icon: any
  estimatedDuration?: string
  bgGradient?: string
  thumbnailQuery?: string // Added thumbnailQuery for templates
}

// Content type icons mapping
const contentTypeIcons: { [key: string]: any } = {
  tutorial: BookOpen,
  review: Star,
  vlog: Film,
  qa: MessageCircle,
  post: ImageIcon,
  story: Camera,
  reel: Video,
  carousel: Image,
  trend: Flame,
  educational: BookOpen,
  comedy: Heart,
  announcement: Megaphone,
  collaboration: Users,
  live: Zap,
  shorts: Video,
  podcast: Music,
  highlight: Award,
  trending: TrendingUp,
}

const contentTemplates: ContentTemplate[] = [
  // YouTube Templates
  {
    id: "yt-tutorial",
    name: "Tutorial Video",
    title: "How to: [Topic]",
    platform: "YouTube",
    contentType: "tutorial",
    defaultTime: "14:00",
    notes: "Remember to prepare step-by-step outline and screen recording setup.",
    category: "YouTube",
    icon: BookOpen,
    estimatedDuration: "2-3 hours",
    bgGradient: "from-red-500/20 to-red-600/20",
    thumbnailQuery: "youtube tutorial video",
  },
  {
    id: "yt-review",
    name: "Product Review",
    title: "[Product] Review - Is it worth it?",
    platform: "YouTube",
    contentType: "review",
    defaultTime: "16:00",
    notes: "Test product thoroughly, prepare pros/cons list, include affiliate links in description.",
    category: "YouTube",
    icon: Star,
    estimatedDuration: "3-4 hours",
    bgGradient: "from-red-500/20 to-red-600/20",
    thumbnailQuery: "youtube product review",
  },
  {
    id: "yt-vlog",
    name: "Daily Vlog",
    title: "Day in my life - [Date/Event]",
    platform: "YouTube",
    contentType: "vlog",
    defaultTime: "18:00",
    notes: "Film throughout the day, prepare engaging intro/outro, add background music.",
    category: "YouTube",
    icon: Film,
    estimatedDuration: "4-5 hours",
    bgGradient: "from-red-500/20 to-red-600/20",
    thumbnailQuery: "youtube daily vlog",
  },
  {
    id: "yt-qa",
    name: "Q&A Session",
    title: "Answering your questions! Q&A #[Number]",
    platform: "YouTube",
    contentType: "qa",
    defaultTime: "15:00",
    notes: "Collect questions from comments/social media, prepare engaging answers.",
    category: "YouTube",
    icon: MessageCircle,
    estimatedDuration: "2 hours",
    bgGradient: "from-red-500/20 to-red-600/20",
    thumbnailQuery: "youtube q&a session",
  },

  // Instagram Templates
  {
    id: "ig-post",
    name: "Feed Post",
    title: "[Caption/Topic]",
    platform: "Instagram",
    contentType: "post",
    defaultTime: "12:00",
    notes: "High-quality photo/video, engaging caption with hashtags, post during peak hours.",
    category: "Instagram",
    icon: ImageIcon,
    estimatedDuration: "1 hour",
    bgGradient: "from-pink-500/20 to-purple-600/20",
    thumbnailQuery: "instagram feed post",
  },
  {
    id: "ig-story",
    name: "Story Series",
    title: "Behind the scenes - [Topic]",
    platform: "Instagram",
    contentType: "story",
    defaultTime: "10:00",
    notes: "Multiple story slides, use polls/questions for engagement, save highlights.",
    category: "Instagram",
    icon: Camera,
    estimatedDuration: "30 minutes",
    bgGradient: "from-pink-500/20 to-purple-600/20",
    thumbnailQuery: "instagram story series",
  },
  {
    id: "ig-reel",
    name: "Instagram Reel",
    title: "[Trending Topic/Challenge]",
    platform: "Instagram",
    contentType: "reel",
    defaultTime: "17:00",
    notes: "Use trending audio, quick cuts, engaging hook in first 3 seconds.",
    category: "Instagram",
    icon: Video,
    estimatedDuration: "1-2 hours",
    bgGradient: "from-pink-500/20 to-purple-600/20",
    thumbnailQuery: "instagram reel",
  },
  {
    id: "ig-carousel",
    name: "Carousel Post",
    title: "[Educational/Tips] - Swipe for more",
    platform: "Instagram",
    contentType: "carousel",
    defaultTime: "13:00",
    notes: "Design 5-10 slides, educational content, clear call-to-action on last slide.",
    category: "Instagram",
    icon: ImageIcon,
    estimatedDuration: "2 hours",
    bgGradient: "from-pink-500/20 to-purple-600/20",
    thumbnailQuery: "instagram carousel post",
  },

  // TikTok Templates
  {
    id: "tt-trend",
    name: "Trending Challenge",
    title: "[Trending Hashtag/Challenge]",
    platform: "TikTok",
    contentType: "trend",
    defaultTime: "19:00",
    notes: "Use trending sounds, quick hook, participate in current challenges.",
    category: "TikTok",
    icon: Flame,
    estimatedDuration: "1 hour",
    bgGradient: "from-blue-500/20 to-cyan-400/20",
    thumbnailQuery: "tiktok trending challenge",
  },
  {
    id: "tt-educational",
    name: "Educational Content",
    title: "Did you know? [Fact/Tip]",
    platform: "TikTok",
    contentType: "educational",
    defaultTime: "20:00",
    notes: "Quick facts, engaging visuals, clear and concise information.",
    category: "TikTok",
    icon: BookOpen,
    estimatedDuration: "1-2 hours",
    bgGradient: "from-blue-500/20 to-cyan-400/20",
    thumbnailQuery: "tiktok educational content",
  },
  {
    id: "tt-comedy",
    name: "Comedy Skit",
    title: "[Funny situation/reaction]",
    platform: "TikTok",
    contentType: "comedy",
    defaultTime: "21:00",
    notes: "Relatable humor, good timing, expressive reactions.",
    category: "TikTok",
    icon: Heart,
    estimatedDuration: "2 hours",
    bgGradient: "from-blue-500/20 to-cyan-400/20",
    thumbnailQuery: "tiktok comedy skit",
  },

  // Cross-platform Templates
  {
    id: "announcement",
    name: "Announcement",
    title: "Big news! [Announcement]",
    platform: "YouTube", // Default platform for general templates
    contentType: "announcement",
    defaultTime: "11:00",
    notes: "Important updates, new projects, collaborations, or milestones.",
    category: "General",
    icon: Megaphone,
    estimatedDuration: "1 hour",
    bgGradient: "from-primary/20 to-primary/30",
    thumbnailQuery: "general announcement",
  },
  {
    id: "collaboration",
    name: "Collaboration",
    title: "Collab with [Creator Name]",
    platform: "YouTube", // Default platform for general templates
    contentType: "collaboration",
    defaultTime: "15:00",
    notes: "Coordinate schedules, prepare talking points, cross-promote content.",
    category: "General",
    icon: Users,
    estimatedDuration: "3-4 hours",
    bgGradient: "from-primary/20 to-primary/30",
    thumbnailQuery: "content collaboration",
  },
]

const platformColors: { [key: string]: string } = {
  YouTube: "bg-red-500",
  Instagram: "bg-pink-500",
  TikTok: "bg-blue-500",
  Default: "bg-primary",
}

const platformGradients: { [key: string]: string } = {
  YouTube: "from-red-500 to-red-600",
  Instagram: "from-pink-500 to-purple-600",
  TikTok: "from-blue-500 to-cyan-400",
  Default: "from-primary to-primary-light",
}

const platformLogos: { [key: string]: string } = {
  YouTube: "/placeholder.svg?width=24&height=24",
  Instagram: "/placeholder.svg?width=24&height=24",
  TikTok: "/placeholder.svg?width=24&height=24",
}

const initialPlannedContent: PlannedContent[] = [
  {
    id: "plan1",
    title: "Weekly Q&A Live Stream",
    platform: "YouTube",
    contentType: "qa",
    scheduledDateTime: addDays(new Date(), 2),
    notes: "Prepare questions from comments.",
    color: platformColors["YouTube"],
    thumbnail: "/placeholder.svg?width=120&height=68",
  },
  {
    id: "plan2",
    title: "New Product Review Post",
    platform: "Instagram",
    contentType: "post",
    scheduledDateTime: addDays(new Date(), 4),
    notes: "Coordinate with brand for assets.",
    color: platformColors["Instagram"],
    thumbnail: "/placeholder.svg?width=120&height=68",
  },
  {
    id: "plan3",
    title: "Tutorial: TikTok Editing Tricks",
    platform: "TikTok",
    contentType: "tutorial",
    scheduledDateTime: addDays(new Date(), 6),
    color: platformColors["TikTok"],
    thumbnail: "/placeholder.svg?width=120&height=68",
  },
  {
    id: "plan4",
    title: "Another YouTube Video",
    platform: "YouTube",
    contentType: "vlog",
    scheduledDateTime: addDays(new Date(), 6),
    notes: "Morning slot test.",
    color: platformColors["YouTube"],
    thumbnail: "/placeholder.svg?width=120&height=68",
  },
]

// Mock performance prediction data
const mockPerformancePredictions: {
  [platform: string]: {
    [timeRange: string]: { views: string; engagement: string }
  }
} = {
  YouTube: {
    "00:00-08:00": { views: "Low (5-10K)", engagement: "Low (1-2%)" },
    "08:01-12:00": { views: "Moderate (10-25K)", engagement: "Moderate (2-3%)" },
    "12:01-17:00": { views: "High (25-50K+)", engagement: "High (3-5%)" },
    "17:01-23:59": { views: "Very High (50-100K+)", engagement: "Very High (5-8%)" },
  },
  Instagram: {
    "00:00-08:00": { views: "Low (2-5K)", engagement: "Low (0.5-1%)" },
    "08:01-12:00": { views: "Moderate (5-15K)", engagement: "Moderate (1-2%)" },
    "12:01-17:00": { views: "Very High (15-30K+)", engagement: "Very High (2-4%)" },
    "17:01-23:59": { views: "High (10-20K+)", engagement: "High (1.5-3%)" },
  },
  TikTok: {
    "00:00-08:00": { views: "Low (10-50K)", engagement: "Low (0.8-1.5%)" },
    "08:01-12:00": { views: "Moderate (50-150K)", engagement: "Moderate (1.5-2.5%)" },
    "12:01-17:00": { views: "High (150-300K+)", engagement: "High (2.5-4%)" },
    "17:01-23:59": { views: "Very High (300-800K+)", engagement: "Very High (4-7%)" },
  },
}

export default function PlanningPage() {
  const { toast } = useToast()
  const [plannedContent, setPlannedContent] = useState<PlannedContent[]>(initialPlannedContent)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<PlannedContent | null>(null)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [draggedItem, setDraggedItem] = useState<PlannedContent | null>(null)
  const [dragOverDate, setDragOverDate] = useState<Date | null>(null)

  const [newContentTitle, setNewContentTitle] = useState("")
  const [newContentPlatform, setNewContentPlatform] = useState("")
  const [newContentType, setNewContentType] = useState("")
  const [newContentTime, setNewContentTime] = useState("12:00")
  const [newContentNotes, setNewContentNotes] = useState("")
  const [newContentDate, setNewContentDate] = useState<Date | undefined>(new Date())
  const [newContentThumbnail, setNewContentThumbnail] = useState("") // New state for thumbnail

  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null)
  const [templateCategory, setTemplateCategory] = useState("All")
  const [templateHovered, setTemplateHovered] = useState<string | null>(null)

  const eventsForSelectedDate = useMemo(() => {
    if (!selectedDate) return []
    return plannedContent
      .filter((item) => isSameDay(item.scheduledDateTime, selectedDate))
      .sort((a, b) => a.scheduledDateTime.getTime() - b.scheduledDateTime.getTime())
  }, [selectedDate, plannedContent])

  const openDialogForNew = (date?: Date, template?: ContentTemplate) => {
    setEditingContent(null)
    setNewContentDate(date || new Date())
    setSelectedDate(date || new Date())

    if (template) {
      setNewContentTitle(template.title)
      setNewContentPlatform(template.platform)
      setNewContentType(template.contentType)
      setNewContentTime(template.defaultTime)
      setNewContentNotes(template.notes)
      setNewContentThumbnail(
        template.thumbnailQuery ? `/placeholder.svg?width=120&height=68&query=${template.thumbnailQuery}` : "",
      )
      setSelectedTemplate(template)
    } else {
      setNewContentTitle("")
      setNewContentPlatform("")
      setNewContentType("")
      setNewContentTime("12:00")
      setNewContentNotes("")
      setNewContentThumbnail("")
      setSelectedTemplate(null)
    }

    setIsDialogOpen(true)
  }

  const openDialogForEdit = (item: PlannedContent) => {
    setEditingContent(item)
    setNewContentTitle(item.title)
    setNewContentPlatform(item.platform)
    setNewContentType(item.contentType || "")
    setNewContentTime(format(item.scheduledDateTime, "HH:mm"))
    setNewContentNotes(item.notes || "")
    setNewContentDate(item.scheduledDateTime)
    setNewContentThumbnail(item.thumbnail || "")
    setIsDialogOpen(true)
  }

  const handleTemplateSelect = (template: ContentTemplate) => {
    setSelectedTemplate(template)
    setNewContentTitle(template.title)
    setNewContentPlatform(template.platform)
    setNewContentType(template.contentType)
    setNewContentTime(template.defaultTime)
    setNewContentNotes(template.notes)
    setNewContentThumbnail(
      template.thumbnailQuery ? `/placeholder.svg?width=120&height=68&query=${template.thumbnailQuery}` : "",
    )
    setShowTemplates(false)
  }

  const filteredTemplates = useMemo(() => {
    if (templateCategory === "All") return contentTemplates
    return contentTemplates.filter((template) => template.category === templateCategory)
  }, [templateCategory])

  const templateCategories = ["All", "YouTube", "Instagram", "TikTok", "General"]

  const handleSaveContent = () => {
    if (!newContentTitle || !newContentPlatform || !newContentDate) {
      toast({ title: "Missing fields", description: "Title, platform, and date are required.", variant: "destructive" })
      return
    }

    const [hours, minutes] = newContentTime.split(":").map(Number)
    const scheduledDateTime = new Date(newContentDate)
    scheduledDateTime.setHours(hours, minutes, 0, 0)

    const contentData = {
      title: newContentTitle,
      platform: newContentPlatform,
      contentType: newContentType,
      scheduledDateTime,
      notes: newContentNotes,
      color: platformColors[newContentPlatform] || platformColors.Default,
      thumbnail: newContentThumbnail, // Include thumbnail
    }

    if (editingContent) {
      setPlannedContent((prev) =>
        prev.map((item) => (item.id === editingContent.id ? { ...item, ...contentData } : item)),
      )
      toast({
        title: "Content Updated",
        description: `${contentData.title} has been updated.`,
        action: (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-green-600" />
          </div>
        ),
      })
    } else {
      setPlannedContent((prev) => [...prev, { ...contentData, id: `plan${Date.now()}` }])
      toast({
        title: "Content Scheduled",
        description: `${contentData.title} has been added.`,
        action: (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-green-600" />
          </div>
        ),
      })
    }
    setIsDialogOpen(false)
    setEditingContent(null)
  }

  const handleDeleteContent = (id: string) => {
    setPlannedContent((prev) => prev.filter((item) => item.id !== id))
    toast({ title: "Content Removed" })
  }

  // Drag and Drop handlers
  const handleDragStart = (e: any, item: PlannedContent) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", e.currentTarget.outerHTML)

    // Add visual feedback to the dragged element
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "0.5"
    }
  }

  const handleDragEnd = (e: any) => {
    setDraggedItem(null)
    setDragOverDate(null)

    // Reset visual feedback
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1"
    }
  }

  const handleDragOver = (e: any, date: Date) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverDate(date)
  }

  const handleDragLeave = (e: any) => {
    // Only clear drag over if we're leaving the calendar cell entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverDate(null)
    }
  }

  const handleDrop = (e: any, targetDate: Date) => {
    e.preventDefault()
    setDragOverDate(null)

    if (!draggedItem) return

    // Don't do anything if dropping on the same date
    if (isSameDay(draggedItem.scheduledDateTime, targetDate)) {
      setDraggedItem(null)
      return
    }

    // Update the content with the new date, preserving the time
    const newDateTime = new Date(targetDate)
    newDateTime.setHours(draggedItem.scheduledDateTime.getHours(), draggedItem.scheduledDateTime.getMinutes(), 0, 0)

    setPlannedContent((prev) =>
      prev.map((item) => (item.id === draggedItem.id ? { ...item, scheduledDateTime: newDateTime } : item)),
    )

    toast({
      title: "Content Moved",
      description: `"${draggedItem.title}" has been moved to ${format(targetDate, "MMMM d, yyyy")}`,
      action: (
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <CalendarIcon className="h-4 w-4 text-blue-600" />
        </div>
      ),
    })

    setDraggedItem(null)
  }

  // Generate days for the current month view
  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  // Group events by day for the calendar view
  const eventsByDay = useMemo(() => {
    const grouped: { [key: string]: PlannedContent[] } = {}

    plannedContent.forEach((event) => {
      const dayKey = format(event.scheduledDateTime, "yyyy-MM-dd")
      if (!grouped[dayKey]) {
        grouped[dayKey] = []
      }
      grouped[dayKey].push(event)
    })

    return grouped
  }, [plannedContent])

  // Get content type icon
  const getContentTypeIcon = (contentType: string | undefined) => {
    if (!contentType || !contentTypeIcons[contentType]) {
      return null
    }
    const IconComponent = contentTypeIcons[contentType]
    return <IconComponent className="h-3 w-3" />
  }

  // Get performance prediction based on selected platform and time
  const getPerformancePrediction = useMemo(() => {
    if (!newContentPlatform || !newContentTime) return null

    const [hours] = newContentTime.split(":").map(Number)
    let timeRange: string

    if (hours >= 0 && hours <= 8) {
      timeRange = "00:00-08:00"
    } else if (hours > 8 && hours <= 12) {
      timeRange = "08:01-12:00"
    } else if (hours > 12 && hours <= 17) {
      timeRange = "12:01-17:00"
    } else {
      timeRange = "17:01-23:59"
    }

    return mockPerformancePredictions[newContentPlatform]?.[timeRange] || null
  }, [newContentPlatform, newContentTime])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Planning</h1>
          <p className="text-muted-foreground">
            Schedule and organize your upcoming content across platforms. Drag and drop to reschedule.
          </p>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Quick Templates</span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 rounded-xl overflow-hidden border-0 shadow-xl">
              <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-primary/5">
                <h3 className="font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Quick Templates
                </h3>
                <p className="text-sm text-muted-foreground">Choose a template to get started quickly</p>
              </div>
              <div className="p-2 max-h-64 overflow-y-auto">
                {contentTemplates.slice(0, 6).map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors text-left"
                    onClick={() => openDialogForNew(selectedDate, template)}
                  >
                    <div
                      className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0",
                        "bg-gradient-to-br",
                        template.bgGradient || "from-primary/20 to-primary/30",
                      )}
                    >
                      <template.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{template.name}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs border-0 bg-gradient-to-r",
                            platformGradients[template.platform] || "from-primary to-primary-light",
                            "text-white",
                          )}
                        >
                          {template.platform}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{template.title}</p>
                    </div>
                  </motion.button>
                ))}
                <div className="border-t pt-2 mt-2">
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => openDialogForNew(selectedDate)}>
                    View All Templates
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button onClick={() => openDialogForNew(selectedDate)} className="relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Add Content</span>
              </div>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar View - Takes up 2/3 of the space */}
        <Card className="lg:col-span-2 overflow-hidden border-0 shadow-lg rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3 bg-gradient-to-r from-gray-50 to-white border-b">
            <div>
              <CardTitle>Content Calendar</CardTitle>
              <CardDescription>{format(currentMonth, "MMMM yyyy")}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>
                  Today
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Custom Calendar Grid */}
            <div className="grid grid-cols-7 text-center border-b bg-gray-50/50">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="py-2 font-medium text-sm">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-fr">
              {daysInMonth.map((day, i) => {
                const dayKey = format(day, "yyyy-MM-dd")
                const isToday = isSameDay(day, new Date())
                const isSelected = selectedDate && isSameDay(day, selectedDate)
                const isDragOver = dragOverDate && isSameDay(day, dragOverDate)
                const dayEvents = eventsByDay[dayKey] || []

                return (
                  <div
                    key={dayKey}
                    className={cn(
                      "min-h-[100px] p-1 border-b border-r relative transition-all duration-200",
                      isToday && "bg-blue-50",
                      isSelected && "ring-2 ring-primary ring-inset",
                      isDragOver && "bg-primary/10 ring-2 ring-primary/50 ring-inset",
                      i % 7 === 6 && "border-r-0", // Remove right border on last column
                      i >= daysInMonth.length - 7 && "border-b-0", // Remove bottom border on last row
                    )}
                    onClick={() => setSelectedDate(day)}
                    onDragOver={(e) => handleDragOver(e, day)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, day)}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={cn(
                          "h-6 w-6 rounded-full flex items-center justify-center text-sm",
                          isToday && "bg-primary text-primary-foreground font-medium",
                        )}
                      >
                        {format(day, "d")}
                      </span>
                      {dayEvents.length > 0 && (
                        <Badge variant="outline" className="text-xs bg-muted/50">
                          {dayEvents.length}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 space-y-1 max-h-[80px] overflow-hidden">
                      {dayEvents.slice(0, 3).map((event) => (
                        <motion.div
                          key={event.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, event)}
                          onDragEnd={handleDragEnd}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "group text-xs p-1.5 rounded-lg truncate cursor-move transition-all duration-200",
                            "hover:shadow-md active:shadow-sm",
                            "bg-gradient-to-r",
                            event.platform === "YouTube" ? "from-red-50 to-red-100" : "",
                            event.platform === "Instagram" ? "from-pink-50 to-purple-100" : "",
                            event.platform === "TikTok" ? "from-blue-50 to-cyan-100" : "",
                            "border border-transparent",
                            event.platform === "YouTube" ? "hover:border-red-200" : "",
                            event.platform === "Instagram" ? "hover:border-pink-200" : "",
                            event.platform === "TikTok" ? "hover:border-blue-200" : "",
                          )}
                          onClick={(e) => {
                            e.stopPropagation()
                            openDialogForEdit(event)
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <GripVertical className="h-2.5 w-2.5 opacity-0 group-hover:opacity-50 transition-opacity" />

                            <div className="flex items-center gap-1 flex-shrink-0">
                              <div
                                className={cn(
                                  "h-4 w-4 rounded-full flex items-center justify-center",
                                  "bg-gradient-to-br",
                                  event.platform === "YouTube" ? "from-red-500 to-red-600" : "",
                                  event.platform === "Instagram" ? "from-pink-500 to-purple-600" : "",
                                  event.platform === "TikTok" ? "from-blue-500 to-cyan-400" : "",
                                )}
                              >
                                <Image
                                  src={platformLogos[event.platform] || "/placeholder.svg"}
                                  alt={event.platform}
                                  width={12}
                                  height={12}
                                  className="invert"
                                />
                              </div>

                              {event.contentType && (
                                <div
                                  className={cn(
                                    "h-3.5 w-3.5 rounded-full flex items-center justify-center bg-white",
                                    "border",
                                    event.platform === "YouTube" ? "border-red-200" : "",
                                    event.platform === "Instagram" ? "border-pink-200" : "",
                                    event.platform === "TikTok" ? "border-blue-200" : "",
                                  )}
                                >
                                  {getContentTypeIcon(event.contentType)}
                                </div>
                              )}
                            </div>

                            <span className="flex-1 truncate">
                              <span className="font-medium">{format(event.scheduledDateTime, "HH:mm")}</span>{" "}
                              {event.title}
                            </span>
                          </div>
                          {event.thumbnail && (
                            <Image
                              src={event.thumbnail || "/placeholder.svg"}
                              alt={event.title}
                              width={80}
                              height={45}
                              className="rounded-md mt-1 object-cover w-full h-auto"
                            />
                          )}
                        </motion.div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-muted-foreground pl-1 bg-muted/30 rounded-lg p-1 text-center">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute bottom-1 right-1 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        openDialogForNew(day)
                      }}
                    >
                      <PlusCircle className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </motion.button>

                    {/* Drop zone indicator */}
                    {isDragOver && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 border-2 border-dashed border-primary/50 rounded-lg bg-primary/5 flex items-center justify-center"
                      >
                        <span className="text-xs font-medium text-primary bg-white px-2 py-1 rounded-full shadow-sm">
                          Drop here
                        </span>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Day Detail View - Takes up 1/3 of the space */}
        <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-white border-b">
            <div className="flex items-center justify-between">
              <CardTitle>{selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No Date Selected"}</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="outline" size="icon">
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <CardDescription>
              {eventsForSelectedDate.length > 0
                ? `${eventsForSelectedDate.length} item(s) scheduled`
                : "No content scheduled for this day"}
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[500px] overflow-y-auto space-y-3 pr-2">
            {eventsForSelectedDate.length > 0 ? (
              eventsForSelectedDate.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-4 shadow-sm hover:shadow-md transition-shadow border-0 overflow-hidden">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {item.thumbnail && (
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            width={240}
                            height={135}
                            className="rounded-lg mb-3 object-cover w-full aspect-video"
                          />
                        )}
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={cn(
                              "h-10 w-10 rounded-xl flex items-center justify-center",
                              "bg-gradient-to-br",
                              item.platform === "YouTube" ? "from-red-500 to-red-600" : "",
                              item.platform === "Instagram" ? "from-pink-500 to-purple-600" : "",
                              item.platform === "TikTok" ? "from-blue-500 to-cyan-400" : "",
                              "shadow-sm",
                            )}
                          >
                            <Image
                              src={platformLogos[item.platform] || "/placeholder.svg"}
                              alt={item.platform}
                              width={20}
                              height={20}
                              className="invert"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {format(item.scheduledDateTime, "h:mm a")}
                              </span>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs border-0 bg-gradient-to-r",
                                  platformGradients[item.platform] || "from-primary to-primary-light",
                                  "text-white",
                                )}
                              >
                                {item.platform}
                              </Badge>
                              {item.contentType && (
                                <Badge variant="outline" className="text-xs bg-muted">
                                  <div className="flex items-center gap-1">
                                    {getContentTypeIcon(item.contentType)}
                                    <span>{item.contentType}</span>
                                  </div>
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {item.notes && (
                          <p className="text-sm mt-2 text-muted-foreground bg-muted/30 p-3 rounded-lg">{item.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="icon" onClick={() => openDialogForEdit(item)}>
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteContent(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <div className="h-20 w-20 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                    <CalendarIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                </motion.div>
                <h3 className="text-lg font-medium mb-2">No content scheduled</h3>
                <p className="text-sm text-muted-foreground mb-4">Plan your content by adding new items to this day.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => openDialogForNew(selectedDate)}
                    className="bg-gradient-to-r from-primary to-primary-light"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Content
                  </Button>
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-xl border-0 shadow-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {editingContent ? (
                <>
                  <Edit3 className="h-5 w-5 text-primary" />
                  Edit Content
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 text-primary" />
                  Schedule New Content
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {!editingContent && (
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Quick Templates
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowTemplates(!showTemplates)}>
                  {showTemplates ? "Hide Templates" : "Show Templates"}
                </Button>
              </div>

              {showTemplates && (
                <div className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    {templateCategories.map((category) => (
                      <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant={templateCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTemplateCategory(category)}
                          className={cn(
                            templateCategory === category && category !== "All" ? "bg-gradient-to-r" : "",
                            category === "YouTube" && templateCategory === category ? "from-red-500 to-red-600" : "",
                            category === "Instagram" && templateCategory === category
                              ? "from-pink-500 to-purple-600"
                              : "",
                            category === "TikTok" && templateCategory === category ? "from-blue-500 to-cyan-400" : "",
                            category === "General" && templateCategory === category
                              ? "from-primary to-primary-light"
                              : "",
                          )}
                        >
                          {category === "YouTube" && <Youtube className="mr-1.5 h-3.5 w-3.5" />}
                          {category === "Instagram" && <Instagram className="mr-1.5 h-3.5 w-3.5" />}
                          {category === "TikTok" && <Smartphone className="mr-1.5 h-3.5 w-3.5" />}
                          {category === "General" && <Sparkles className="mr-1.5 h-3.5 w-3.5" />}
                          {category === "All" && <Star className="mr-1.5 h-3.5 w-3.5" />}
                          {category}
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid gap-2 max-h-48 overflow-y-auto">
                    {filteredTemplates.map((template) => (
                      <motion.div
                        key={template.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setTemplateHovered(template.id)}
                        onMouseLeave={() => setTemplateHovered(null)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                          selectedTemplate?.id === template.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "hover:border-gray-300 hover:shadow-sm",
                        )}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <div
                          className={cn(
                            "h-10 w-10 rounded-xl flex items-center justify-center",
                            "bg-gradient-to-br",
                            template.bgGradient || "from-primary/20 to-primary/30",
                            templateHovered === template.id || selectedTemplate?.id === template.id ? "scale-110" : "",
                            "transition-transform duration-200",
                          )}
                        >
                          <template.icon className="h-5 w-5 text-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{template.name}</h4>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs border-0 bg-gradient-to-r",
                                platformGradients[template.platform] || "from-primary to-primary-light",
                                "text-white",
                              )}
                            >
                              {template.platform}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{template.title}</p>
                          {template.estimatedDuration && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Est. {template.estimatedDuration}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content-title">Content Title</Label>
              <Input
                id="content-title"
                placeholder="Enter content title"
                value={newContentTitle}
                onChange={(e) => setNewContentTitle(e.target.value)}
                className="rounded-lg"
              />
              {selectedTemplate && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Template: {selectedTemplate.name} - Feel free to customize the title
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content-thumbnail">Thumbnail URL</Label>
              <Input
                id="content-thumbnail"
                placeholder="https://example.com/thumbnail.jpg or /placeholder.svg?query=..."
                value={newContentThumbnail}
                onChange={(e) => setNewContentThumbnail(e.target.value)}
                className="rounded-lg"
              />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <LinkIcon className="h-3 w-3" />
                Provide a direct URL for your content thumbnail.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="content-platform">Platform</Label>
                <Select value={newContentPlatform} onValueChange={setNewContentPlatform}>
                  <SelectTrigger id="content-platform" className="rounded-lg">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YouTube" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?width=16&height=16"
                            alt="YouTube"
                            width={16}
                            height={16}
                            className="invert"
                          />
                        </div>
                        YouTube
                      </div>
                    </SelectItem>
                    <SelectItem value="Instagram">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?width=16&height=16"
                            alt="Instagram"
                            width={16}
                            height={16}
                            className="invert"
                          />
                        </div>
                        Instagram
                      </div>
                    </SelectItem>
                    <SelectItem value="TikTok">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                          <Image
                            src="/placeholder.svg?width=16&height=16"
                            alt="TikTok"
                            width={16}
                            height={16}
                            className="invert"
                          />
                        </div>
                        TikTok
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select value={newContentType} onValueChange={setNewContentType}>
                  <SelectTrigger id="content-type" className="rounded-lg">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutorial">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Tutorial
                      </div>
                    </SelectItem>
                    <SelectItem value="review">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Review
                      </div>
                    </SelectItem>
                    <SelectItem value="vlog">
                      <div className="flex items-center gap-2">
                        <Film className="h-4 w-4" />
                        Vlog
                      </div>
                    </SelectItem>
                    <SelectItem value="qa">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Q&A
                      </div>
                    </SelectItem>
                    <SelectItem value="post">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        Post
                      </div>
                    </SelectItem>
                    <SelectItem value="story">
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Story
                      </div>
                    </SelectItem>
                    <SelectItem value="reel">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Reel
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="content-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="content-date"
                      variant="outline"
                      className="w-full justify-start text-left font-normal rounded-lg"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newContentDate ? format(newContentDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={newContentDate} onSelect={setNewContentDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content-time">Time</Label>
                <Input
                  id="content-time"
                  type="time"
                  value={newContentTime}
                  onChange={(e) => setNewContentTime(e.target.value)}
                  className="rounded-lg"
                />
                {selectedTemplate && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Suggested time: {selectedTemplate.defaultTime}
                  </p>
                )}
              </div>
            </div>

            {getPerformancePrediction && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-purple-50 border border-purple-200 rounded-xl p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Predicted Performance</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-purple-800">Views: {getPerformancePrediction.views}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-purple-800">Engagement: {getPerformancePrediction.engagement}</span>
                  </div>
                </div>
                <p className="text-xs text-purple-700 mt-2">
                  These are estimated predictions based on historical data for {newContentPlatform}.
                </p>
              </motion.div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="content-notes">Notes</Label>
              <Textarea
                id="content-notes"
                placeholder="Add any notes or reminders"
                value={newContentNotes}
                onChange={(e) => setNewContentNotes(e.target.value)}
                rows={4}
                className="rounded-lg"
              />
              {selectedTemplate && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary" />
                  Template suggestions included - customize as needed
                </p>
              )}
            </div>

            {selectedTemplate?.estimatedDuration && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Estimated Duration</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">
                  This type of content typically takes {selectedTemplate.estimatedDuration} to create
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-lg">
                Cancel
              </Button>
            </DialogClose>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleSaveContent} className="rounded-lg bg-gradient-to-r from-primary to-primary-light">
                {editingContent ? "Save Changes" : "Schedule Content"}
              </Button>
            </motion.div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
