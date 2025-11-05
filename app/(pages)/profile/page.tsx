import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../../api/auth/[...nextauth]/options";
import Link from "next/link";
import prisma from "@/prismaClient";

// Shadecn Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SignOut from "../../components/signout";

export default async function ProfilePage() {
  const session = await getServerSession(options);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Fetch full user data from database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      accounts: {
        select: {
          provider: true,
          providerAccountId: true,
        },
      },
    },
  });

  const getInitials = (name: string | null | undefined) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "U";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={session.user.image || undefined}
                  alt={session.user.name || "User"}
                />
                <AvatarFallback className="text-3xl">
                  {getInitials(session.user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center md:text-left">
                <CardTitle className="text-2xl">
                  {session.user.name || "User"}
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  {session.user.email}
                </CardDescription>
              </div>
              <SignOut />
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Account Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Member Since
                    </p>
                    <p className="font-medium">
                      {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="font-medium">
                      {user?.updatedAt ? formatDate(user.updatedAt) : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-mono text-sm">{user?.id || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Connected Accounts */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Connected Accounts</h3>
                {user?.accounts && user.accounts.length > 0 ? (
                  <div className="space-y-2">
                    {user.accounts.map((account: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                        <div className="flex-1">
                          <p className="font-medium capitalize">
                            {account.provider}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Connected
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No OAuth accounts connected. You can connect accounts by
                    signing in with them.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
