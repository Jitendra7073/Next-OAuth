import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(options);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {session ? (
            /* Authenticated View */
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Link href="/profile">
                    <div className="flex items-center gap-4 p-4 rounded-lg border">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={session.user?.image || undefined}
                          alt={session.user?.name || "User"}
                        />
                        <AvatarFallback className="text-lg">
                          {getInitials(session.user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">
                          {session.user?.name || "User"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Get Started</CardTitle>
                  <CardDescription>
                    Sign in or create an account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Link href="/auth/signin">
                      <Button className="w-full" size="lg">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button variant="outline" className="w-full" size="lg">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
