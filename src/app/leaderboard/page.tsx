import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getLeaderboard } from "@/server/actions";
import { Crown, Flame, Medal, Target, Trophy, Zap } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { ReactElement } from "react";

// Function to get motivational message based on streak
function getStreakMessage(streakDays: number): {
  message: string;
  icon: ReactElement;
  color: string;
} {
  if (streakDays === 0) {
    return {
      message: "Just starting the journey! 🌱",
      icon: <Target className="w-5 h-5" />,
      color: "text-gray-600",
    };
  } else if (streakDays < 7) {
    return {
      message: "Building momentum! 💪",
      icon: <Zap className="w-5 h-5" />,
      color: "text-blue-700",
    };
  } else if (streakDays < 30) {
    return {
      message: "Strong foundation! 🔥",
      icon: <Flame className="w-5 h-5" />,
      color: "text-orange-700",
    };
  } else if (streakDays < 90) {
    return {
      message: "Impressive discipline! 🏆",
      icon: <Trophy className="w-5 h-5" />,
      color: "text-yellow-600",
    };
  } else if (streakDays < 365) {
    return {
      message: "Incredible willpower! 👑",
      icon: <Crown className="w-5 h-5" />,
      color: "text-purple-700",
    };
  } else {
    return {
      message: "Legendary status! ⭐",
      icon: <Medal className="w-5 h-5" />,
      color: "text-amber-700",
    };
  }
}

// Function to get rank icon
function getRankIcon(rank: number): ReactElement {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-yellow-400" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-300" />;
    case 3:
      return <Trophy className="w-6 h-6 text-amber-600" />;
    default:
      return (
        <span className="w-6 h-6 flex items-center justify-center text-white/70 font-bold">
          #{rank}
        </span>
      );
  }
}

export default async function LeaderboardPage() {
  // Fetch top 50 users for the leaderboard (default limit)
  const result = await getLeaderboard();

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#085078] to-[#85d8ce] flex items-center justify-center p-4">
        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardContent className="p-6">
            <p className="text-white">Failed to load leaderboard</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { users } = result.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#085078] to-[#85d8ce] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-['Caveat']">
            🏆 Leaderboard
          </h1>
          <p className="text-white/80">See who's leading the no-fap journey</p>
        </div>

        {/* Top 3 Podium */}
        {users.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 w-full">
                <CardContent className="p-4 text-center">
                  <div className="mb-2">
                    <Medal className="w-8 h-8 text-gray-300 mx-auto" />
                  </div>
                  <Link
                    href={`/${users[1].username}`}
                    className="hover:text-white/80"
                  >
                    <h3 className="text-white font-semibold truncate">
                      {users[1].name}
                    </h3>
                    <p className="text-white/70 text-sm">
                      @{users[1].username}
                    </p>
                  </Link>
                  <p className="text-xl font-bold text-white mt-2">
                    {users[1].streakDays} days
                  </p>
                  <div
                    className={`items-center justify-center gap-1 mt-1 hidden md:flex ${
                      getStreakMessage(users[1].streakDays).color
                    }`}
                  >
                    {getStreakMessage(users[1].streakDays).icon}
                    <span className="text-xs">
                      {getStreakMessage(users[1].streakDays).message}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <Card className="backdrop-blur-sm bg-white/10 border-yellow-400/50 w-full">
                <CardContent className="p-4 text-center">
                  <div className="mb-2">
                    <Crown className="w-10 h-10 text-yellow-400 mx-auto" />
                  </div>
                  <Link
                    href={`/${users[0].username}`}
                    className="hover:text-white/80"
                  >
                    <h3 className="text-white font-semibold truncate">
                      {users[0].name}
                    </h3>
                    <p className="text-white/70 text-sm">
                      @{users[0].username}
                    </p>
                  </Link>
                  <p className="text-2xl font-bold text-yellow-400 mt-2">
                    {users[0].streakDays} days
                  </p>
                  <div
                    className={`hidden md:flex items-center justify-center gap-1 mt-1 ${
                      getStreakMessage(users[0].streakDays).color
                    }`}
                  >
                    {getStreakMessage(users[0].streakDays).icon}
                    <span className="text-xs">
                      {getStreakMessage(users[0].streakDays).message}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <Card className="backdrop-blur-sm bg-white/10 border-white/20 w-full">
                <CardContent className="p-4 text-center">
                  <div className="mb-2">
                    <Trophy className="w-8 h-8 text-amber-600 mx-auto" />
                  </div>
                  <Link
                    href={`/${users[2].username}`}
                    className="hover:text-white/80"
                  >
                    <h3 className="text-white font-semibold truncate">
                      {users[2].name}
                    </h3>
                    <p className="text-white/70 text-sm">
                      @{users[2].username}
                    </p>
                  </Link>
                  <p className="text-xl font-bold text-white mt-2">
                    {users[2].streakDays} days
                  </p>
                  <div
                    className={`hidden md:flex items-center justify-center gap-1 mt-1 ${
                      getStreakMessage(users[2].streakDays).color
                    }`}
                  >
                    {getStreakMessage(users[2].streakDays).icon}
                    <span className="text-xs">
                      {getStreakMessage(users[2].streakDays).message}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card className="backdrop-blur-sm bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Complete Rankings</CardTitle>
            <CardDescription className="text-white/70">
              All warriors on their no-fap journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user) => {
                const { message, icon, color } = getStreakMessage(
                  user.streakDays
                );

                return (
                  <div
                    key={user.username}
                    className={`flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors ${
                      user.rank <= 3 ? "border border-white/20" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(user.rank)}
                      </div>

                      <div className="flex flex-col">
                        <Link
                          href={`/${user.username}`}
                          className="text-white font-semibold hover:text-white/80 transition-colors"
                        >
                          {user.name}
                        </Link>
                        <p className="text-white/60 text-sm">
                          @{user.username}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={cn("flex items-center gap-2", color)}>
                        {icon}
                        <span className="text-sm hidden sm:inline">
                          {message}
                        </span>
                      </div>

                      <div className="text-right flex flex-col items-center">
                        <p className="text-white font-bold text-lg">
                          {user.streakDays}
                        </p>
                        <p className="text-white/60 text-sm">days</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {users.length === 0 && (
              <div className="text-center py-8">
                <p className="text-white/70">
                  No users found. Be the first to join!
                </p>
                <Link href="/create" className="mt-4 inline-block">
                  <Button className="bg-white text-[#085078] hover:bg-white/90">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <div className="text-center mt-8">
          <Card className="backdrop-blur-sm bg-white/10 border-white/20">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-2">
                💪 Keep Going Strong!
              </h3>
              <p className="text-white/70 text-sm">
                Every day is a victory. Your journey matters, regardless of your
                position on the board.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Leaderboard - No-Fap Streak Tracker",
  description:
    "See who's leading the no-fap journey and get motivated by the community.",
};
