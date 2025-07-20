"use client";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UsernameInput() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/${username.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-white/70 text-sm text-center">
        Visit an existing profile:
      </p>
      <div className="flex items-center space-x-2">
        <span className="text-white/70 text-sm">gooner/ </span>
        <Input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <p className="text-white/50 text-xs text-center">Press Enter to visit</p>
    </form>
  );
}
