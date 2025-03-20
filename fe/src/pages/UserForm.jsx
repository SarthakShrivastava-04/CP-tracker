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
    console.log("Submitting form with:", {  leetcodeUsername,
      codeforcesUsername,
      codechefUsername});
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
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Platform Usernames
          </CardTitle>
          <CardDescription className="text-gray-500">
            Enter your usernames for the coding platforms to track your stats
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* LeetCode Username */}
            <div className="space-y-2">
              <Label htmlFor="leetcode" className="text-gray-700">
                LeetCode Username
              </Label>
              <Input
                id="leetcode"
                type="text"
                placeholder="leetcode_user"
                value={leetcodeUsername}
                onChange={(e) => setLeetcodeUsername(e.target.value)}
                // required
                className="focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Codeforces Username */}
            <div className="space-y-2">
              <Label htmlFor="codeforces" className="text-gray-700">
                Codeforces Username
              </Label>
              <Input
                id="codeforces"
                type="text"
                placeholder="codeforces_user"
                value={codeforcesUsername}
                onChange={(e) => setCodeforcesUsername(e.target.value)}
                // required
                className="focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* CodeChef Username */}
            <div className="space-y-2">
              <Label htmlFor="codechef" className="text-gray-700">
                CodeChef Username
              </Label>
              <Input
                id="codechef"
                type="text"
                placeholder="codechef_user"
                value={codechefUsername}
                onChange={(e) => setCodechefUsername(e.target.value)}
                // required
                className="focus:ring-2 focus:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
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
