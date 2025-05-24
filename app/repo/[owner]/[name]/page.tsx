import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, StarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { RepoHeader } from "@/components/repo-header"
import { RepoStatsGrid } from "@/components/repo-stats-grid"
import { RepoDetailChart } from "@/components/repo-detail-chart"
import { RepoContributors } from "@/components/repo-contributors"
import { RepoActivity } from "@/components/repo-activity"
import { RepoReadme } from "@/components/repo-readme"

interface RepoPageProps {
  params: {
    owner: string
    name: string
  }
}

export default function RepoPage({ params }: RepoPageProps) {
  const { owner, name } = params

  return (
    <div className="flex min-h-screen w-full flex-col relative">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 glass-header px-4 md:px-6">
        <Button variant="ghost" size="icon" className="glass-button text-gray-700 hover:text-gray-800" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2 font-semibold text-gray-700 drop-shadow-sm">
          <StarIcon className="h-5 w-5 text-yellow-500 drop-shadow-sm" />
          <span className="bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
            GitHub Stars Dashboard
          </span>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Suspense fallback={<Skeleton className="h-[100px] w-full bg-gray-200/50" />}>
          <RepoHeader owner={owner} name={name} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[120px] w-full bg-gray-200/50" />}>
          <RepoStatsGrid owner={owner} name={name} />
        </Suspense>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger
              value="overview"
              className="text-gray-600 data-[state=active]:bg-white/25 data-[state=active]:text-gray-800"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="stars"
              className="text-gray-600 data-[state=active]:bg-white/25 data-[state=active]:text-gray-800"
            >
              Stars
            </TabsTrigger>
            <TabsTrigger
              value="forks"
              className="text-gray-600 data-[state=active]:bg-white/25 data-[state=active]:text-gray-800"
            >
              Forks
            </TabsTrigger>
            <TabsTrigger
              value="issues"
              className="text-gray-600 data-[state=active]:bg-white/25 data-[state=active]:text-gray-800"
            >
              Issues & PRs
            </TabsTrigger>
            <TabsTrigger
              value="contributors"
              className="text-gray-600 data-[state=active]:bg-white/25 data-[state=active]:text-gray-800"
            >
              Contributors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2 glass-card-blue border-0">
                <CardHeader>
                  <CardTitle className="text-gray-800">Repository Activity</CardTitle>
                  <CardDescription className="text-gray-600">
                    Commits, issues, and pull requests over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <div className="h-[350px]">
                    <Suspense fallback={<Skeleton className="h-full w-full bg-gray-200/50" />}>
                      <RepoDetailChart owner={owner} name={name} type="activity" className="h-full" />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card-green border-0">
                <CardHeader>
                  <CardTitle className="text-gray-800">README</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[350px] overflow-auto">
                  <Suspense fallback={<Skeleton className="h-[350px] w-full bg-gray-200/50" />}>
                    <RepoReadme owner={owner} name={name} />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
            <Card className="glass-card-purple border-0">
              <CardHeader>
                <CardTitle className="text-gray-800">Recent Activity</CardTitle>
                <CardDescription className="text-gray-600">Latest commits, issues, and pull requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[350px] w-full bg-gray-200/50" />}>
                  <RepoActivity owner={owner} name={name} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stars" className="space-y-4">
            <Card className="glass-card-yellow border-0">
              <CardHeader>
                <CardTitle className="text-gray-800">Star History</CardTitle>
                <CardDescription className="text-gray-600">Star count over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[400px]">
                  <Suspense fallback={<Skeleton className="h-full w-full bg-gray-200/50" />}>
                    <RepoDetailChart owner={owner} name={name} type="stars" className="h-full" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forks" className="space-y-4">
            <Card className="glass-card-indigo border-0">
              <CardHeader>
                <CardTitle className="text-gray-800">Fork History</CardTitle>
                <CardDescription className="text-gray-600">Fork count over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[400px]">
                  <Suspense fallback={<Skeleton className="h-full w-full bg-gray-200/50" />}>
                    <RepoDetailChart owner={owner} name={name} type="forks" className="h-full" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            <Card className="glass-card-orange border-0">
              <CardHeader>
                <CardTitle className="text-gray-800">Issues & Pull Requests</CardTitle>
                <CardDescription className="text-gray-600">
                  Open and closed issues and pull requests over time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[400px]">
                  <Suspense fallback={<Skeleton className="h-full w-full bg-gray-200/50" />}>
                    <RepoDetailChart owner={owner} name={name} type="issues" className="h-full" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributors" className="space-y-4">
            <Card className="glass-card-pink border-0">
              <CardHeader>
                <CardTitle className="text-gray-800">Top Contributors</CardTitle>
                <CardDescription className="text-gray-600">Most active contributors to this repository</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[400px] w-full bg-gray-200/50" />}>
                  <RepoContributors owner={owner} name={name} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Photo Credit */}
      <div className="photo-credit">
        Photo by{" "}
        <a
          href="https://unsplash.com/@neotronimz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nirmal Rajendharkumar
        </a>{" "}
        on{" "}
        <a
          href="https://unsplash.com/photos/43gGq3BhphM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          target="_blank"
          rel="noopener noreferrer"
        >
          Unsplash
        </a>
      </div>
    </div>
  )
}
