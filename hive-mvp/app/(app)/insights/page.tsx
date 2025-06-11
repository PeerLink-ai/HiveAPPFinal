"use client"

import { TabsTrigger } from "@/components/ui/tabs"

import { TabsList } from "@/components/ui/tabs"

import { Tabs } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Clock,
  Filter,
  Download,
  ArrowUpRight,
  Calendar,
  Search,
} from "lucide-react"
import Image from "next/image"
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react" // Import useEffect
import { Badge } from "@/components/ui/badge"
import { useSearchParams } from "next/navigation" // Import useSearchParams

const mockInsightsData = [
  {
    id: "vid001",
    title: "My Most Viral Video Yet!",
    platform: "TikTok",
    thumbnail: "/placeholder.svg?width=240&height=135",
    views: "2.1M",
    likes: "350K",
    comments: "4.2K",
    shares: "15K",
    watchTime: "Avg. 25s",
    date: "2024-06-02",
    audienceRetention: [
      { time: "0s", retention: 100 },
      { time: "5s", retention: 85 },
      { time: "10s", retention: 70 },
      { time: "15s", retention: 60 },
      { time: "20s", retention: 45 },
      { time: "25s", retention: 30 },
    ],
    demographics: [
      { name: "18-24", value: 400, fill: "var(--color-groupA)" },
      { name: "25-34", value: 300, fill: "var(--color-groupB)" },
      { name: "35-44", value: 200, fill: "var(--color-groupC)" },
      { name: "45+", value: 100, fill: "var(--color-groupD)" },
    ],
  },
  {
    id: "vid002",
    title: "Deep Dive into Quantum Computing",
    platform: "YouTube",
    thumbnail: "/placeholder.svg?width=240&height=135",
    views: "150K",
    likes: "12K",
    comments: "1.5K",
    shares: "800",
    watchTime: "Avg. 8m 30s",
    date: "2024-06-05",
    audienceRetention: [
      { time: "0m", retention: 100 },
      { time: "2m", retention: 75 },
      { time: "5m", retention: 60 },
      { time: "8m", retention: 50 },
      { time: "10m", retention: 35 },
    ],
    demographics: [
      { name: "18-24", value: 250, fill: "var(--color-groupA)" },
      { name: "25-34", value: 450, fill: "var(--color-groupB)" },
      { name: "35-44", value: 200, fill: "var(--color-groupC)" },
      { name: "45+", value: 100, fill: "var(--color-groupD)" },
    ],
  },
  {
    id: "post001",
    title: "Behind the Scenes: My Studio Setup",
    platform: "Instagram",
    thumbnail: "/placeholder.svg?width=240&height=135",
    views: "80K", // Impressions for Instagram
    likes: "7.5K",
    comments: "300",
    shares: "150", // Saves for Instagram
    watchTime: "N/A",
    date: "2024-06-08",
    audienceRetention: [],
    demographics: [
      { name: "18-24", value: 350, fill: "var(--color-groupA)" },
      { name: "25-34", value: 300, fill: "var(--color-groupB)" },
      { name: "35-44", value: 250, fill: "var(--color-groupC)" },
      { name: "45+", value: 100, fill: "var(--color-groupD)" },
    ],
  },
  {
    id: "vid003",
    title: "5 Tips for Better Content Creation",
    platform: "YouTube",
    thumbnail: "/placeholder.svg?width=240&height=135",
    views: "95K",
    likes: "8.2K",
    comments: "950",
    shares: "420",
    watchTime: "Avg. 6m 15s",
    date: "2024-06-10",
    audienceRetention: [
      { time: "0m", retention: 100 },
      { time: "2m", retention: 80 },
      { time: "4m", retention: 65 },
      { time: "6m", retention: 45 },
      { time: "8m", retention: 30 },
    ],
    demographics: [
      { name: "18-24", value: 280, fill: "var(--color-groupA)" },
      { name: "25-34", value: 380, fill: "var(--color-groupB)" },
      { name: "35-44", value: 220, fill: "var(--color-groupC)" },
      { name: "45+", value: 120, fill: "var(--color-groupD)" },
    ],
  },
]

const chartConfigDemographics = {
  value: { label: "Audience" },
  groupA: { label: "18-24", color: "hsl(var(--primary))" },
  groupB: { label: "25-34", color: "hsl(210, 100%, 50%)" },
  groupC: { label: "35-44", color: "hsl(280, 100%, 50%)" },
  groupD: { label: "45+", color: "hsl(150, 100%, 40%)" },
}

