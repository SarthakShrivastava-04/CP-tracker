const dummyData = {
    user: {
      id: "user_123",
      username: "savvysailor",
      codeforces: "Savvy_CF",
      leetcode: "Savvy_LC",
      codechef: "Savvy_CC",
    },
  
    stats: {
      leetcode: {
        rating: 1800,
        problemsSolved: 250,
        contestRank: 320,
      },
      codeforces: {
        rating: 1900,
        maxRating: 2000,
        contestsParticipated: 50,
      },
      codechef: {
        rating: 1700,
        stars: 4,
        globalRank: 2500,
      },
    },
  
    pastContests: [
      {
        id: "cf_789",
        platform: "Codeforces",
        name: "Codeforces Round #789",
        date: "2024-02-15",
        link: "https://codeforces.com/contest/789",
        solutionLink: "https://youtu.be/solution_CF_789",
      },
      {
        id: "lc_weekly_123",
        platform: "LeetCode",
        name: "LeetCode Weekly Contest 123",
        date: "2024-03-01",
        link: "https://leetcode.com/contest/weekly-contest-123",
        solutionLink: null,
      },
    ],
  
    upcomingContests: [
      {
        id: "cf_900",
        platform: "Codeforces",
        name: "Codeforces Round #900",
        date: "2024-04-01",
        timeRemaining: "10 days",
        link: "https://codeforces.com/contest/900",
      },
      {
        id: "cc_april_cookoff",
        platform: "CodeChef",
        name: "CodeChef April Cook-Off",
        date: "2024-04-05",
        timeRemaining: "14 days",
        link: "https://www.codechef.com/COOKAPR24",
      },
    ],
  
    bookmarks: ["cf_789", "lc_weekly_123"], // Bookmarked contest IDs
  };
  
  export default dummyData;
  