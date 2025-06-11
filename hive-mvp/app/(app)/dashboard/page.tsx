"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowUpRight,
  Users,
  Eye,
  MessageSquare,
  Share2,
  ThumbsUp,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth"
import Image from "next/image"
import { motion } from "framer-motion" // Import motion

const performanceData = [
  { metric: "Total Views", value: "1.2M", change: "+15.2%", icon: Eye, color: "text-blue-500" },
  { metric: "Total Likes", value: "85K", change: "+12.1%", icon: ThumbsUp, color: "text-pink-500" },
  { metric: "Total Comments", value: "12K", change: "+8.5%", icon: MessageSquare, color: "text-green-500" },
  { metric: "Total Shares", value: "5.5K", change: "+10.3%", icon: Share2, color: "text-purple-500" },
  { metric: "Engagement Rate", value: "4.7%", change: "+0.5%", icon: TrendingUp, color: "text-orange-500" },
  { metric: "Followers Growth", value: "+1.2K", change: "Last 30 days", icon: Users, color: "text-teal-500" },
]

const recentContent = [
  {
    id: "1",
    title: "My Epic Travel Vlog - Bali",
    platform: "YouTube",
    thumbnail: "/placeholder.svg?width=120&height=68",
    views: "102K",
    likes: "8.1K",
    comments: "1.2K",
    date: "2024-06-01",
  },
  {
    id: "2",
    title: "New Product Unboxing!",
    platform: "Instagram",
    thumbnail: "/placeholder.svg?width=120&height=68",
    views: "55K",
    likes: "4.5K",
    comments: "500",
    date: "2024-06-03",
  },
  {
    id: "3",
    title: "Viral Dance Challenge #HiveDance",
    platform: "TikTok",
    thumbnail: "/placeholder.svg?width=120&height=68",
    views: "1.5M",
    likes: "250K",
    comments: "3.2K",
    date: "2024-06-05",
  },
]

const trendChartData = [
  { date: "Jan", views: 65000, engagement: 2.1 },
  { date: "Feb", views: 72000, engagement: 2.5 },
  { date: "Mar", views: 88000, engagement: 3.1 },
  { date: "Apr", views: 75000, engagement: 2.8 },
  { date: "May", views: 92000, engagement: 3.5 },
  { date: "Jun", views: 110000, engagement: 4.2 },
]

const chartConfig = {
  views: { label: "Views", color: "hsl(var(--primary))" },
  engagement: { label: "Engagement Rate (%)", color: "hsl(210, 100%, 50%)" },
}

const platformData = {
  youtube: { views: "850K", engagement: "3.8%", growth: "+12.5%" },
  instagram: { views: "320K", engagement: "5.2%", growth: "+8.7%" },
  tiktok: { views: "1.2M", engagement: "6.1%", growth: "+22.3%" },
}

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username || "Creator"}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your content today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/insights">
              View All Insights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/planning">
              Plan New Content
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* AI Insights Teaser Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="card-hover bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold text-primary-foreground/80">
              <Sparkles className="inline-block h-5 w-5 mr-2 text-primary" />
              Unlock AI-Powered Insights
            </CardTitle>
            <Button asChild size="sm" className="bg-primary text-white hover:bg-primary/90">
              <Link href="/ai-studio">
                Explore AI Studio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-muted-foreground">
              Get deeper content analysis, trend predictions, and audience sentiment with our upcoming AI features.
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>

      {/* Platform Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white">
          <TabsTrigger value="all">All Platforms</TabsTrigger>
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Performance Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {performanceData.map((item) => (
              <Card key={item.metric} className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.metric}</CardTitle>
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-xs text-muted-foreground">{item.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts and Recent Content */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Views and engagement over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <RechartsTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="views"
                        stroke="var(--color-views)"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="engagement"
                        stroke="var(--color-engagement)"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Content</CardTitle>
                  <CardDescription>Your latest posts across platforms</CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/insights">
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentContent.map((content) => (
                    <div
                      key={content.id}
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Image
                        src={content.thumbnail || "/placeholder.svg"}
                        alt={content.title}
                        width={120}
                        height={68}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{content.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{content.platform}</span>
                          <span className="text-xs text-muted-foreground">{content.date}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs flex items-center">
                            <Eye className="h-3 w-3 mr-1" /> {content.views}
                          </span>
                          <span className="text-xs flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" /> {content.likes}
                          </span>
                          <span className="text-xs flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" /> {content.comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Platform-specific tabs */}
        {["youtube", "instagram", "tiktok"].map((platform) => (
          <TabsContent key={platform} value={platform} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{platformData[platform as keyof typeof platformData].views}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {platformData[platform as keyof typeof platformData].engagement}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{platformData[platform as keyof typeof platformData].growth}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Platform-Specific Insights</CardTitle>
                <CardDescription>
                  Connect your {platform.charAt(0).toUpperCase() + platform.slice(1)} account to see detailed analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Button asChild>
                  <Link href="/profile-setup">
                    Connect {platform.charAt(0).toUpperCase() + platform.slice(1)} Account
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
