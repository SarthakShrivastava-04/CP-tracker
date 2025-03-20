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

const PastContestCard = ({ contest, onBookmark }) => {
  const { bookmarkedContests } = useStore();

  const platformLogos = {
    LeetCode: "/leetcode.svg",
    CodeChef: "/codechef.svg",
    Codeforces: "/code-forces.svg",
  };

  return (
    <Card className="w-full flex-row items-center p-4 gap-4 hover:shadow-lg transition-shadow duration-300">
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
          <CardTitle className="text-xl font-bold">
            <span className="text-primary">{contest.platform}</span> -{" "}
            {contest.contestName}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Date & Time: {contest.contestDate} {contest.contestTime}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 mt-2 space-y-1">
          <p className="text-sm">
            <span className="font-medium">Rank:</span> {contest.rank}
          </p>
          <p className="text-sm">
            <span className="font-medium">New Rating:</span> {contest.newRating}
          </p>
        </CardContent>
      </div>

      {/* Actions (Bookmark and Visit Link) */}
      <div className="flex flex-col items-end gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBookmark(contest)}
          className={
            bookmarkedContests.includes(contest.id)
              ? "text-yellow-500"
              : "text-muted-foreground"
          }
        >
          <BookmarkIcon className="h-5 w-5" />
        </Button>
        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-primary hover:underline"
        >
          Visit <ExternalLinkIcon className="h-4 w-4 ml-1" />
        </a>
      </div>
    </Card>
  );
};

export default PastContestCard;