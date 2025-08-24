import Link from "next/link"
import { MainNav } from "./main-nav"
import { LogoutButton } from "./logout-button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between w-full px-4">
        <div className="flex items-center">
          <Link href="/attachments" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Rui2K
            </span>
          </Link>
          <MainNav />
        </div>
        <div className="ml-auto">
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
