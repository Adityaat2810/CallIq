"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async () => {
    await authClient.signUp.email({
      email,
      password,
      name
    },
    {
      onSuccess: (ctx) => {
        window.alert("User created successfully");
        setEmail("");
        setPassword("");
        setName("");
      },
      onError: (ctx) => {
        window.alert('something went wrong');
      }});
  }

  if(session) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
        <p className="text-gray-600">You are logged in with email: {session.user.email}</p>
        <Button
          onClick={() => authClient.signOut()}
          className="mt-4"
        >
          Sign Out
        </Button>

      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={onSubmit} className="w-full">
        Create User
      </Button>
    </div>
  );
}