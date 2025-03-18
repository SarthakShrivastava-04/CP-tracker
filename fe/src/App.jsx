import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "./lib/store";
import Navbar from "./components/comp/Navbar";
import Footer from "./components/comp/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserForm from "./pages/UserForm";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./lib/Theme-provider";
import { User } from "lucide-react";

function App() {
  const { isAuthenticated, user } = useStore();

  // Check if user has provided platform usernames
  const hasProvidedUsernames = () => {
    return user && user.leetcodeUsername && user.codeforcesUsername && user.codechefUsername;
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <div className="flex flex-col min-h-screen w-screen bg-background text-foreground">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-6">
            <Routes>
              {/* Home Route */}
              <Route
                path="/"
                // element={
                //   isAuthenticated ? (
                //     hasProvidedUsernames() ? (
                //       <Dashboard />
                //     ) : (
                //       <UserForm />
                //     )
                //   ) : (
                //     <Navigate to="/login" />
                //   )
                // }
                element={ <Dashboard/>}
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
                // element={isAuthenticated ? <UserForm /> : <Navigate to="/login" />}
               element={ <UserForm/>}
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