import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useStore } from "./lib/store";
import Navbar from "./components/comp/Navbar";
import Footer from "./components/comp/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserForm from "./pages/UserForm";
import LandingPage from "./pages/LandingPage"; // Import the Landing Page
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./lib/Theme-provider";
import { useState, useEffect } from "react";

function App() {
  const { isAuthenticated, user, initializeAuth } = useStore();
  const [loading, setLoading] = useState(true); // Add loading state

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    const initialize = async () => {
      await initializeAuth(); // Wait for initialization to complete
      setLoading(false); // Set loading to false after initialization
    };

    initialize();
  }, [initializeAuth]);

  // Check if user has provided platform usernames
  const hasProvidedUsernames = () => {
    return user && user.leetcode && user.codeforces && user.codechef;
  };

  // Debugging
  useEffect(() => {
    console.log("User:", user);
    console.log("isauthenticated:", isAuthenticated);
  }, [user]);

  // Show a loading spinner while initializing
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <div className="flex flex-col min-h-screen w-screen bg-background text-foreground">
          {/* Navbar */}
          <Navbar />
  
          {/* Main Content */}
          <main className="flex-1">
            <Routes>
            <Route
                path="/"
                element={<LandingPage />}
              />
              {/* Dashboard Route */}
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    hasProvidedUsernames() ? (
                      <Dashboard />
                    ) : (
                      <UserForm />
                    )
                  ) : (
                    <Login />
                  )
                }
              />

              {/* Login Route */}
              <Route
                path="/login"
                element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
              />

              {/* Register Route */}
              <Route
                path="/register"
                element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
              />

              {/* User Form Route */}
              <Route
                path="/user-form"
                element={
                  isAuthenticated ? <UserForm /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Toaster for Notifications */}
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;