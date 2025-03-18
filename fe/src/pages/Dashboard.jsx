import { useEffect } from "react"
import { useStore } from "../lib/store"
import StatsCard from "../components/comp/Stats"
import ContestTabs from "../components/comp/ContestTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

const Dashboard = () => {
  const { user, leetcodeStats, codeforcesStats, codechefStats, fetchAllStats, fetchContests } = useStore()

  useEffect(() => {
    // Fetch stats and contests when dashboard loads
    fetchAllStats()
    fetchContests()
  }, [fetchAllStats, fetchContests])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name || "User"}</h1>

      {/* Stats Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="LeetCode"
            username={user?.leetcodeUsername}
            stats={leetcodeStats}
            loading={!leetcodeStats}
          />
          <StatsCard
            title="Codeforces"
            username={user?.codeforcesUsername}
            stats={codeforcesStats}
            loading={!codeforcesStats}
          />
          <StatsCard
            title="CodeChef"
            username={user?.codechefUsername}
            stats={codechefStats}
            loading={!codechefStats}
          />
        </div>
      </section>

      {/* Contests Section */}
      <section className="space-y-4">
        <Tabs defaultValue="upcoming">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Contests</h2>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="mt-4">
            <ContestTabs type="upcoming" />
          </TabsContent>

          <TabsContent value="past" className="mt-4">
            <ContestTabs type="past" />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

export default Dashboard

