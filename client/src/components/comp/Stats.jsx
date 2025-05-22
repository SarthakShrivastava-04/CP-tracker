import { motion } from "framer-motion";

const platformLogos = {
  leetcode: "/leetcode.svg",
  codeforces: "/codeforces.svg",
  codechef: "/codechef.svg",
};

const platformStyles = {
  leetcode: {
    gradient: "bg-gradient-to-br from-yellow-300 to-yellow-500",
    textColor: "text-black",
    bgColor: "bg-yellow-100",
  },
  codeforces: {
    gradient: "bg-gradient-to-br from-gray-700 to-gray-700",
    textColor: "text-blue-200",
    bgColor: "bg-gray-800",
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

  const filteredStats = stats
    ? Object.entries(stats).filter(([key]) => {
        if (title.toLowerCase() === "leetcode" && key === "reputation")
          return false;
        if (title.toLowerCase() === "codechef" && key === "problemsSolved")
          return false;
        if (key === "platform" || key === "username") return false;
        return true;
      })
    : null;

  return (
    <motion.div
      className={`p-3 rounded-md shadow-md ${platform.gradient} ${platform.textColor} w-[320px] mx-auto font-sans text-sm`}
      whileHover={{ scale: 1.03 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-base font-semibold">
        {logo && (
          <img src={logo} alt={title} className="w-6 h-6 object-contain" />
        )}
        <span>{title}</span>
      </div>
      <p className="text-sm font-mono mt-1">
        {username ? `@${username}` : "No username"}
      </p>

      {/* Stats */}
      <div className="mt-3 space-y-1">
        {loading ? (
          <p className="animate-pulse text-base">Loading stats...</p>
        ) : filteredStats ? (
          filteredStats.map(([key, value]) => (
            <div
              key={key}
              className={`flex justify-between ${platform.bgColor} p-1.5 rounded shadow-sm text-xs font-medium`}
            >
              <span className="capitalize ">
                {key.replace(/([A-Z])/g, " $1")}:
              </span>
              <span className="font-medium">{value || "N/A"}</span>
            </div>
          ))
        ) : (
          <p className="text-xs">No stats available</p>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
