import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../lib/store";
import { Button } from "../ui/button";
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  XIcon,
  Youtube,
  CodeXml,
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
      className={`sticky top-0 z-50 w-full border-b-1 border-zinc-300 dark:border-zinc-700 transition-all duration-200 ${
        scrolled
          ? "backdrop-blur supports-[backdrop-filter]:bg-opacity-60 shadow-sm"
          : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between mx-auto px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 min-w-58">
          <Link
            to="/"
            className="text-xl flex items-center gap-2 transition-opacity"
          >
          
            <CodeXml className="w-6 h-6"/>
            <span className="font-medium ">CP-Track</span>
          
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 md:gap-8 mx-auto ">
          <motion.a
            href="/dashboard"
            className="hover:underline dark:text-zinc-100 hover:opacity-90 transition-colors"
            whileHover={{ y: -2 }}
          >
            Dashboard
          </motion.a>
          <motion.a
            href="https://www.youtube.com/@TLE_Eliminators"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline dark:text-zinc-100 hover:opacity-90 transition-colors flex items-center gap-1"
            whileHover={{ y: -2 }}
          >
            <Youtube size={16} />
            <span>Solutions</span>
          </motion.a>
          <motion.a
            href="/user-form"
            className="hover:underline dark:text-zinc-100 hover:opacity-90 transition-colors flex items-center gap-1"
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
                className="flex items-center dark:text-zinc-100 hover:opacity-90 gap-2 hover:underline transition-colors"
                whileHover={{ y: -2 }}
              >
                <span className="font-medium">{user?.username}</span>
              </motion.a>
              <Button
                variant="ghost"
                onClick={logout}
                className="dark:bg-zinc-100 dark:text-black bg-zinc-800 text-sm font-normal  text-zinc-100 "
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <motion.a
                href="/login"
                className="hover:underline transition-colors"
                whileHover={{ y: -2 }}
              >
                Login
              </motion.a>
              <motion.a
                href="/register"
                className="hover:underline transition-colors"
                whileHover={{ y: -2 }}
              >
                Register
              </motion.a>
            </div>
          )}

          <motion.a
            href="#"
            onClick={toggleTheme}
            className="hover:bg-opacity-10 ml-1 transition-all p-2 rounded-full"
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
            className="hover:bg-opacity-10 transition-all"
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
            className="hover:bg-opacity-10 transition-all"
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
        <div className="md:hidden border-t p-4 shadow-lg">
          <nav className="flex flex-col space-y-2">
            <motion.a
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:underline transition-colors"
              whileHover={{ y: -2 }}
            >
              Home
            </motion.a>
            <motion.a
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:underline transition-colors"
              whileHover={{ y: -2 }}
            >
              Dashboard
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@TLE_Eliminators"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:underline transition-colors flex items-center gap-2"
              whileHover={{ y: -2 }}
            >
              <Youtube size={16} />
              <span>Solutions</span>
            </motion.a>

            <div className="border-t my-2 border-zinc-200 dark:border-zinc-700"></div>

            {isAuthenticated ? (
              <>
                <motion.a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:underline transition-colors flex items-center gap-2"
                  whileHover={{ y: -2 }}
                >
                  <span>Profile</span>
                </motion.a>
                <Button
                  variant="ghost"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start hover:bg-opacity-10 transition-all"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <motion.a
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:underline transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Login
                </motion.a>
                <motion.a
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:underline transition-colors"
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