const chartConfigRetention = {
  retention: { label: "Retention (%)", color: "hsl(var(--primary))" },
}

export default function InsightsPage() {
  const searchParams = useSearchParams()
  const initialSearchQuery = searchParams.get("q") || ""

  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery) // Initialize with URL param
  const [dateFilter, setDateFilter] = useState("all")

  // Update local search query state if URL param changes
  useEffect(() => {
    setSearchQuery(initialSearchQuery)
  }, [initialSearchQuery])

  // Filter content based on active tab, search query, and date filter
  const filteredContent = mockInsightsData.filter((item) => {
    const matchesPlatform = activeTab === "all" || item.platform.toLowerCase() === activeTab
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())

    let matchesDate = true
    if (dateFilter === "week") {
      // Mock filter for last week
      matchesDate = ["2024-06-08", "2024-06-10"].includes(item.date)
    } else if (dateFilter === "month") {
      // All dates are within the last month in our mock data
      matchesDate = true
    }

    return matchesPlatform && matchesSearch && matchesDate
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Insights</h1>
        <p className="text-muted-foreground">Analyze the performance of your content across platforms.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="bg-white w-full md:w-auto grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="youtube">YouTube</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
            <TabsTrigger value="tiktok">TikTok</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              className="pl-8 w-full md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> More Filters
            </Button>

            <Button>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
      </div>

      {filteredContent.length > 0 ? (
        <div className="grid gap-6">
          {filteredContent.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={`
                          ${item.platform === "YouTube" ? "bg-red-50 text-red-700 border-red-200" : ""}
                          ${item.platform === "Instagram" ? "bg-pink-50 text-pink-700 border-pink-200" : ""}
                          ${item.platform === "TikTok" ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
                        `}
                      >
                        {item.platform}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                    </div>
                    <CardTitle className="text-xl group flex items-center gap-2">
                      {item.title}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                    </CardTitle>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 gap-1 md:self-start">
                    <Download className="h-3.5 w-3.5" />
                    <span>Export Data</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      width={240}
                      height={135}
                      className="rounded-md mb-4 aspect-video object-cover w-full"
                    />
                    <div className="grid gap-3">
                      <h4 className="font-semibold">Key Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <Eye className="mr-2 h-4 w-4" />
                            <span className="text-sm">Views</span>
                          </div>
                          <p className="text-lg font-semibold">{item.views}</p>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            <span className="text-sm">Likes</span>
                          </div>
                          <p className="text-lg font-semibold">{item.likes}</p>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span className="text-sm">Comments</span>
                          </div>
                          <p className="text-lg font-semibold">{item.comments}</p>
                        </div>
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <div className="flex items-center text-muted-foreground mb-1">
                            <Share2 className="mr-2 h-4 w-4" />
                            <span className="text-sm">Shares</span>
                          </div>
                          <p className="text-lg font-semibold">{item.shares}</p>
                        </div>
                        {item.watchTime !== "N/A" && (
                          <div className="bg-muted/30 p-3 rounded-lg col-span-2">
                            <div className="flex items-center text-muted-foreground mb-1">
                              <Clock className="mr-2 h-4 w-4" />
                              <span className="text-sm">Watch Time</span>
                            </div>
                            <p className="text-lg font-semibold">{item.watchTime}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2 grid gap-6">
                    {item.audienceRetention.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Audience Retention</h4>
                        <div className="bg-white p-4 rounded-lg border">
                          <ChartContainer config={chartConfigRetention} className="h-[180px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={item.audienceRetention}
                                margin={{ left: 0, right: 20, top: 10, bottom: 10 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="time" />
                                <YAxis domain={[0, 100]} unit="%" />
                                <RechartsTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                <Line
                                  type="monotone"
                                  dataKey="retention"
                                  stroke="var(--color-retention)"
                                  strokeWidth={2}
                                  dot={false}
                                  activeDot={{ r: 6 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold mb-3">Audience Demographics</h4>
                      <div className="bg-white p-4 rounded-lg border">
                        <ChartContainer config={chartConfigDemographics} className="h-[180px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <RechartsTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                              <Pie
                                data={item.demographics}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={2}
                              >
                                {item.demographics.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Pie>
                              <ChartLegend
                                content={<ChartLegendContent nameKey="name" />}
                                className="flex-wrap gap-4 [&>*]:basis-auto"
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No content found</h3>
            <p className="text-muted-foreground max-w-md">
              No content matches your current filters. Try adjusting your search or filters to see more results.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
