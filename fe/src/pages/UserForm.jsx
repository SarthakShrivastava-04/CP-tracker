import { useState } from "react";
import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const UserForm = () => {
  const { user, updateUsernames } = useStore();
  const [leetcodeUsername, setLeetcodeUsername] = useState(
    user?.leetcode || ""
  );
  const [codeforcesUsername, setCodeforcesUsername] = useState(
    user?.codeforces || ""
  );
  const [codechefUsername, setCodechefUsername] = useState(
    user?.codechef || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting form with:", {
      leetcodeUsername,
      codeforcesUsername,
      codechefUsername,
    });
    try {
      const result = await updateUsernames(
        leetcodeUsername,
        codeforcesUsername,
        codechefUsername
      );

      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Update failed",
          description: result.error,
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your platform usernames have been saved.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)] p-4 bg-white dark:bg-zinc-900">
      <Card className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg shadow-zinc-200 dark:shadow-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-white">
            Platform Usernames
          </CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">
            Enter your usernames for the coding platforms to track your stats
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* LeetCode Username */}
            <div className="space-y-2">
              <Label htmlFor="leetcode" className="text-zinc-900 dark:text-white">
                LeetCode Username
              </Label>
              <Input
                id="leetcode"
                type="text"
                placeholder="leetcode_user"
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
                className="focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 dark:focus:ring-white dark:focus:border-white transition-all duration-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              />
            </div>

            {/* Codeforces Username */}
            <div className="space-y-2">
              <Label htmlFor="codeforces" className="text-zinc-900 dark:text-white">
                Codeforces Username
              </Label>
              <Input
                id="codeforces"
                type="text"
                placeholder="codeforces_user"
                value={codeforcesUsername}
                onChange={(e) => setCodeforcesUsername(e.target.value)}
                className="focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 dark:focus:ring-white dark:focus:border-white transition-all duration-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              />
            </div>

            {/* CodeChef Username */}
            <div className="space-y-2">
              <Label htmlFor="codechef" className="text-zinc-900 dark:text-white">
                CodeChef Username
              </Label>
              <Input
                id="codechef"
                type="text"
                placeholder="codechef_user"
                value={codechefUsername}
                onChange={(e) => setCodechefUsername(e.target.value)}
                className="focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 dark:focus:ring-white dark:focus:border-white transition-all duration-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Usernames"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default UserForm;