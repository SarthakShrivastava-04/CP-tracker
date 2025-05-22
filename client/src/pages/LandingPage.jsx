import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { CodeIcon, TrophyIcon, BarChart2, Zap, Target } from "lucide-react";
import LeetCodeLogo from "../assets/leetcode.svg";
import CodeforcesLogo from "../assets/codeforces.svg";
import CodeChefLogo from "../assets/codechef.svg";

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative overflow-hidden">
        <div className="z-10 max-w-4xl">
          <div className="flex justify-center gap-6 mb-8">
            <img src={LeetCodeLogo} alt="LeetCode" className="h-12 md:h-16" />
            <img
              src={CodeforcesLogo}
              alt="Codeforces"
              className="h-12 md:h-16"
            />
            <img src={CodeChefLogo} alt="CodeChef" className="h-12 md:h-16" />
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">
            Track. Compete. Improve.
          </h2>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300/80 mb-10 max-w-3xl mx-auto">
            Monitor upcoming contests across platforms, track your ratings,
            analyze performance metrics, and receive personalized improvement
            recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="dark:bg-zinc-50 dark:text-black bg-zinc-900 text-zinc-50 px-6 py-4 text-sm font-normal shadow-md"
              >
                Explore Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="dark:bg-zinc-50 dark:text-black bg-zinc-900 text-zinc-50 px-6 py-4 text-sm font-normal "
              >
                Sign In
              </Button>
            </Link>
          </div>

          <div className="flex justify-center gap-8 mt-16">
            <div className="flex items-center gap-2">
              <Target size={20} className="text-black dark:text-gray-300/80" />
              <span className="text-gray-700 dark:text-gray-300/80">
                Multi-Platform Support
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-black dark:text-gray-300/80" />
              <span className="text-gray-700 dark:text-gray-300/80">
                Real-time Updates
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl dark:text-zinc-100 text-zinc-900 font-bold text-center mb-4">
            Why Choose Contest Tracker?
          </h2>
          <p className="text-xl text-center text-gray-700 dark:text-gray-300/80 mb-16 max-w-3xl mx-auto">
            The ultimate companion for competitive programmers looking to level
            up their skills
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <CodeIcon className="h-7 w-7 " />,
                title: "Unified Platform Tracking",
                description:
                  "Track contests from LeetCode, Codeforces, CodeChef, and more in one place.",
              },
              {
                icon: <BarChart2 className="h-7 w-7" />,
                title: "Performance Analytics",
                description:
                  "Visualize your progress with detailed stats and personalized insights.",
              },

              {
                icon: <TrophyIcon className="h-7 w-7" />,
                title: "Contest Solutions",
                description:
                  "Access explanations from top programmers to improve your problem-solving.",
              },
            ].map(({ icon, title, description }, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-300 dark:bg-zinc-900 dark:border-zinc-700 p-6 rounded-lg flex gap-4 items-center shadow-sm hover:shadow-md"
              >
                <div className="bg-gray-100 dark:bg-zinc-700 w-30 h-14 flex items-center justify-center rounded-lg mb-4">
                  {icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 dark:text-gray-100/90">
                    {title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300/80">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl dark:text-zinc-100 text-zinc-900  font-bold mb-6">
              Learn from Expert Solutions
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300/80 mb-8">
              Watch detailed explanations for contest problems. Understand
              approaches, implementation tricks, and solution optimization.
            </p>
            <a
              href="https://www.youtube.com/@TLE_Eliminators"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="dark:bg-zinc-50 dark:text-black bg-zinc-900 text-zinc-50  px-6 py-4 text-sm font-normal ">
                Watch Solution Videos
              </Button>
            </a>
          </div>
          <div className="md:w-1/2 aspect-video w-full">
            <iframe
              className="w-full h-full rounded-xl shadow-md"
              src="https://www.youtube.com/embed/videoseries?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB"
              title="YouTube video playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
