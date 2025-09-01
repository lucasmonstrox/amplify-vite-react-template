import { useAuthenticator } from "@aws-amplify/ui-react";
import { MainNav } from "./main-nav";
import { LogoutButton } from "./logout-button";

export function Header() {
  const { user } = useAuthenticator();

  // Só renderiza o header se o usuário estiver autenticado
  if (!user) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between w-full px-4">
        <div className="flex items-center">
          <span className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Rui2K</span>
          </span>
          <MainNav />
        </div>
        <div className="ml-auto">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
