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
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 glass-header px-4 md:px-6">
        <Button variant="ghost" size="icon" className="glass-button text-white hover:text-white" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2 font-semibold text-white drop-shadow-lg">
          <StarIcon className="h-5 w-5 text-yellow-300 drop-shadow-lg" />
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            GitHub Stars Dashboard
          </span>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Suspense fallback={<Skeleton className="h-[100px] w-full bg-white/10" />}>
          <RepoHeader owner={owner} name={name} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[120px] w-full bg-white/10" />}>
          <RepoStatsGrid owner={owner} name={name} />
        </Suspense>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-white/10 backdrop-blur-md border border-white/20">
            <TabsTrigger
              value="overview"
              className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="stars"
              className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Stars
            </TabsTrigger>
            <TabsTrigger
              value="forks"
              className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Forks
            </TabsTrigger>
            <TabsTrigger
              value="issues"
              className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Issues & PRs
            </TabsTrigger>
            <TabsTrigger
              value="contributors"
              className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Contributors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2 glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-white/90">Repository Activity</CardTitle>
                  <CardDescription className="text-white/70">
                    Commits, issues, and pull requests over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <div className="h-[350px]">
                    <Suspense fallback={<Skeleton className="h-full w-full bg-white/10" />}>
                      <RepoDetailChart owner={owner} name={name} type="activity" className="h-full" />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-card border-0">
                <CardHeader>
                  <CardTitle className="text-white/90">README</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[350px] overflow-auto">
                  <Suspense fallback={<Skeleton className="h-[350px] w-full bg-white/10" />}>
                    <RepoReadme owner={owner} name={name} />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-white/90">Recent Activity</CardTitle>
                <CardDescription className="text-white/70">Latest commits, issues, and pull requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[350px] w-full bg-white/10" />}>
                  <RepoActivity owner={owner} name={name} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stars" className="space-y-4">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-white/90">Star History</CardTitle>
                <CardDescription className="text-white/70">Star count over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[400px]">
                  <Suspense fallback={<Skeleton className="h-full w-full bg-white/10" />}>
                    <RepoDetailChart owner={owner} name={name} type="stars" className="h-full" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forks" className="space-y-4">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-white/90">Fork History</CardTitle>
                <CardDescription className="text-white/70">Fork count over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[400px]">
                  <Suspense fallback={<Skeleton className="h-full w-full bg-white/10" />}>
                    <RepoDetailChart owner={owner} name={name} type="forks" className="h-full" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-white/90">Issues & Pull Requests</CardTitle>
                <CardDescription className="text-white/70">
                  Open and closed issues and pull requests over time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[400px]">
                  <Suspense fallback={<Skeleton className="h-full w-full bg-white/10" />}>
                    <RepoDetailChart owner={owner} name={name} type="issues" className="h-full" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributors" className="space-y-4">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-white/90">Top Contributors</CardTitle>
                <CardDescription className="text-white/70">Most active contributors to this repository</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[400px] w-full bg-white/10" />}>
                  <RepoContributors owner={owner} name={name} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
