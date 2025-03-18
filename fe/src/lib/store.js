import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "./api";

const useStore = create(
  persist(
    (set, get) => ({
      // Auth state
      isAuthenticated: false,
      user: null,
      token: null,

      // Contest data
      leetcodeStats: null,
      codeforcesStats: null,
      codechefStats: null,
      upcomingContests: [],
      pastContests: [],
      bookmarkedContests: [],

      // UI state
      platformFilter: "all", // 'all', 'leetcode', 'codeforces', 'codechef'
      showBookmarked: false,

      // Auth actions
      login: async (email, password) => {
        try {
          const response = await api.post("/auth/login", { email, password });
          const { token, user } = response.data;

          set({
            isAuthenticated: true,
            token,
            user,
          });

          // Set token for API calls
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Login failed",
          };
        }
      },

      register: async (name, email, password) => {
        try {
          const response = await api.post("/auth/register", { name, email, password });
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Registration failed",
          };
        }
      },

      logout: () => {
        // Clear auth header
        delete api.defaults.headers.common["Authorization"];

        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      },

      // User actions
      updateUsernames: async (leetcodeUsername, codeforcesUsername, codechefUsername) => {
        try {
          const response = await api.post("/user/update", {
            leetcodeUsername,
            codeforcesUsername,
            codechefUsername,
          });

          set({
            user: {
              ...get().user,
              leetcodeUsername,
              codeforcesUsername,
              codechefUsername,
            },
          });

          // Fetch stats after updating usernames
          get().fetchAllStats();

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Failed to update usernames",
          };
        }
      },

      // Stats and contests actions
      fetchAllStats: async () => {
        const { user } = get();
        if (!user) return;
        console.log(user);

        try {
          // Fetch stats for all platforms
          const statsPromises = [];

          if (user.leetcode || user.codechef || user.codeforces) {
            statsPromises.push(
              api.post("/stats", { leetcode: user.leetcode, codechef: user.codechef, codeforces: user.codeforces }).then((response) => ({
                leetcodeStats: response.data,
              }))
            );
          }

          // Wait for all stats to be fetched
          const statsResults = await Promise.all(statsPromises);
          const newStats = statsResults.reduce((acc, result) => ({ ...acc, ...result }), {});

          set(newStats);
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      },

      fetchContests: async () => {
        const { user } = get();
        if (!user) return;

        try {
          const [upcomingResponse, pastResponse] = await Promise.all([
            api.get("/contests/upcoming"),
            api.post("/contests/past", {leetcode, codechef, codeforces}),
          ]);

          set({
            upcomingContests: upcomingResponse.data,
            pastContests: pastResponse.data,
          });
        } catch (error) {
          console.error("Error fetching contests:", error);
        }
      },

      toggleBookmark: async (contestId) => {
        try {
          await api.post("/contests/bookmark", { contestId });

          // Update local bookmarks
          const { bookmarkedContests } = get();
          const isBookmarked = bookmarkedContests.includes(contestId);

          set({
            bookmarkedContests: isBookmarked
              ? bookmarkedContests.filter((id) => id !== contestId)
              : [...bookmarkedContests, contestId],
          });

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Failed to bookmark contest",
          };
        }
      },

      addSolutionLink: async (contestId, platform, youtubeLink) => {
        try {
          await api.post("/solutions", { contestId, platform, youtubeLink });
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Failed to add solution link",
          };
        }
      },

      // UI actions
      setPlatformFilter: (platform) => set({ platformFilter: platform }),
      toggleBookmarkedFilter: () => set({ showBookmarked: !get().showBookmarked }),
    }),
    {
      name: "contest-tracker-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
        bookmarkedContests: state.bookmarkedContests,
      }),
    }
  )
);

export { useStore };