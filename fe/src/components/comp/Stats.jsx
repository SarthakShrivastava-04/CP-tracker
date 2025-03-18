import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { Trophy, Award, Star } from "lucide-react"

const StatsCard = ({ title, username, stats, loading }) => {
  // Platform-specific rendering
  const renderStats = () => {
    if (loading) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )
    }

    if (!stats) {
      return <p className="text-muted-foreground">No stats available</p>
    }

    switch (title.toLowerCase()) {
      case "leetcode":
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ranking:</span>
              <span className="font-medium">{stats.ranking || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Problems Solved:</span>
              <span className="font-medium">{stats.problemsSolved || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Contest Rating:</span>
              <span className="font-medium">{stats.contestRating || "N/A"}</span>
            </div>
          </div>
        )
      case "codeforces":
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Rating:</span>
              <span className="font-medium">{stats.rating || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Rank:</span>
              <span className="font-medium">{stats.rank || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Max Rating:</span>
              <span className="font-medium">{stats.maxRating || "N/A"}</span>
            </div>
          </div>
        )
      case "codechef":
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Rating:</span>
              <span className="font-medium">{stats.rating || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Stars:</span>
              <span className="font-medium">{stats.stars || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Global Rank:</span>
              <span className="font-medium">{stats.globalRank || "N/A"}</span>
            </div>
          </div>
        )
      default:
        return <p className="text-muted-foreground">No stats available</p>
    }
  }

  // Platform-specific icon
  const renderIcon = () => {
    switch (title.toLowerCase()) {
      case "leetcode":
        return <Trophy className="h-5 w-5" />
      case "codeforces":
        return <Award className="h-5 w-5" />
      case "codechef":
        return <Star className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <Card className="h-[25vh] overflow-auto">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            {renderIcon()}
            {title}
          </CardTitle>
        </div>
        <CardDescription>{username ? `@${username}` : "No username provided"}</CardDescription>
      </CardHeader>
      <CardContent>{renderStats()}</CardContent>
    </Card>
  )
}

export default StatsCard

