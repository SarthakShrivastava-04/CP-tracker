import { GithubIcon } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t py-6">
      <div className="container flex flex-col md:flex-row items-center justify-between mx-auto gap-4 md:gap-0">
        {/* Copyright Text */}
        <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-300">
          <p className="text-sm">© {currentYear} Contest Tracker</p>
          <p className="text-sm">|</p>
          <p className="text-sm">All rights reserved.</p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-zinc-800 dark:text-zinc-300">
          <p className="text-sm">Created by Sarthak</p>
          <p className="text-sm">|</p>
          <motion.a
            href="https://github.com/SarthakShrivastava-04/CP-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline  transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GithubIcon className="h-5 w-5 text-zinc-800 dark:text-zinc-300" />
            <span className="text-zinc-800 dark:text-zinc-300">GitHub</span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
