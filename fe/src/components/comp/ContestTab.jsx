// import { useState, useEffect } from "react";
// import { useStore } from "../../lib/store";
// import { Button } from "../ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { BookmarkIcon, ExternalLinkIcon, YoutubeIcon } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { toast } from "sonner";

// const ContestTabs = ({ type }) => {
//   const {
//     upcomingContests,
//     pastContests,
//     bookmarkedContests,
//     platformFilter,
//     showBookmarked,
//     setPlatformFilter,
//     toggleBookmarkedFilter,
//     toggleBookmark,
//     addSolutionLink,
//   } = useStore();

//   const [filteredContests, setFilteredContests] = useState([]);
//   const [youtubeLink, setYoutubeLink] = useState("");
//   const [selectedContest, setSelectedContest] = useState(null);

//   useEffect(() => {
//     // Get the appropriate contest list based on type
//     const contests = type === "upcoming" ? upcomingContests : pastContests;

//     // Apply filters
//     let filtered = contests;

//     // Filter by platform
//     if (platformFilter !== "all") {
//       filtered = filtered.filter(
//         (contest) =>
//           contest.platform.toLowerCase() === platformFilter.toLowerCase()
//       );
//     }

//     // Filter bookmarked contests
//     if (showBookmarked) {
//       filtered = filtered.filter((contest) =>
//         bookmarkedContests.includes(contest.id)
//       );
//     }

//     setFilteredContests(filtered);
//   }, [
//     type,
//     upcomingContests,
//     pastContests,
//     platformFilter,
//     showBookmarked,
//     bookmarkedContests,
//   ]);

//   const handleBookmark = async (contestId) => {
//     const result = await toggleBookmark(contestId);

//     if (!result.success) {
//       toast({
//         variant: "destructive",
//         title: "Failed to bookmark",
//         description: result.error,
//       });
//     }
//   };

//   const handleAddSolution = async () => {
//     if (!selectedContest || !youtubeLink) return;

//     const result = await addSolutionLink(
//       selectedContest.id,
//       selectedContest.platform,
//       youtubeLink
//     );

//     if (result.success) {
//       toast({
//         title: "Solution added",
//         description: "YouTube link has been added to the contest.",
//       });
//       setYoutubeLink("");
//       setSelectedContest(null);
//     } else {
//       toast({
//         variant: "destructive",
//         title: "Failed to add solution",
//         description: result.error,
//       });
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const options = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Calculate time remaining for upcoming contests
//   const getTimeRemaining = (startTime) => {
//     const now = new Date();
//     const start = new Date(startTime);
//     const diff = start - now;

//     if (diff <= 0) return "Started";

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//     return `${days}d ${hours}h ${minutes}m`;
//   };

//   // Platform badge color
//   const getPlatformColor = (platform) => {
//     switch (platform.toLowerCase()) {
//       case "leetcode":
//         return "bg-yellow-500 hover:bg-yellow-600";
//       case "codeforces":
//         return "bg-red-500 hover:bg-red-600";
//       case "codechef":
//         return "bg-green-500 hover:bg-green-600";
//       default:
//         return "bg-primary hover:bg-primary/90";
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-wrap gap-2 justify-between">
//         <div className="flex flex-wrap gap-2">
//           <Button
//             variant={platformFilter === "all" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setPlatformFilter("all")}
//           >
//             All
//           </Button>
//           <Button
//             variant={platformFilter === "leetcode" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setPlatformFilter("leetcode")}
//           >
//             LeetCode
//           </Button>
//           <Button
//             variant={platformFilter === "codeforces" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setPlatformFilter("codeforces")}
//           >
//             Codeforces
//           </Button>
//           <Button
//             variant={platformFilter === "codechef" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setPlatformFilter("codechef")}
//           >
//             CodeChef
//           </Button>
//         </div>
//         <Button
//           variant={showBookmarked ? "default" : "outline"}
//           size="sm"
//           onClick={toggleBookmarkedFilter}
//         >
//           <BookmarkIcon className="h-4 w-4 mr-2" />
//           Bookmarked
//         </Button>
//       </div>

