import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  CodeIcon,
  TrophyIcon,
  CalendarIcon,
  BookmarkIcon,
  BarChart2,
  Zap,
  Target,
  Users,
} from "lucide-react";
import LeetCodeLogo from "../assets/leetcode.svg";
import CodeforcesLogo from "../assets/codeforces.svg";
import CodeChefLogo from "../assets/codechef.svg";

const LandingPage = () => {
  return (
    <div className="bg-[#ffffff] dark:bg-[#000C2D] text-[#000C2D] dark:text-zinc-100">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#000C2D] dark:bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#000C2D] dark:bg-white rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="z-10 max-w-4xl">
          <div className="flex justify-center gap-6 mb-8">
            <img src={LeetCodeLogo} alt="LeetCode" className="h-12 md:h-16 " />
            <img
              src={CodeforcesLogo}
              alt="Codeforces"
              className="h-12 md:h-16 "
            />
            <img src={CodeChefLogo} alt="CodeChef" className="h-12 md:h-16 " />
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-[#000C2D]  dark:text-zinc-300">
            {" "}
            Track. Compete. Improve.{" "}
          </h2>

          <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 mb-4 max-w-3xl mx-auto">
            Your all-in-one platform to track coding contests, analyze your
            performance, and improve your skills.
          </p>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-3xl mx-auto">
            Monitor upcoming contests across platforms, track your ratings,
            analyze performance metrics, and receive personalized improvement
            recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-[#000C2D] text-white hover:bg-[#00113D] dark:bg-white dark:text-[#000C2D] dark:hover:bg-zinc-100 px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Explore Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-[#000C2D] text-[#000C2D] dark:border-white dark:text-white px-8 py-6 text-lg font-medium hover:bg-[#000C2D]/5 dark:hover:bg-white/10"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <div className="flex justify-center gap-8 mt-16">
            <div className="flex items-center gap-2">
              <Target size={20} className="text-[#000C2D] dark:text-white" />
              <span className="text-zinc-600 dark:text-zinc-400">
                Multi-Platform Support
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-[#000C2D] dark:text-white" />
              <span className="text-zinc-600 dark:text-zinc-400">
                Real-time Updates
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Why Choose{" "}
            <span className="text-[#000C2D] dark:text-white">
              Contest Tracker
            </span>
            ?
          </h2>
          <p className="text-xl text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto">
            The ultimate companion for competitive programmers looking to level
            up their skills
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-[#112056] p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-[#000C2D]/10 dark:bg-white/10 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <CodeIcon className="h-7 w-7 text-[#000C2D] dark:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Unified Platform Tracking
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Track contests from LeetCode, Codeforces, CodeChef, and more in
                one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-[#112056] p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-[#000C2D]/10 dark:bg-white/10 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <BarChart2 className="h-7 w-7 text-[#000C2D] dark:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Performance Analytics</h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Visualize your progress with detailed stats and personalized
                insights.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-[#112056] p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-[#000C2D]/10 dark:bg-white/10 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <CalendarIcon className="h-7 w-7 text-[#000C2D] dark:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Notifications</h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Get timely reminders for upcoming contests via email or browser
                alerts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white dark:bg-[#112056] p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-[#000C2D]/10 dark:bg-white/10 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <BookmarkIcon className="h-7 w-7 text-[#000C2D] dark:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Problem Collections</h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Create custom collections for efficient review and targeted
                practice.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white dark:bg-[#112056] p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-[#000C2D]/10 dark:bg-white/10 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <TrophyIcon className="h-7 w-7 text-[#000C2D] dark:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Contest Solutions</h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Access explanations from top programmers to improve your
                problem-solving.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white dark:bg-[#112056] p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="bg-[#000C2D]/10 dark:bg-white/10 w-14 h-14 flex items-center justify-center rounded-lg mb-4">
                <Users className="h-7 w-7 text-[#000C2D] dark:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Insights</h3>
              <p className="text-zinc-600 dark:text-zinc-300">
                Compare your progress with peers and learn different
                problem-solving strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#f4f4f8] to-white dark:from-[#000C2D] dark:to-[#00113D]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Learn from{" "}
              <span className="text-[#000C2D] dark:text-white">
                Expert Solutions
              </span>
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
              Watch detailed explanations for contest problems. Understand
              approaches, implementation tricks, and solution optimization.
            </p>
            <a
              href="https://www.youtube.com/@TLE_Eliminators"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="bg-[#000C2D] text-white hover:bg-[#00113D] dark:bg-white dark:text-[#000C2D] px-8 py-6 text-lg font-medium">
                Watch Solution Videos
              </Button>
            </a>
          </div>
          <div className="md:w-1/2 bg-white dark:bg-[#112056] p-1 rounded-xl shadow-xl">
            <div className="aspect-video bg-zinc-200 dark:bg-[#000C2D] rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto bg-[#000C2D] dark:bg-white rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white dark:text-[#000C2D]"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#000C2D] dark:text-white">
                  TLE Eliminators
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                  Detailed contest explanations and strategies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Elevate Your{" "}
            <span className="text-[#000C2D] dark:text-white">
              Coding Journey
            </span>
            ?
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-10 max-w-3xl mx-auto">
            Start using Contest Tracker to optimize your practice time, track
            progress across platforms, and improve your competitive programming
            skills.
          </p>
          <Link to="/dashboard">
            <Button className="bg-[#000C2D] text-white hover:bg-[#00113D] dark:bg-white dark:text-[#000C2D] px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
              Launch Dashboard
            </Button>
          </Link>
          <p className="text-zinc-500 dark:text-zinc-400 mt-6">
            Free to use • No registration required
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
