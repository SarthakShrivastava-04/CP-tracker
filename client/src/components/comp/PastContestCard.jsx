import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookmarkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "../../lib/store";

const PastContestCard = ({ contest, type }) => {
  const { bookmarkedContests, bookmarkContest, user } = useStore();
  const [localBookmark, setLocalBookmark] = useState(false);

  useEffect(() => {
    const found = bookmarkedContests.some(
      (c) => c.contestName === contest.contestName && c.userId === user.id
    );
    setLocalBookmark(found);
  }, []);

  const handleBookmarkClick = async () => {
    const newStatus = !localBookmark;
    setLocalBookmark(newStatus);

    try {
      const response = await bookmarkContest(contest);
      if (!response.success) {
        console.error("Bookmark failed:", response.error);
        setLocalBookmark(!newStatus);
      }
    } catch (err) {
      console.error("Error bookmarking:", err);
      setLocalBookmark(!newStatus);
    }
  };

  const platformLogos = {
    LeetCode: "/leetcode.svg",
    CodeChef: "/codechef.svg",
    Codeforces: "/codeforces.svg",
  };

  return (
    <Card className="w-full flex flex-row items-center p-3 gap-0">
      {/* Logo */}
      <div className="w-8 h-8 flex-shrink-0">
        <img
          src={platformLogos[contest.platform]}
          alt={contest.platform}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Contest Info */}
      <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center ml-4 mr-10 flex-grow">
        <CardHeader className="p-0">
          <CardTitle className="text-base w-[400px] font-semibold text-zinc-900 dark:text-white">
            {contest.platform} - {contest.contestName}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 mt-1 space-y-0.5 text-sm font-medium flex justify-center gap-4 md:gap-20 text-zinc-700 dark:text-zinc-300">
          <p>
            <span className="font-medium">
              {contest.contestDate} - {contest.contestTime}
            </span>
          </p>
          <p>
            <span className="font-medium">Rank:</span> {contest.rank}
          </p>
          <p>
            <span className="font-medium">Rating:</span>{" "}
            {type === "bookmarked" ? contest.rating : contest.newRating}
          </p>
          {type === "bookmarked" && (
            <p>
              <span className="font-medium">Created:</span>{" "}
              {new Date(contest.createdAt).toLocaleString()}
            </p>
          )}
        </CardContent>
      </div>

      {/* Bookmark Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleBookmarkClick}
        className={`self-start ${
          localBookmark ? "text-yellow-600" : "text-zinc-500 dark:text-zinc-400"
        } hover:text-yellow-600 dark:hover:text-yellow-600 transition-colors `}
      >
        <BookmarkIcon className="h-6 w-6" />
      </Button>
    </Card>
  );
};

export default PastContestCard;
