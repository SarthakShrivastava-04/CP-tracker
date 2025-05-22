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
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)] p-4 bg-white dark:bg-[#000C2D]">
      <Card className="w-full max-w-md bg-white dark:bg-[#000C2D] border border-zinc-200 dark:border-[#1e3a8a] rounded-xl shadow-lg shadow-zinc-200 dark:shadow-[#1e3a8a]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#000C2D] dark:text-[#f4f4f5]">
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
              <Label htmlFor="name" className="text-[#000C2D] dark:text-[#f4f4f5]">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter a username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="focus:ring-2 focus:ring-[#000C2D] focus:border-[#000C2D] dark:focus:ring-[#f4f4f5] dark:focus:border-[#f4f4f5] transition-all duration-300 dark:bg-[#1e3a8a] dark:border-[#1e3a8a] dark:text-[#f4f4f5]"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#000C2D] dark:text-[#f4f4f5]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-2 focus:ring-[#000C2D] focus:border-[#000C2D] dark:focus:ring-[#f4f4f5] dark:focus:border-[#f4f4f5] transition-all duration-300 dark:bg-[#1e3a8a] dark:border-[#1e3a8a] dark:text-[#f4f4f5]"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#000C2D] dark:text-[#f4f4f5]">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-2 focus:ring-[#000C2D] focus:border-[#000C2D] dark:focus:ring-[#f4f4f5] dark:focus:border-[#f4f4f5] transition-all duration-300 dark:bg-[#1e3a8a] dark:border-[#1e3a8a] dark:text-[#f4f4f5]"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#000C2D] dark:text-[#f4f4f5]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="focus:ring-2 focus:ring-[#000C2D] focus:border-[#000C2D] dark:focus:ring-[#f4f4f5] dark:focus:border-[#f4f4f5] transition-all duration-300 dark:bg-[#1e3a8a] dark:border-[#1e3a8a] dark:text-[#f4f4f5]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 mt-6">
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#000C2D] text-[#f4f4f5] hover:bg-[#00113D] dark:bg-[#f4f4f5] dark:text-[#000C2D] dark:hover:bg-zinc-100 transition-all duration-300"
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
            <p className="text-center text-sm text-[#000C2D] dark:text-[#f4f4f5]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#000C2D] hover:text-[#00113D] dark:text-[#f4f4f5] dark:hover:text-white underline transition-all duration-300"
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