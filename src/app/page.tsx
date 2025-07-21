import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UsernameInput from "@/components/UsernameInput";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#085078] to-[#85d8ce] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 font-['Caveat']">
            No-Fap Streak Tracker
          </h1>
          <p className="text-white/80 text-lg">
            Track your journey with a beautiful flip clock
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Get Started</CardTitle>
            <CardDescription className="text-white/70">
              Create your account or visit an existing profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/create" className="w-full">
              <Button className="w-full bg-white text-[#085078] hover:bg-white/90 font-semibold">
                Create New Account
              </Button>
            </Link>

            {/* <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-transparent px-2 text-white/70">or</span>
              </div>
            </div> */}

            <Separator className="mt-6 bg-white/20" />
            <UsernameInput />

            <div className="pt-4">
              <Link href="/leaderboard" className="w-full">
                <Button
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  🏆 View Leaderboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-white/60 flex items-center justify-center gap-2">
          <p className="text-white/60 text-sm">Made with ❤️ for your journey</p>{" "}
          •{" "}
          <Link
            href="https://github.com/BioHazard786/not-fap-streak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github Repository"
            className="text-white/60 hover:underline text-sm"
          >
            Github
          </Link>
        </div>
      </div>
    </div>
  );
}
