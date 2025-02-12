"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e : React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) return;

    const res = await signIn("credentials", { redirect: false, ...{username, password} })
    console.log(res)
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
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleLogin}
          >
            Login
          </Button>
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}