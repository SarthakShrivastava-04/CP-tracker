import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(name, email, password);

      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: result.error,
        });
      } else {
        toast({
          title: "Registration successful",
          description: "Your account has been created. Please login.",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
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
            Create an Account
          </CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-900 dark:text-white">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter a username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 dark:focus:ring-white dark:focus:border-white transition-all duration-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-900 dark:text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 dark:focus:ring-white dark:focus:border-white transition-all duration-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-900 dark:text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 dark:focus:ring-white dark:focus:border-white transition-all duration-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-zinc-900 dark:text-white">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 dark:focus:ring-white dark:focus:border-white transition-all duration-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-zinc-900 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300 underline transition-all duration-300"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;