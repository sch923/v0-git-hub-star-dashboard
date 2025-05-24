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
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 glass-header px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold text-gray-700 drop-shadow-sm">
          <StarIcon className="h-5 w-5 text-yellow-500 drop-shadow-sm" />
          <span className="bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
            GitHub Stars Dashboard
          </span>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card className="glass-card-blue border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Repositories</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-blue-500"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 drop-shadow-sm">12</div>
              <p className="text-xs text-gray-600">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card-yellow border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Stars</CardTitle>
              <StarIcon className="h-4 w-4 text-yellow-500 drop-shadow-sm" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 drop-shadow-sm">45,231</div>
              <p className="text-xs text-gray-600">+2.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card-purple border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Most Starred</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-purple-500"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 drop-shadow-sm">next.js</div>
              <p className="text-xs text-gray-600">112,345 stars</p>
            </CardContent>
          </Card>

          <Card className="glass-card-green border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Fastest Growing</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-green-500"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 drop-shadow-sm">v0</div>
              <p className="text-xs text-gray-600">+1,234 this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2 glass-card-indigo border-0">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle className="text-gray-800">Star History</CardTitle>
                <CardDescription className="text-gray-600">
                  Star count over time for selected repositories
                </CardDescription>
              </div>
              <SearchForm className="ml-auto" />
            </CardHeader>
            <CardContent className="p-0 pt-4">
              <div className="h-[350px] md:h-[400px]">
                <Suspense fallback={<Skeleton className="h-full w-full bg-gray-200/50" />}>
                  <RepoStarChart className="h-full" />
                </Suspense>
              </div>
            </CardContent>
          </Card>

          <Card className="xl:col-span-1 glass-card-teal border-0">
            <CardHeader>
              <CardTitle className="text-gray-800">Top Repositories</CardTitle>
              <CardDescription className="text-gray-600">Your most starred repositories</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="stars" className="glass-tabs">
                <TabsList className="mb-4 bg-white/10 backdrop-blur-sm border border-white/20">
                  <TabsTrigger
                    value="stars"
                    className="text-gray-600 data-[state=active]:bg-white/25 data-[state=active]:text-gray-800"
                  >
                    Stars
                  </TabsTrigger>
                  <TabsTrigger
                    value="growth"
                    className="text-gray-600 data-[state=active]:bg-white/25 data-[state=active]:text-gray-800"
                  >
                    Growth
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="stars">
                  <Suspense fallback={<Skeleton className="h-[350px] w-full bg-gray-200/50" />}>
                    <RepoTable />
                  </Suspense>
                </TabsContent>
                <TabsContent value="growth">
                  <Suspense fallback={<Skeleton className="h-[350px] w-full bg-gray-200/50" />}>
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
