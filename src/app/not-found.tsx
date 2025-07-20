import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#085078] to-[#85d8ce] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-white mb-4 font-['Caveat']">
            404
          </h1>
          <h2 className="text-2xl font-bold text-white mb-2">User Not Found</h2>
          <p className="text-white/80">
            The user you're looking for doesn't exist or hasn't created their
            streak yet.
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white">
              What would you like to do?
            </CardTitle>
            <CardDescription className="text-white/70">
              Create an account or go back home
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/create" className="w-full">
              <Button className="w-full bg-white text-[#085078] hover:bg-white/90 font-semibold">
                Create New Account
              </Button>
            </Link>

            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
