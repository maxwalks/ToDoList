"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e : React.FormEvent) => {
    e.preventDefault()
    if (!username || !email || !password) return;

    const body = JSON.stringify({
      username,
      email,
      password
    })

    const responseRaw = await fetch("/api/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body
    })
    const response = await responseRaw.json()
    console.log(response)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8 flex items-center justify-center">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <UserPlus className="w-6 h-6 text-blue-500" />
            Register
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              className="w-full"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleRegister}
          >
            Register
          </Button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
