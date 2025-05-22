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
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)] p-4 bg-white dark:bg-[#000C2D]">
      <Card className="w-full max-w-md bg-[#f4f4f4e8] dark:bg-[#000C2D] border border-zinc-200 dark:border-[#1e3a8a] rounded-xl shadow-lg shadow-zinc-200 dark:shadow-[#1e3a8a]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#000C2D] dark:text-[#f4f4f5]">
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
              <Label htmlFor="leetcode" className="text-[#000C2D] dark:text-[#f4f4f5]">
                LeetCode Username
              </Label>
              <Input
                id="leetcode"
                type="text"
                placeholder="leetcode_user"
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
                className="focus:ring-2 focus:ring-[#000C2D] focus:border-[#000C2D] dark:focus:ring-[#f4f4f5] dark:focus:border-[#f4f4f5] transition-all duration-300 dark:bg-[#1e3a8a] dark:border-[#1e3a8a] dark:text-[#f4f4f5]"
              />
            </div>

            {/* Codeforces Username */}
            <div className="space-y-2">
              <Label htmlFor="codeforces" className="text-[#000C2D] dark:text-[#f4f4f5]">
                Codeforces Username
              </Label>
              <Input
                id="codeforces"
                type="text"
                placeholder="codeforces_user"
                value={codeforcesUsername}
                onChange={(e) => setCodeforcesUsername(e.target.value)}
                className="focus:ring-2 focus:ring-[#000C2D] focus:border-[#000C2D] dark:focus:ring-[#f4f4f5] dark:focus:border-[#f4f4f5] transition-all duration-300 dark:bg-[#1e3a8a] dark:border-[#1e3a8a] dark:text-[#f4f4f5]"
              />
            </div>

            {/* CodeChef Username */}
            <div className="space-y-2">
              <Label htmlFor="codechef" className="text-[#000C2D] dark:text-[#f4f4f5]">
                CodeChef Username
              </Label>
              <Input
                id="codechef"
                type="text"
                placeholder="codechef_user"
                value={codechefUsername}
                onChange={(e) => setCodechefUsername(e.target.value)}
                className="focus:ring-2 focus:ring-[#000C2D] focus:border-[#000C2D] dark:focus:ring-[#f4f4f5] dark:focus:border-[#f4f4f5] transition-all duration-300 dark:bg-[#1e3a8a] dark:border-[#1e3a8a] dark:text-[#f4f4f5]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-6">
            <Button
              type="submit"
              className="w-full bg-[#000C2D] text-[#f4f4f5] hover:bg-[#00113D] dark:bg-[#f4f4f5] dark:text-[#000C2D] dark:hover:bg-zinc-100 transition-all duration-300"
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