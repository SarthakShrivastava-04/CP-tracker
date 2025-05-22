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
    // Fetch stats and contests when dashboard loads
    fetchAllStats();
    fetchContests();
    if (user?.id) {
      fetchBookmarkedContests(user.id); // Fetch bookmarked contests for the user
    }
  }, [fetchAllStats, fetchContests, fetchBookmarkedContests, user]);

  return (
    <div className="space-y-8 p-6 mx-28 bg-white dark:bg-[#000C2D]">
      {/* Welcome Section */}
      <div className="space-y-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-[#000C2D] dark:text-[#f4f4f5]">
          Welcome back, {user?.username || "Coder"}! 
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Ready to conquer today's challenges? Let’s track your progress and
          crush your goals!
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">
          "The only way to do great work is to love what you do." – Steve Jobs
        </p>
      </div>

      {/* Stats Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-[#000C2D] dark:text-[#f4f4f5]">
          Your Coding Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <section className="space-y-6">
        <Tabs defaultValue="upcoming">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#000C2D] dark:text-[#f4f4f5]">
              Coding Contests
            </h2>
            <TabsList className="bg-zinc-100 flex gap-2 dark:bg-[#000C2D]">
              <TabsTrigger
                value="upcoming"
                className="data-[state=active]:ring-2 data-[state=active]:ring-blue-500 dark:data-[state=active]:ring-blue-400 transition-all duration-300"    >
                Upcoming
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="data-[state=active]:ring-2 data-[state=active]:ring-blue-500 dark:data-[state=active]:ring-blue-400 transition-all duration-300"  >
                Past
              </TabsTrigger>
              <TabsTrigger
                value="bookmarked"
                className="data-[state=active]:bg-[#000C2D] data-[state=active]:text-[#f4f4f5] dark:data-[state=active]:bg-[#f4f4f5] dark:data-[state=active]:text-[#000C2D] data-[state=active]:outline data-[state=active]:outline-2 data-[state=active]:outline-[#000C2D] dark:data-[state=active]:outline-[#f4f4f5] transition-all duration-300"
              >
                Bookmarked
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Upcoming Contests */}
          <TabsContent value="upcoming" className="mt-6">
            <ContestTabs type="upcoming" />
          </TabsContent>

          {/* Past Contests */}
          <TabsContent value="past" className="mt-6">
            <ContestTabs type="past" />
          </TabsContent>

          {/* Bookmarked Contests */}
          <TabsContent value="bookmarked" className="mt-6">
            <ContestTabs type="bookmarked" />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Dashboard;