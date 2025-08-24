"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const LogoutButton = withAuthenticator(function LogoutButton({
  signOut,
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut!();
    router.push("/login");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Sair</span>
    </Button>
  );
});
