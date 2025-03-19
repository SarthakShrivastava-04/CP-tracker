// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Skeleton } from "../ui/skeleton";
// import { Trophy, Award, Star } from "lucide-react";

// const StatsCard = ({ title, username, stats, loading }) => {
//   // Platform-specific rendering
//   const renderStats = () => {
//     if (loading) {
//       return (
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-3/4" />
//           <Skeleton className="h-4 w-1/2" />
//         </div>
//       );
//     }

//     if (!stats) {
//       return <p className="text-muted-foreground">No stats available</p>;
//     }

//     switch (title.toLowerCase()) {
//       case "leetcode":
//         return (
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Max rating:</span>
//               <span className="font-medium">{stats.maxRating || "N/A"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Problems Solved:</span>
//               <span className="font-medium">{stats.problemsSolved || 0}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Current Rating:</span>
//               <span className="font-medium">
//                 {stats.currentRating || "N/A"}
//               </span>
//             </div>
//           </div>
//         );
//       case "codeforces":
//         return (
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Rating:</span>
//               <span className="font-medium">{stats.rating || "N/A"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Rank:</span>
//               <span className="font-medium">{stats.rank || "N/A"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Max Rating:</span>
//               <span className="font-medium">{stats.maxRating || "N/A"}</span>
//             </div>
//           </div>
//         );
//       case "codechef":
//         return (
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Rating:</span>
//               <span className="font-medium">{stats.rating || "N/A"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Stars:</span>
//               <span className="font-medium">{stats.stars || "N/A"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Global Rank:</span>
//               <span className="font-medium">{stats.globalRank || "N/A"}</span>
//             </div>
//           </div>
//         );
//       default:
//         return <p className="text-muted-foreground">No stats available</p>;
//     }
//   };

//   // Platform-specific icon
//   const renderIcon = () => {
//     switch (title.toLowerCase()) {
//       case "leetcode":
//         return <Trophy className="h-5 w-5" />;
//       case "codeforces":
//         return <Award className="h-5 w-5" />;
//       case "codechef":
//         return <Star className="h-5 w-5" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Card className="h-[25vh] overflow-auto">
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-xl flex items-center gap-2">
//             {renderIcon()}
//             {title}
//           </CardTitle>
//         </div>
//         <CardDescription>
//           {username ? `@${username}` : "No username provided"}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>{renderStats()}</CardContent>
//     </Card>
//   );
// };

// export default StatsCard;


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Trophy, Award, Star } from "lucide-react";

