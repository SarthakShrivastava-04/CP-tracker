import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BookmarkIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useStore } from "../../lib/store";

const PastContestCard = ({ contest }) => {
  const { bookmarkedContests, bookmarkContest, user } = useStore();

  const isBookmarked = bookmarkedContests.some(
    (c) => c.contestName === contest.contestName && c.userId === user.id
  );

  // Handle bookmark click
  const handleBookmarkClick = async () => {
    try {
      const response = await bookmarkContest(contest);
      if (response.success) {
        console.log("Bookmark status updated successfully");
      } else {
        console.error("Failed to update bookmark status:", response.error);
      }
    } catch (error) {
      console.error("Error updating bookmark status:", error);
    }
  };

  // Platform logos (replace with actual image paths or URLs)
  const platformLogos = {
    LeetCode: "/leetcode.svg",
    CodeChef: "/codechef.svg",
    Codeforces: "/codeforces.svg",
  };

  return (
    <Card className="w-full flex-row items-center p-4 gap-4 hover:shadow-lg transition-shadow duration-300  dark:bg-zinc-800 bg-zinc-100 border-zinc-200 dark:border-zinc-700">
      {/* Platform Logo */}
      <div className="w-16 h-16 flex-shrink-0">
        <img
          src={platformLogos[contest.platform]}
          alt={contest.platform}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contest Details */}
      <div className="flex-grow">
        <CardHeader className="p-0">
          <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">
            <span className="text-zinc-900 dark:text-white">{contest.platform}</span> -{" "}
            {contest.contestName}
          </CardTitle>
          <CardDescription className="text-zinc-600 dark:text-zinc-400">
            Date & Time: {contest.contestDate} {contest.contestTime}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 mt-2 space-y-1">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <span className="font-medium">Rank:</span> {contest.rank}
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <span className="font-medium">Rating:</span> {contest.rating}
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <span className="font-medium">Created At:</span>{" "}
            {new Date(contest.createdAt).toLocaleString()}
          </p>
        </CardContent>
      </div>

      {/* Actions (Bookmark and Visit Link) */}
      <div className="flex flex-col items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBookmarkClick}
          className={`${
            isBookmarked ? "text-yellow-500" : "text-zinc-500 dark:text-zinc-400"
          } hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors duration-300`}
        >
          <BookmarkIcon className="h-5 w-5" />
        </Button>
        {/* <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-zinc-900 dark:text-white hover:underline"
        >
          Visit <ExternalLinkIcon className="h-4 w-4 ml-1" />
        </a> */}
      </div>
    </Card>
  );
};

export default PastContestCard;