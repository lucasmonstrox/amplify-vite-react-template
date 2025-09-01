import { useAuthenticator } from "@aws-amplify/ui-react";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export function LogoutButton() {
  const { signOut } = useAuthenticator();

  const handleLogout = async () => {
    await signOut();
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
}
