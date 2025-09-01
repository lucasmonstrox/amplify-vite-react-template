import { useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export function MainNav() {
  const location = useLocation();

  const routes = [
    {
      href: "/attachments",
      label: "Anexos",
      active: location.pathname.startsWith("/attachments"),
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <a
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </a>
      ))}
    </nav>
  );
}
