import { useEffect } from "react";
import { useStore } from "../lib/store";
import StatsCard from "../components/comp/Stats";
import ContestTabs from "../components/comp/ContestTab";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const Dashboard = () => {
  const {
    user,
    leetcodeStats,
    codeforcesStats,
    codechefStats,
    fetchAllStats,
    fetchContests,
    fetchBookmarkedContests,
    bookmarkedContests,
  } = useStore();

  useEffect(() => {
    // Fetch stats and contests when dashboard loads
    fetchAllStats();
    fetchContests();
    if (user?.id) {
      fetchBookmarkedContests(user.id); // Fetch bookmarked contests for the user
    }
  }, [fetchAllStats, fetchContests, fetchBookmarkedContests, user]);

  return (
    <div className="space-y-8 p-6 bg-white dark:bg-zinc-900">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Welcome back, {user?.name || "Coder"}!
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Ready to tackle some challenges today? Let’s check your progress.
        </p>
      </div>

      {/* Stats Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Your Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="LeetCode"
            username={user?.leetcode}
            stats={leetcodeStats}
            loading={!leetcodeStats}
          />
          <StatsCard
            title="Codeforces"
            username={user?.codeforces}
            stats={codeforcesStats}
            loading={!codeforcesStats}
          />
          <StatsCard
            title="CodeChef"
            username={user?.codechef}
            stats={codechefStats}
            loading={!codechefStats}
          />
        </div>
      </section>

      {/* Contests Section */}
      <section className="space-y-4">
        <Tabs defaultValue="upcoming">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              Contests
            </h2>
            <TabsList className="bg-zinc-100 flex gap-2 dark:bg-zinc-800">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-zinc-900"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-zinc-900"
              >
                Past
              </TabsTrigger>
              <TabsTrigger
                value="bookmarked"
                className="data-[state=active]:bg-zinc-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-zinc-900"
              >
                Bookmarked
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Upcoming Contests */}
          <TabsContent value="upcoming" className="mt-4">
            <ContestTabs type="upcoming" />
          </TabsContent>

          {/* Past Contests */}
          <TabsContent value="past" className="mt-4">
            <ContestTabs type="past" />
          </TabsContent>

          {/* Bookmarked Contests */}
          <TabsContent value="bookmarked" className="mt-4">
            <ContestTabs type="bookmarked" />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Dashboard;