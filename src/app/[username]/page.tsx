import FlipClock from "@/components/FlipClock";
import UserControls from "@/components/UserControls";
import { getUserByUsername } from "@/server/actions";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: Promise<{ username: string }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { username: rawUsername } = await params;

  // Convert username to lowercase for consistent lookup
  const username = rawUsername.toLowerCase();

  // Validate username format
  if (!/^[a-z0-9_-]+$/.test(username)) {
    notFound();
  }

  const result = await getUserByUsername(username);

  if (!result.success) {
    notFound();
  }

  const { user } = result.data;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#085078] to-[#85d8ce] flex items-center justify-center p-4">
      <FlipClock streakStartDate={user.streakStartDate} userName={user.name} />
      <UserControls username={username} />
    </div>
  );
}

// Generate metadata for better SEO
export async function generateMetadata({ params }: UserPageProps) {
  const { username: rawUsername } = await params;

  // Convert username to lowercase for consistent lookup
  const username = rawUsername.toLowerCase();

  // Validate username format
  if (!/^[a-z0-9_-]+$/.test(username)) {
    return {
      title: "User Not Found",
    };
  }

  const result = await getUserByUsername(username);

  if (!result.success) {
    return {
      title: "User Not Found",
    };
  }

  const { user } = result.data;

  const title = `${user.name}'s No-Fap Streak`;
  const description = `Track ${user.name}'s no-fap journey and streak progress`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}
