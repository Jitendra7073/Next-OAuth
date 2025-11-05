"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOut() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/auth/signin" });
  };
  return (
    <>
      <Button
        onClick={handleSignOut}
        disabled={isSigningOut}
        variant="destructive">
        {isSigningOut ? "Signing out..." : "Sign Out"}
      </Button>
    </>
  );
}
