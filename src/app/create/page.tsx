"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/server/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";

export default function CreatePage() {
  const router = useRouter();

  // Action state for create user form
  const [state, createAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        const result = await createUser(formData);

        if (result.success) {
          toast.success("Account created successfully!");
          // Redirect to the new user's page
          router.push(`/${result.data.username}`);
          return { success: true };
        } else {
          toast.error(result.error);
          return { success: false, error: result.error };
        }
      } catch (err) {
        toast.error("An unexpected error occurred");
        return { success: false, error: "An unexpected error occurred" };
      }
    },
    null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#085078] to-[#85d8ce] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 font-['Caveat']">
            Create Your Account
          </h1>
          <p className="text-white/80">Start your no-fap journey today</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Join the Community</CardTitle>
            <CardDescription className="text-white/70">
              Create your personal streak tracker
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createAction} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-white"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="^[a-z0-9_-]+$"
                  placeholder="your-unique-username"
                  disabled={isPending}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:ring-white/20 focus-visible:ring-2 disabled:opacity-50"
                  onChange={(e) => {
                    // Auto-convert to lowercase as user types
                    e.target.value = e.target.value.toLowerCase();
                  }}
                />
                <p className="text-xs text-white/60">
                  3-20 characters, lowercase letters, numbers, dashes and
                  underscores only
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-white"
                >
                  Display Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={50}
                  placeholder="Your display name"
                  disabled={isPending}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:ring-white/20 focus-visible:ring-2 disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="secret"
                  className="text-sm font-medium text-white"
                >
                  Reset Secret
                </Label>
                <Input
                  id="secret"
                  name="secret"
                  type="password"
                  required
                  minLength={5}
                  placeholder="Secret phrase to reset streak"
                  disabled={isPending}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:ring-white/20 focus-visible:ring-2 disabled:opacity-50"
                />
                <p className="text-xs text-white/60">
                  Remember this! You'll need it to reset your streak
                </p>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-[#085078] hover:bg-white/90 font-semibold disabled:opacity-50"
              >
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-white/70 hover:text-white text-sm">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
