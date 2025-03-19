import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "./api";
import { loginapi } from "./api";

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
          const response = await loginapi.post("/auth/login", { email, password });
          const { token, user } = response.data;
          console.log("Login response:", response.data);

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
            error: error.response?.data?.message || "Failed to update usernames",
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
            lcId : user.leetcode,
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
          console.log("Contests response:", upcomingResponse.data, pastResponse.data);
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