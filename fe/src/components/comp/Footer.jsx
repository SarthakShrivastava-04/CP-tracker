import { GithubIcon } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t py-6 bg-white dark:bg-zinc-900">
      <div className="container flex flex-col md:flex-row items-center justify-between mx-auto gap-4 md:gap-0">
        {/* Copyright Text */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {currentYear} Contest Tracker. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          {/* GitHub Link */}
          <a
            href="https://github.com/yourusername/contest-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center gap-2"
          >
            <GithubIcon className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>

          {/* Documentation Link */}
          <a
            href="/docs"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Documentation
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;