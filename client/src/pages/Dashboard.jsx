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
  } = useStore();

  useEffect(() => {
    fetchAllStats();
    fetchContests();
    if (user?.id) {
      fetchBookmarkedContests(user.id);
    }
  }, [fetchAllStats, fetchContests, fetchBookmarkedContests, user]);

  return (
    <div className="space-y-6 p-4 md:p-8 mx-4 md:mx-30 bg-white dark:bg-zinc-950 text-black dark:text-white font-sans">
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-medium">Your Coding Stats</h2>
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

      <section className="space-y-4">
        <Tabs defaultValue="upcoming">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <h2 className="text-lg md:text-xl font-medium">Coding Contests</h2>
            <TabsList className="bg-gray-200 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-lg p-1 flex gap-2">
              <TabsTrigger
                value="upcoming"
                className="text-xs md:text-sm px-3 py-1 rounded-md hover:text-white dark:hover:text-black data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="text-xs md:text-sm px-3 py-1 rounded-md hover:text-white dark:hover:text-black data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
              >
                Past
              </TabsTrigger>
              <TabsTrigger
                value="bookmarked"
                className="text-xs md:text-sm px-3 py-1 rounded-md hover:text-white dark:hover:text-black data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black"
              >
                Bookmarked
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="mt-4">
            <ContestTabs type="upcoming" />
          </TabsContent>

          <TabsContent value="past" className="mt-4">
            <ContestTabs type="past" />
          </TabsContent>

          <TabsContent value="bookmarked" className="mt-4">
            <ContestTabs type="bookmarked" />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Dashboard;
