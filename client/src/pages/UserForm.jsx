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
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const { user, updateUsernames } = useStore();
  const [leetcodeUsername, setLeetcodeUsername] = useState(user?.leetcode || "");
  const [codeforcesUsername, setCodeforcesUsername] = useState(user?.codeforces || "");
  const [codechefUsername, setCodechefUsername] = useState(user?.codechef || "");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
        console.error("Update failed:", result.error);
      } else {
        console.log("Profile updated successfully");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setIsLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)] p-4">
      <Card className="w-full max-w-md mt-8 border border-zinc-300 bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-700 rounded-xl">
        <CardHeader className="text-center text-zinc-900 dark:text-zinc-100">
          <CardTitle className="text-2xl mb-2 font-bold">
            Platform Usernames
          </CardTitle>
          <CardDescription>
            Enter your usernames for the coding platforms to track your stats
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 mt-8">
            <div className="space-y-2 text-zinc-900 dark:text-zinc-200">
              <Label htmlFor="leetcode">LeetCode Username</Label>
              <Input
                id="leetcode"
                type="text"
                placeholder="leetcode_user"
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
                className="focus:ring-2 focus:border-2 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codeforces">Codeforces Username</Label>
              <Input
                id="codeforces"
                type="text"
                placeholder="codeforces_user"
                value={codeforcesUsername}
                onChange={(e) => setCodeforcesUsername(e.target.value)}
                className="focus:ring-2 focus:border-2 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codechef">CodeChef Username</Label>
              <Input
                id="codechef"
                type="text"
                placeholder="codechef_user"
                value={codechefUsername}
                onChange={(e) => setCodechefUsername(e.target.value)}
                className="focus:ring-2 focus:border-2 transition-all duration-300"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-6">
            <Button
              type="submit"
              className="w-full transition-all duration-300 dark:bg-zinc-50 dark:text-black bg-zinc-900 text-zinc-50"
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
