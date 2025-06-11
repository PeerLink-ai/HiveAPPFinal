import type React from "react"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Auth form */}
      <div className="flex flex-1 items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right side - Decorative background */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gradient-to-br from-primary-light to-primary">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <div className="mb-8">
            <Image
              src="/placeholder.svg?width=120&height=120"
              alt="Hive Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-center">Elevate Your Content Strategy</h1>
          <p className="text-xl text-center mb-8">
            Unlock powerful insights and analytics to grow your audience across all platforms.
          </p>
          <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-bold text-lg">Track</h3>
              <p className="text-sm">Monitor performance across platforms</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-bold text-lg">Analyze</h3>
              <p className="text-sm">Get detailed content insights</p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
              <h3 className="font-bold text-lg">Grow</h3>
              <p className="text-sm">Optimize your content strategy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