//       {filteredContests.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-muted-foreground">No contests found</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredContests.map((contest) => (
//             <Card key={contest.id} className="flex flex-col h-full">
//               <CardHeader className="pb-2">
//                 <div className="flex justify-between items-start">
//                   <Badge className={getPlatformColor(contest.platform)}>
//                     {contest.platform}
//                   </Badge>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => handleBookmark(contest.id)}
//                     className={
//                       bookmarkedContests.includes(contest.id)
//                         ? "text-yellow-500"
//                         : ""
//                     }
//                   >
//                     <BookmarkIcon className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <CardTitle className="text-lg mt-2">{contest.name}</CardTitle>
//                 <CardDescription>
//                   {type === "upcoming" ? (
//                     <>
//                       Starts: {formatDate(contest.startTime)}
//                       <br />
//                       Time Remaining: {getTimeRemaining(contest.startTime)}
//                     </>
//                   ) : (
//                     <>Date: {formatDate(contest.startTime)}</>
//                   )}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="flex-grow">
//                 {contest.description && (
//                   <p className="text-sm text-muted-foreground">
//                     {contest.description.length > 100
//                       ? `${contest.description.substring(0, 100)}...`
//                       : contest.description}
//                   </p>
//                 )}
//               </CardContent>
//               <CardFooter className="flex justify-between pt-2">
//                 <a
//                   href={contest.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center text-sm text-primary hover:underline"
//                 >
//                   Visit <ExternalLinkIcon className="h-3 w-3 ml-1" />
//                 </a>

//                 {type === "past" && (
//                   <Dialog>
//                     <DialogTrigger asChild>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setSelectedContest(contest)}
//                       >
//                         <YoutubeIcon className="h-4 w-4 mr-2" />
//                         Add Solution
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>Add YouTube Solution</DialogTitle>
//                         <DialogDescription>
//                           Add a YouTube solution link for{" "}
//                           {selectedContest?.name}
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="space-y-4 py-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="youtube-link">YouTube Link</Label>
//                           <Input
//                             id="youtube-link"
//                             placeholder="https://youtube.com/watch?v=..."
//                             value={youtubeLink}
//                             onChange={(e) => setYoutubeLink(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <DialogFooter>
//                         <Button onClick={handleAddSolution}>Save</Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>
//                 )}
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContestTabs;


// import { useState, useEffect } from "react";
// import { useStore } from "../../lib/store";
// import { Button } from "../ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { BookmarkIcon, ExternalLinkIcon, YoutubeIcon } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";

// const ContestTabs = ({ type }) => {
//   const {
//     upcomingContests,
//     pastContests,
//     bookmarkedContests,
//     platformFilter,
//     showBookmarked,
//     setPlatformFilter,
//     toggleBookmarkedFilter,
//     toggleBookmark,
//     addSolutionLink,
//     fetchContests,
//     fetchAllStats,
//   } = useStore();

//   const [filteredContests, setFilteredContests] = useState([]);
//   const [youtubeLink, setYoutubeLink] = useState("");
//   const [selectedContest, setSelectedContest] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch contests and stats on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         await fetchContests();
//         await fetchAllStats();
//       } catch (error) {
//         toast({
//           variant: "destructive",
//           title: "Error fetching data",
//           description: error.message,
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [fetchContests, fetchAllStats]);

//   // Filter contests based on platform and bookmarks
//   useEffect(() => {
//     const contests = type === "upcoming" ? upcomingContests : pastContests;

//     let filtered = contests;

//     // Filter by platform
//     if (platformFilter !== "all") {
//       filtered = filtered.filter(
//         (contest) =>
//           contest.platform.toLowerCase() === platformFilter.toLowerCase()
//       );
//     }

//     // Filter bookmarked contests
//     if (showBookmarked) {
//       filtered = filtered.filter((contest) =>
//         bookmarkedContests.includes(contest.id)
//       );
//     }

//     setFilteredContests(filtered);
//   }, [
//     type,
//     upcomingContests,
//     pastContests,
//     platformFilter,
//     showBookmarked,
//     bookmarkedContests,
//   ]);

//   const handleBookmark = async (contestId) => {
//     const result = await toggleBookmark(contestId);

//     if (!result.success) {
//       toast({
//         variant: "destructive",
//         title: "Failed to bookmark",
//         description: result.error,
//       });
//     }
//   };

//   const handleAddSolution = async () => {
//     if (!selectedContest || !youtubeLink) return;

//     const result = await addSolutionLink(
//       selectedContest.id,
//       selectedContest.platform,
//       youtubeLink
//     );

