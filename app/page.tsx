import { StarIcon } from "lucide-react"
import { getServerSession } from "next-auth/next"
import { AuthButtons } from "@/components/auth/auth-buttons"
import { DashboardContent } from "@/components/dashboard-content"

import { authOptions } from "@/lib/auth"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="h-screen flex justify-center items-center">
        <AuthButtons />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col relative">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 glass-header px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold text-gray-800 drop-shadow-lg">
          <StarIcon className="h-5 w-5 text-yellow-500 drop-shadow-lg" />
          <span className="bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent drop-shadow-lg">
            GitHub Stars Dashboard
          </span>
        </div>
        <div className="ml-auto">
          <AuthButtons />
        </div>
      </header>

      <DashboardContent />

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
