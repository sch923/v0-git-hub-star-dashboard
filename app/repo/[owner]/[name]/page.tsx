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
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2 font-semibold">
          <StarIcon className="h-5 w-5 text-yellow-400" />
          <span>GitHub Stars Dashboard</span>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Suspense fallback={<Skeleton className="h-[100px] w-full" />}>
          <RepoHeader owner={owner} name={name} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
          <RepoStatsGrid owner={owner} name={name} />
        </Suspense>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stars">Stars</TabsTrigger>
            <TabsTrigger value="forks">Forks</TabsTrigger>
            <TabsTrigger value="issues">Issues & PRs</TabsTrigger>
            <TabsTrigger value="contributors">Contributors</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Repository Activity</CardTitle>
                  <CardDescription>Commits, issues, and pull requests over time</CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-4">
                  <div className="h-[350px]">
                    <Suspense fallback={<Skeleton className="h-full w-full" />}>
                      <RepoDetailChart owner={owner} name={name} type="activity" className="h-full" />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>README</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[350px] overflow-auto">
                  <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                    <RepoReadme owner={owner} name={name} />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest commits, issues, and pull requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                  <RepoActivity owner={owner} name={name} />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stars" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Star History</CardTitle>
                <CardDescription>Star count over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[400px]">
                  <Suspense fallback={<Skeleton className="h-full w-full" />}>
                    <RepoDetailChart owner={owner} name={name} type="stars" className="h-full" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fork History</CardTitle>
                <CardDescription>Fork count over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[400px]">
                  <Suspense fallback={<Skeleton className="h-full w-full" />}>
                    <RepoDetailChart owner={owner} name={name} type="forks" className="h-full" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Issues & Pull Requests</CardTitle>
                <CardDescription>Open and closed issues and pull requests over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="h-[400px]">
                  <Suspense fallback={<Skeleton className="h-full w-full" />}>
                    <RepoDetailChart owner={owner} name={name} type="issues" className="h-full" />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>Most active contributors to this repository</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
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
