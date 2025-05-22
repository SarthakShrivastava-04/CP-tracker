import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ExternalLinkIcon } from "lucide-react";

const UpcomingContestCard = ({ contest }) => {
  const platformLogos = {
    LeetCode: "/leetcode.svg",
    CodeChef: "/codechef.svg",
    Codeforces: "/codeforces.svg",
  };

  return (
    <Card className="w-full flex flex-row items-center p-3 gap-0">
      {/* Platform Logo */}
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
            {contest.platform} - {contest.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 mt-1 space-y-0.5 text-sm font-medium flex justify-center gap-4 md:gap-20 text-zinc-700 dark:text-zinc-300">
          <p>
            <span className="font-medium">
              {" "}
              {contest.startDate} - {contest.startTime}
            </span>
          </p>
          <p>
            <span className="font-medium">Duration:</span> {contest.duration}
          </p>
        </CardContent>
      </div>

      {/* Visit Link */}
      <a
        href={contest.url}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start inline-flex items-center text-sm my-auto text-zinc-900 dark:text-white hover:underline"
      >
        Visit <ExternalLinkIcon className="h-4 w-4 ml-1" />
      </a>
    </Card>
  );
};

export default UpcomingContestCard;
