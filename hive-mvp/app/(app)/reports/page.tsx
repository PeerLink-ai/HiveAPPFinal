"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Download,
  FileSpreadsheet,
  CalendarRange,
  Users,
  BarChart3,
  LineChart,
  PieChart,
  ArrowRight,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function ReportsPage() {
  const { toast } = useToast()

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Report Download Started",
      description: `Your ${reportType} report is being generated and will download shortly.`,
    })

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Report Downloaded",
        description: `Your ${reportType} report has been downloaded successfully.`,
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Reports</h1>
        <p className="text-muted-foreground">Generate and download detailed reports on your content performance.</p>
      </div>

      <Tabs defaultValue="reports">
        <TabsList className="bg-white">
          <TabsTrigger value="reports">Available Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Performance Overview</CardTitle>
                    <CardDescription>Comprehensive analytics across all platforms</CardDescription>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Report completeness</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time period</label>
                    <Select defaultValue="last30">
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last7">Last 7 Days</SelectItem>
                        <SelectItem value="last30">Last 30 Days</SelectItem>
                        <SelectItem value="last90">Last 90 Days</SelectItem>
                        <SelectItem value="alltime">All Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleDownloadReport("Performance Overview")}>
                  <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Platform Comparison</CardTitle>
                    <CardDescription>Compare metrics across different platforms</CardDescription>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <PieChart className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Report completeness</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Platforms</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select platforms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Platforms</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time period</label>
                      <Select defaultValue="last30">
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last30">Last 30 Days</SelectItem>
                          <SelectItem value="last90">Last 90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleDownloadReport("Platform Comparison")}>
                  <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Audience Demographics</CardTitle>
                    <CardDescription>Detailed breakdown of your audience</CardDescription>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Report completeness</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Platform</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Platforms</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Metrics</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select metrics" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Metrics</SelectItem>
                          <SelectItem value="age">Age Groups</SelectItem>
                          <SelectItem value="gender">Gender</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleDownloadReport("Audience Demographics")}>
                  <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Content Performance</CardTitle>
                    <CardDescription>Detailed metrics for individual content</CardDescription>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <LineChart className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Report completeness</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content type</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Content</SelectItem>
                          <SelectItem value="videos">Videos</SelectItem>
                          <SelectItem value="posts">Posts</SelectItem>
                          <SelectItem value="stories">Stories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time period</label>
                      <Select defaultValue="last30">
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last30">Last 30 Days</SelectItem>
                          <SelectItem value="last90">Last 90 Days</SelectItem>
                          <SelectItem value="alltime">All Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleDownloadReport("Content Performance")}>
                  <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Growth Trends</CardTitle>
                    <CardDescription>Analyze your audience growth over time</CardDescription>
                  </div>
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <CalendarRange className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Report completeness</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Metrics</label>
                      <Select defaultValue="followers">
                        <SelectTrigger>
                          <SelectValue placeholder="Select metrics" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="followers">Followers</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                          <SelectItem value="views">Views</SelectItem>
                          <SelectItem value="all">All Metrics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time range</label>
                      <Select defaultValue="year">
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="month">Last Month</SelectItem>
                          <SelectItem value="quarter">Last Quarter</SelectItem>
                          <SelectItem value="year">Last Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleDownloadReport("Growth Trends")}>
                  <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
              </CardFooter>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Engagement Analysis</CardTitle>
                    <CardDescription>Deep dive into audience interactions</CardDescription>
                  </div>
                  <div className="bg-pink-100 p-2 rounded-lg">
                    <FileSpreadsheet className="h-5 w-5 text-pink-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Report completeness</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Platform</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Platforms</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time period</label>
                      <Select defaultValue="last30">
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last30">Last 30 Days</SelectItem>
                          <SelectItem value="last90">Last 90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleDownloadReport("Engagement Analysis")}>
                  <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Configure automatic report generation and delivery</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <CalendarRange className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No scheduled reports</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Set up automated reports to be delivered to your email on a regular schedule.
              </p>
              <Button>Schedule a Report</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>Build your own custom analytics reports</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create custom reports</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Build tailored reports with exactly the metrics and insights you need.
              </p>
              <Button>Create Custom Report</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Templates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Report Templates</h2>
          <Button variant="ghost" size="sm">
            View All Templates <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="card-hover">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Content Creator Benchmark</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="aspect-video rounded-md overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?width=400&height=225"
                  alt="Report Template"
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-sm text-muted-foreground">Compare your performance against creators in your niche.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Use Template
              </Button>
            </CardFooter>
          </Card>

          <Card className="card-hover">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Monthly Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="aspect-video rounded-md overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?width=400&height=225"
                  alt="Report Template"
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Comprehensive monthly overview with key metrics and insights.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Use Template
              </Button>
            </CardFooter>
          </Card>

          <Card className="card-hover">
            <CardHeader className="pb-0">
              <CardTitle className="text-base">Content Strategy Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="aspect-video rounded-md overflow-hidden mb-4">
                <Image
                  src="/placeholder.svg?width=400&height=225"
                  alt="Report Template"
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Analyze what content performs best and optimize your strategy.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Use Template
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
