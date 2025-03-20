import { motion } from "framer-motion";

// SVG logos for platforms
const platformLogos = {
  leetcode: "/leetcode.svg", // Replace with actual path to LeetCode SVG
  codeforces: "/codeforces.svg", // Replace with actual path to Codeforces SVG
  codechef: "/codechef.svg", // Replace with actual path to CodeChef SVG
};

// Platform-specific styles
const platformStyles = {
  leetcode: {
    gradient: "bg-gradient-to-br from-yellow-300 to-yellow-500",
    textColor: "text-black",
    bgColor: "bg-yellow-100",
  },
  codeforces: {
    gradient: "bg-gradient-to-br from-gray-800 to-gray-900",
    textColor: "text-blue-400",
    bgColor: "bg-gray-900",
  },
  codechef: {
    gradient: "bg-[#6D513E]",
    textColor: "text-white",
    bgColor: "bg-[#8F7A69]",
  },
  default: {
    gradient: "bg-gradient-to-br from-gray-300 to-gray-500",
    textColor: "text-white",
    bgColor: "bg-gray-100",
  },
};

const StatsCard = ({ title, username, stats, loading }) => {
  const platform =
    platformStyles[title.toLowerCase()] || platformStyles.default;
  const logo = platformLogos[title.toLowerCase()];

  // Filter out unwanted stats based on the platform
  const filteredStats = stats
    ? Object.entries(stats).filter(([key]) => {
        if (title.toLowerCase() === "leetcode" && key === "reputation")
          return false;
        if (title.toLowerCase() === "codechef" && key === "problemsSolved")
          return false;
        if (key === "platform") return false;
        return true;
      })
    : null;

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg ${platform.gradient} ${platform.textColor} w-[350px] mx-auto font-comic`}
      whileHover={{ scale: 1.05 }}
      style={{ fontFamily: "Comic Sans MS, sans-serif" }}
    >
      {/* Username at the top */}
      <div className="flex items-center gap-3 text-2xl font-bold">
        {/* Platform Logo */}
        {logo && (
          <img src={logo} alt={title} className="w-10 h-10 object-contain" />
        )}
        <span>{title}</span>
      </div>
      <p className="text-sm mt-1">
        {username ? `@${username}` : "No username"}
      </p>

      {/* Stats below username */}
      <div className="mt-4 space-y-2">
        {loading ? (
          <p className="animate-pulse">Loading stats...</p>
        ) : filteredStats ? (
          filteredStats.map(([key, value]) => (
            <div
              key={key}
              className={`flex justify-between ${platform.bgColor} p-2 rounded-md shadow-sm`}
            >
              <span className="capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </span>
              <span className="font-semibold">{value || "N/A"}</span>
            </div>
          ))
        ) : (
          <p>No stats available</p>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
