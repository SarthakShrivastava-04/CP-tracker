import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../lib/store";
import { Button } from "../ui/Button";
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react";
import { useTheme } from "../../lib/Theme-provider";

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
      className={`sticky top-0 z-50 w-full border-b ${
        scrolled
          ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-zinc-900/95 dark:supports-[backdrop-filter]:bg-zinc-900/60"
          : "bg-white dark:bg-zinc-900"
      }`}
    >
      <div className="container flex h-16 items-center justify-between mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-zinc-900 dark:text-white">
            Contest Tracker
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" className="flex items-center gap-2 text-zinc-900 dark:text-white">
                  <span className="font-medium">{user?.username}</span>
                </Button>
              </Link>
              <Button variant="ghost" onClick={logout} className="text-zinc-900 dark:text-white">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-zinc-900 dark:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                  Register
                </Button>
              </Link>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-zinc-900 dark:text-white"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-zinc-900 dark:text-white"
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
            className="text-zinc-900 dark:text-white"
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
        <div className="md:hidden border-t p-4 bg-white dark:bg-zinc-900">
          <nav className="flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-zinc-900 dark:text-white">
                    Profile
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="w-full justify-start text-zinc-900 dark:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-zinc-900 dark:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full justify-start bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;