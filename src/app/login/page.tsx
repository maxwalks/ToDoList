"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react"
import toast from "react-hot-toast";
import { validateUsername, validatePassword } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/LoadingButton";

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {};

    const usernameError = validateUsername(username);
    if (usernameError) newErrors.username = usernameError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true)
      const res = await signIn("credentials", { 
        redirect: false, 
        username, 
        password 
      });
      if (res?.error) {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }

    router.push("/")
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 flex items-center justify-center">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <User className="w-6 h-6 text-blue-500" />
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({ ...prev, username: "" }));
              }}
              className={`w-full ${errors.username ? "border-red-500" : ""}`}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className={`w-full ${errors.password ? "border-red-500" : ""}`}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          {loading ? (
            <LoadingButton />
          ) : (
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}