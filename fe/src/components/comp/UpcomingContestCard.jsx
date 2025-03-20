import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ExternalLinkIcon } from "lucide-react";
import { useStore } from "../../lib/store";

const UpcomingContestCard = ({ contest }) => {
  // Platform logos (replace with actual image paths or URLs)
  const platformLogos = {
    LeetCode: "/leetcode.svg",
    CodeChef: "/codechef.svg",
    Codeforces: "/codeforces.svg",
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
            {contest.name}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Date & Time: {contest.startDate} {contest.startTime}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 mt-2 space-y-1">
          <p className="text-sm">
            <span className="font-medium">Duration:</span> {contest.duration}
          </p>
        </CardContent>
      </div>

      {/* Actions (Visit Link) */}
      <div className="flex flex-col items-end gap-2">
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

export default UpcomingContestCard;