import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../lib/store";
import { Button } from "../ui/Button";
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  XIcon,
  Youtube,
  FileText,
} from "lucide-react";
import { useTheme } from "../../lib/Theme-provider";
import { motion } from "framer-motion";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-[#000C2D]/95 dark:supports-[backdrop-filter]:bg-[#000C2D]/60 shadow-sm"
          : "bg-white dark:bg-[#000C2D]"
      }`}
    >
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xl font-bold text-[#000C2D] dark:text-[#f4f4f5] hover:opacity-80 transition-opacity"
          >
            Contest Tracker
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 mx-auto">
          <motion.a
            href="/"
            className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            Home
          </motion.a>
          <motion.a
            href="/dashboard"
            className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            Dashboard
          </motion.a>
          <motion.a
            href="https://www.youtube.com/@TLE_Eliminators"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors flex items-center gap-1"
            whileHover={{ y: -2 }}
          >
            <Youtube size={16} />
            <span>Solutions</span>
          </motion.a>
          <motion.a
            href="https://www.tle-eliminators.com/cp-sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors flex items-center gap-1"
            whileHover={{ y: -2 }}
          >
            <FileText size={16} />
            <span>CP-31 Sheet</span>
          </motion.a>
          <motion.a
            href="/user-form"
            className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors flex items-center gap-1"
            whileHover={{ y: -2 }}
          >
            
            <span>Update usernames</span>
          </motion.a>
        </div>
        <div className="flex items-center gap-4">
          <div className="border-1 h-6 mx-2 border-zinc-300 dark:border-zinc-600"></div>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <motion.a
                href="#"
                className="flex items-center gap-2 text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                <div className="w-6 h-6 rounded-full bg-[#000C2D] dark:bg-[#f4f4f5] text-[#f4f4f5] dark:text-[#000C2D] flex items-center justify-center text-xs font-medium">
                  {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="font-medium">{user?.username}</span>
              </motion.a>
              <Button
                variant="ghost"
                onClick={logout}
                className="text-[#000C2D] dark:text-[#f4f4f5] hover:bg-[#000C2D]/5 dark:hover:bg-white/10 transition-all"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <motion.a
                href="/login"
                className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                Login
              </motion.a>
              <motion.a
                href="/register"
                className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                Register
              </motion.a>
            </div>
          )}

          <motion.a
            href="#"
            onClick={toggleTheme}
            className="text-[#000C2D] dark:text-[#f4f4f5] hover:bg-[#000C2D]/5 dark:hover:bg-white/10 ml-1 transition-all p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-[#000C2D] dark:text-[#f4f4f5] hover:bg-[#000C2D]/5 dark:hover:bg-white/10 transition-all"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#000C2D] dark:text-[#f4f4f5] hover:bg-[#000C2D]/5 dark:hover:bg-white/10 transition-all"
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t p-4 bg-white dark:bg-[#000C2D] shadow-lg">
          <nav className="flex flex-col space-y-2">
            <motion.a
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              Home
            </motion.a>
            <motion.a
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors"
              whileHover={{ y: -2 }}
            >
              Dashboard
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@TLE_Eliminators"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ y: -2 }}
            >
              <Youtube size={16} />
              <span>Solutions</span>
            </motion.a>
            <motion.a
              href="https://www.tle-eliminators.com/cp-sheet"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors flex items-center gap-2"
              whileHover={{ y: -2 }}
            >
              <FileText size={16} />
              <span>CP-31 Sheet</span>
            </motion.a>

            <div className="border-t my-2 border-zinc-200 dark:border-zinc-700"></div>

            {isAuthenticated ? (
              <>
                <motion.a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors flex items-center gap-2"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-6 h-6 rounded-full bg-[#000C2D] dark:bg-[#f4f4f5] text-[#f4f4f5] dark:text-[#000C2D] flex items-center justify-center text-xs font-medium">
                    {user?.username
                      ? user.username.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <span>Profile</span>
                </motion.a>
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start text-[#000C2D] dark:text-[#f4f4f5] hover:bg-[#000C2D]/5 dark:hover:bg-white/10 transition-all"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <motion.a
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Login
                </motion.a>
                <motion.a
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Register
                </motion.a>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