//     if (result.success) {
//       toast({
//         title: "Solution added",
//         description: "YouTube link has been added to the contest.",
//       });
//       setYoutubeLink("");
//       setSelectedContest(null);
//     } else {
//       toast({
//         variant: "destructive",
//         title: "Failed to add solution",
//         description: result.error,
//       });
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const options = {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Calculate time remaining for upcoming contests
//   const getTimeRemaining = (startTime) => {
//     const now = new Date();
//     const start = new Date(startTime);
//     const diff = start - now;

//     if (diff <= 0) return "Started";

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//     return `${days}d ${hours}h ${minutes}m`;
//   };

//   // Platform badge color
//   const getPlatformColor = (platform) => {
//     switch (platform.toLowerCase()) {
//       case "leetcode":
//         return "bg-yellow-500 hover:bg-yellow-600";
//       case "codeforces":
//         return "bg-red-500 hover:bg-red-600";
//       case "codechef":
//         return "bg-green-500 hover:bg-green-600";
//       default:
//         return "bg-primary hover:bg-primary/90";
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-wrap gap-2 justify-between">
//         <div className="flex flex-wrap gap-2">
//           <Button
//             variant={platformFilter === "all" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setPlatformFilter("all")}
//           >
//             All
//           </Button>
//           <Button
//             variant={platformFilter === "leetcode" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setPlatformFilter("leetcode")}
//           >
//             LeetCode
//           </Button>
//           <Button
//             variant={platformFilter === "codeforces" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setPlatformFilter("codeforces")}
//           >
//             Codeforces
//           </Button>
//           <Button
//             variant={platformFilter === "codechef" ? "default" : "outline"}
//             size="sm"
//             onClick={() => setPlatformFilter("codechef")}
//           >
//             CodeChef
//           </Button>
//         </div>
//         <Button
//           variant={showBookmarked ? "default" : "outline"}
//           size="sm"
//           onClick={toggleBookmarkedFilter}
//         >
//           <BookmarkIcon className="h-4 w-4 mr-2" />
//           Bookmarked
//         </Button>
//       </div>

//       {filteredContests.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-muted-foreground">No contests found</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredContests.map((contest) => (
//             <Card key={contest.id} className="flex flex-col h-full">
//               <CardHeader className="pb-2">
//                 <div className="flex justify-between items-start">
//                   <Badge className={getPlatformColor(contest.platform)}>
//                     {contest.platform}
//                   </Badge>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => handleBookmark(contest.id)}
//                     className={
//                       bookmarkedContests.includes(contest.id)
//                         ? "text-yellow-500"
//                         : ""
//                     }
//                   >
//                     <BookmarkIcon className="h-4 w-4" />
//                   </Button>
//                 </div>
//                 <CardTitle className="text-lg mt-2">{contest.name}</CardTitle>
//                 <CardDescription>
//                   {type === "upcoming" ? (
//                     <>
//                       Starts: {formatDate(contest.startTime)}
//                       <br />
//                       Time Remaining: {getTimeRemaining(contest.startTime)}
//                     </>
//                   ) : (
//                     <>Date: {formatDate(contest.startTime)}</>
//                   )}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="flex-grow">
//                 {contest.description && (
//                   <p className="text-sm text-muted-foreground">
//                     {contest.description.length > 100
//                       ? `${contest.description.substring(0, 100)}...`
//                       : contest.description}
//                   </p>
//                 )}
//               </CardContent>
//               <CardFooter className="flex justify-between pt-2">
//                 <a
//                   href={contest.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center text-sm text-primary hover:underline"
//                 >
//                   Visit <ExternalLinkIcon className="h-3 w-3 ml-1" />
//                 </a>

//                 {type === "past" && (
//                   <Dialog>
//                     <DialogTrigger asChild>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setSelectedContest(contest)}
//                       >
//                         <YoutubeIcon className="h-4 w-4 mr-2" />
//                         Add Solution
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>Add YouTube Solution</DialogTitle>
//                         <DialogDescription>
//                           Add a YouTube solution link for{" "}
//                           {selectedContest?.name}
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="space-y-4 py-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="youtube-link">YouTube Link</Label>
//                           <Input
//                             id="youtube-link"
//                             placeholder="https://youtube.com/watch?v=..."
//                             value={youtubeLink}
//                             onChange={(e) => setYoutubeLink(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <DialogFooter>
//                         <Button onClick={handleAddSolution}>Save</Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>
//                 )}
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContestTabs;