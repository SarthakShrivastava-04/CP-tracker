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

          // Save token and user to localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          set({
            isAuthenticated: true,
            token,
            user,
          });

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Login failed",
          };
        }
      },

      register: async (username, email, password) => {
        try {
          const response = await api.post("/auth/register", {
            username,
            email,
            password,
          });
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Registration failed",
          };
        }
      },

      logout: async () => {
        try {
          const response = await api.post("/auth/logout");
          // Clear token and user from localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          // Clear auth header
          delete api.defaults.headers.common["Authorization"];

          set({
            isAuthenticated: false,
            token: null,
            user: null,
          });
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || "Logout failed",
          };
        }
      },

      // Initialize auth state from localStorage on app load
      initializeAuth: async () => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token && user) {
          set({
            isAuthenticated: true,
            token,
            user,
          });

          // Set token for API calls
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      },

      // User actions
      updateUsernames: async (leetcode, codeforces, codechef) => {
        try {
          const response = await api.post("/user/update", {
            leetcode,
            codeforces,
            codechef,
          });

          // Update the user object in the store
          const updatedUser = {
            ...get().user,
            leetcode,
            codeforces,
            codechef,
          };

          // Save updated user to localStorage
          localStorage.setItem("user", JSON.stringify(updatedUser));

          set({
            user: updatedUser,
          });

          // Fetch stats after updating usernames
          get().fetchAllStats();

          return { success: true };
        } catch (error) {
          return {
            success: false,
            error:
              error.response?.data?.message || "Failed to update usernames",
          };
        }
      },

      // Stats and contests actions
      fetchAllStats: async () => {
        const { user } = get();
        if (!user) return;
        console.log("Fetching stats for user:", user);
        try {
          // Fetch stats for all platforms
          const response = await api.post("/user/stats", {
            lcId: user.leetcode,
            ccId: user.codechef,
            cfId: user.codeforces,
          });
          console.log("Stats response:", response.data);
          set({
            leetcodeStats: response.data.leetcodeStats,
            codechefStats: response.data.codechefStats,
            codeforcesStats: response.data.codeforcesStats,
          });
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      },

      fetchContests: async () => {
        const { user } = get();
        if (!user) return;
        console.log("Fetching contests for user:", user);
        try {
          const [upcomingResponse, pastResponse] = await Promise.all([
            api.get("/contests/upcoming"),
            api.post("/contests/past", {
              lcId: user.leetcode,
              ccId: user.codechef,
              cfId: user.codeforces,
            }),
          ]);
          console.log(
            "Contests response:",
            upcomingResponse.data,
            pastResponse.data
          );
          set({
            upcomingContests: upcomingResponse.data,
            pastContests: pastResponse.data,
          });
        } catch (error) {
          console.error("Error fetching contests:", error);
        }
      },

      // Bookmark actions
      bookmarkContest: async (contest) => {
        console.log("Bookmarking contest:", contest);
        try {
          // Destructure contest properties and rename newRating to rating
          const {
            contestName,
            newRating: rating,
            rank,
            platform,
            contestDate,
            contestTime,
          } = contest;

          // Get userId from the store
          const userId = get().user.id;

          // Make the API request
          const response = await api.post("/contests/bookmark", {
            userId,
            contestName,
            rating,
            rank,
            platform,
            contestDate,
            contestTime,
          });

          // Update local bookmarked contests
          const { bookmarkedContests } = get();
          const isBookmarked = bookmarkedContests.some(
            (c) => c.contestName === contestName && c.userId === userId
          );

          if (isBookmarked) {
            // Remove from bookmarked contests
            set({
              bookmarkedContests: bookmarkedContests.filter(
                (c) => c.contestName !== contestName || c.userId !== userId
              ),
            });
          } else {
            // Add to bookmarked contests
            set({
              bookmarkedContests: [...bookmarkedContests, response.data],
            });
          }
          console.log("Updated bookmarkedContests:", get().bookmarkedContests);
          return { success: true, data: response.data };
        } catch (error) {
          return {
            success: false,
            error:
              error.response?.data?.message || "Failed to bookmark contest",
          };
        }
      },

      fetchBookmarkedContests: async (userId) => {
        console.log("Fetching bookmarked contests for user:", userId);
        try {
          const response = await api.get(`/contests/bookmarked/${userId}`);
          set({
            bookmarkedContests: response.data,
          });
          return { success: true, data: response.data };
        } catch (error) {
          return {
            success: false,
            error:
              error.response?.data?.message ||
              "Failed to fetch bookmarked contests",
          };
        }
      },

      // UI actions
      setPlatformFilter: (platform) => set({ platformFilter: platform }),
      toggleBookmarkedFilter: () =>
        set({ showBookmarked: !get().showBookmarked }),
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