const StatsCard = ({ title, username, stats, loading }) => {
  const platformColors = {
    LeetCode: "bg-yellow-300 text-black border-yellow-500",
    CodeForces: "bg-blue-300 text-black border-blue-500",
    CodeChef: "bg-purple-300 text-black border-purple-500",
  };

  const renderIcon = () => {
    switch (title) {
      case "LeetCode":
        return <Trophy className="h-6 w-6 text-yellow-600" />;
      case "CodeForces":
        return <Award className="h-6 w-6 text-blue-600" />;
      case "CodeChef":
        return <Star className="h-6 w-6 text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <Card
      className={`p-4 border-4 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 ${platformColors[title]}`}
    >
      <CardHeader className="flex items-center gap-3">
        {renderIcon()}
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-lg space-y-2">
        <p className="font-semibold">@{username}</p>
        <p>🏆 Max Rating: <span className="font-bold">{stats.currentRating || "N/A"}</span></p>
        <p>📈 Current Rating: <span className="font-bold">{stats.currentRating || "N/A"}</span></p> 
        <p>💡 Problems Solved: <span className="font-bold">{stats.problemsSolved || "N/A"}</span></p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;


// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Skeleton } from "../ui/skeleton";
// import { Trophy, Award, Star, User } from "lucide-react";

// const StatsCard = ({ title, username, stats, loading }) => {
//   // Platform-specific rendering
//   const renderStats = () => {
//     if (loading) {
//       return (
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-3/4" />
//           <Skeleton className="h-4 w-1/2" />
//         </div>
//       );
//     }

//     if (!stats) {
//       return <p className="text-muted-foreground">No stats available</p>;
//     }

//     switch (title.toLowerCase()) {
//       case "leetcode":
//         return (
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Max Rating:</span>
//               <span className="font-medium">{stats.maxRating || "N/A"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Problems Solved:</span>
//               <span className="font-medium">{stats.problemsSolved || 0}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Current Rating:</span>
//               <span className="font-medium">
//                 {stats.currentRating || "N/A"}
//               </span>
//             </div>
//           </div>
//         );
//       case "codeforces":
//         return (
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Current Rating:</span>
//               <span className="font-medium">{stats.currentRating || "N/A"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Max Rating:</span>
//               <span className="font-medium">{stats.maxRating || "N/A"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Problems Solved:</span>
//               <span className="font-medium">{stats.problemsSolved || 0}</span>
//             </div>
//           </div>
//         );
//       case "codechef":
//         return (
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Current Rating:</span>
//               <span className="font-medium">{stats.currentRating || "N/A"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Max Rating:</span>
//               <span className="font-medium">{stats.maxRating || "N/A"}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Reputation:</span>
//               <span className="font-medium">{stats.reputation || "N/A"}</span>
//             </div>
//           </div>
//         );
//       default:
//         return <p className="text-muted-foreground">No stats available</p>;
//     }
//   };

//   // Platform-specific icon and gradient
//   const renderPlatformStyle = () => {
//     switch (title.toLowerCase()) {
//       case "leetcode":
//         return {
//           icon: <Trophy className="h-6 w-6 text-yellow-500" />,
//           gradient: "from-yellow-400 to-yellow-600",
//         };
//       case "codeforces":
//         return {
//           icon: <Award className="h-6 w-6 text-blue-500" />,
//           gradient: "from-blue-400 to-blue-600",
//         };
//       case "codechef":
//         return {
//           icon: <Star className="h-6 w-6 text-green-500" />,
//           gradient: "from-green-400 to-green-600",
//         };
//       default:
//         return {
//           icon: <User className="h-6 w-6 text-gray-500" />,
//           gradient: "from-gray-400 to-gray-600",
//         };
//     }
//   };

//   const platformStyle = renderPlatformStyle();

//   return (
//     <Card
//       className={`h-[25vh] overflow-auto bg-gradient-to-br ${platformStyle.gradient} shadow-lg hover:shadow-xl transition-shadow duration-300`}
//     >
//       <CardHeader className="pb-2">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-xl flex items-center gap-2 text-white">
//             {platformStyle.icon}
//             {title}
//           </CardTitle>
//         </div>
//         <CardDescription className="text-white/80">
//           {username ? `@${username}` : "No username provided"}
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="text-white">
//         {renderStats()}
//       </CardContent>
//     </Card>
//   );
// };

// export default StatsCard;

// import { motion } from "framer-motion";

// const platformStyles = {
//   leetcode: { emoji: "🏆", gradient: "bg-gradient-to-br from-yellow-300 to-yellow-500" },
//   codeforces: { emoji: "🎖️", gradient: "bg-gradient-to-br from-blue-300 to-blue-500" },
//   codechef: { emoji: "⭐", gradient: "bg-gradient-to-br from-green-300 to-green-500" },
//   default: { emoji: "👤", gradient: "bg-gradient-to-br from-gray-300 to-gray-500" },
// };

// const StatsCard = ({ title, username, stats, loading }) => {
//   const platform = platformStyles[title.toLowerCase()] || platformStyles.default;

//   return (
//     <motion.div
//       className={`p-5 rounded-2xl shadow-xl ${platform.gradient} text-white w-[250px] sm:w-[300px] mx-auto`}
//       whileHover={{ scale: 1.05 }}
//     >
//       <div className="flex items-center gap-3 text-2xl font-bold">
//         <span className="text-4xl">{platform.emoji}</span>
//         {title}
//       </div>
//       <p className="text-sm text-white/80 mt-1">{username ? `@${username}` : "No username"}</p>
      
//       <div className="mt-3 space-y-2">
//         {loading ? (
//           <p className="animate-pulse text-white/80">Loading stats...</p>
//         ) : stats ? (
//           Object.entries(stats).map(([key, value]) => (
//             <div key={key} className="flex justify-between bg-white/20 p-2 rounded-lg">
//               <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
//               <span className="font-semibold">{value || "N/A"}</span>
//             </div>
//           ))
//         ) : (
//           <p className="text-white/80">No stats available</p>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default StatsCard;
