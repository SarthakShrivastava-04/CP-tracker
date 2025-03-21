import { GithubIcon } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t py-6 bg-white dark:bg-[#000C2D]">
      <div className="container flex flex-col md:flex-row items-center justify-between mx-auto gap-4 md:gap-0">
        {/* Copyright Text */}
        <div className="flex items-center gap-2">
  <p className="text-sm text-[#000C2D] dark:text-[#f4f4f5]">
    © {currentYear} Contest Tracker
  </p>
  <p className="text-sm text-[#000C2D] dark:text-[#f4f4f5]">|</p>
  <p className="text-sm text-[#000C2D] dark:text-[#f4f4f5]">
    Made by Sarthak
  </p>
  <p className="text-sm text-[#000C2D] dark:text-[#f4f4f5]">|</p>
  <p className="text-sm text-[#000C2D] dark:text-[#f4f4f5]">
    All rights reserved.
  </p>
</div>

        {/* Links */}
        <div className="flex items-center gap-6">
          {/* GitHub Link */}
          <motion.a
            href="https://github.com/SarthakShrivastava-04/contest-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GithubIcon className="h-5 w-5" />
            <span>Give a Star on GitHub</span>
          </motion.a>

          {/* Documentation Link */}
          <a
            href="https://github.com/SarthakShrivastava-04/contest-tracker/blob/main/README.md"
            className="text-sm text-[#000C2D] dark:text-[#f4f4f5] hover:text-[#00113D] dark:hover:text-white transition-colors"
          >
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;