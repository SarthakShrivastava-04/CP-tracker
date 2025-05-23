import { useState, useEffect } from "react";
import { useStore } from "../../lib/store";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import PastContestCard from "./PastContestCard";
import UpcomingContestCard from "./UpcomingContestCard";
import { Switch } from "../ui/switch";

const ContestTabs = ({ type }) => {
  const {
    upcomingContests,
    pastContests,
    bookmarkedContests,
    fetchBookmarkedContests,
    toggleBookmark,
    fetchContests,
    user,
  } = useStore();

  const [filteredContests, setFilteredContests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const platforms = ["LeetCode", "CodeChef", "Codeforces"];

  // Fetch contests based on type
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (type === "bookmarked") {
          await fetchBookmarkedContests(user.id);
        } else {
          await fetchContests();
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error fetching data",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, fetchContests, fetchBookmarkedContests, user]);

  // Filter contests based on selected platforms
  useEffect(() => {
    let contests =
      type === "upcoming"
        ? upcomingContests
        : type === "past"
        ? pastContests
        : bookmarkedContests; // Fetch bookmarked past contests

    if (selectedPlatforms.length > 0) {
      contests = contests.filter((contest) =>
        selectedPlatforms.includes(contest.platform)
      );
    }

    setFilteredContests(contests);
  }, [
    type,
    upcomingContests,
    pastContests,
    bookmarkedContests,
    selectedPlatforms,
  ]);

  const handleBookmark = async (contest) => {
    const result = await toggleBookmark(contest.id);
    if (!result.success) {
      toast({
        variant: "destructive",
        title: "Failed to bookmark",
        description: result.error,
      });
    }
  };

  const handlePlatformFilterChange = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#000C2D] dark:text-[#f4f4f5]" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Platform Filter */}
      <div className="flex flex-wrap gap-4">
        {platforms.map((platform) => (
          <div key={platform} className="flex items-center gap-2">
            <Switch
              id={platform}
              checked={selectedPlatforms.includes(platform)}
              onCheckedChange={() => handlePlatformFilterChange(platform)}
              className=" border-zinc-500 border-2 transition-all"
            />
            <Label htmlFor={platform}>{platform}</Label>
          </div>
        ))}
      </div>
      <div>
        {/* Contest List */}
        {filteredContests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#000000] dark:text-[#f4f4f5]">
              No contests found
            </p>
          </div>
        ) : (
          <div className="space-y-1 flex flex-wrap gap-1">
            {filteredContests.map((contest) =>
              type === "upcoming" ? (
                <UpcomingContestCard key={contest.id} contest={contest} />
              ) : (
                <PastContestCard
                  key={contest.id}
                  contest={contest}
                  onBookmark={handleBookmark}
                  type={type}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestTabs;
