import { Suspense } from "react"
import { StarIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RepoStarChart } from "@/components/repo-star-chart"
import { RepoTable } from "@/components/repo-table"
import { SearchForm } from "@/components/search-form"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col relative">
      {/* 背景のグラデーション装飾 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-3000"></div>
      </div>

      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 glass-header px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold text-white drop-shadow-lg">
          <StarIcon className="h-5 w-5 text-yellow-300 drop-shadow-lg" />
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            GitHub Stars Dashboard
          </span>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Total Repositories</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-white/70"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white drop-shadow-lg">12</div>
              <p className="text-xs text-white/70">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Total Stars</CardTitle>
              <StarIcon className="h-4 w-4 text-yellow-300 drop-shadow-lg" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white drop-shadow-lg">45,231</div>
              <p className="text-xs text-white/70">+2.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Most Starred</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-white/70"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white drop-shadow-lg">next.js</div>
              <p className="text-xs text-white/70">112,345 stars</p>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/90">Fastest Growing</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-white/70"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white drop-shadow-lg">v0</div>
              <p className="text-xs text-white/70">+1,234 this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2 glass-card border-0">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle className="text-white/90">Star History</CardTitle>
                <CardDescription className="text-white/70">
                  Star count over time for selected repositories
                </CardDescription>
              </div>
              <SearchForm className="ml-auto" />
            </CardHeader>
            <CardContent className="p-0 pt-4">
              <div className="h-[350px] md:h-[400px]">
                <Suspense fallback={<Skeleton className="h-full w-full bg-white/10" />}>
                  <RepoStarChart className="h-full" />
                </Suspense>
              </div>
            </CardContent>
          </Card>

          <Card className="xl:col-span-1 glass-card border-0">
            <CardHeader>
              <CardTitle className="text-white/90">Top Repositories</CardTitle>
              <CardDescription className="text-white/70">Your most starred repositories</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stars" className="glass-tabs">
                <TabsList className="mb-4 bg-white/10 backdrop-blur-md border border-white/20">
                  <TabsTrigger
                    value="stars"
                    className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white"
                  >
                    Stars
                  </TabsTrigger>
                  <TabsTrigger
                    value="growth"
                    className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white"
                  >
                    Growth
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="stars">
                  <Suspense fallback={<Skeleton className="h-[350px] w-full bg-white/10" />}>
                    <RepoTable />
                  </Suspense>
                </TabsContent>
                <TabsContent value="growth">
                  <Suspense fallback={<Skeleton className="h-[350px] w-full bg-white/10" />}>
                    <RepoTable sortBy="growth" />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
