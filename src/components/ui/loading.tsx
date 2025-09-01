import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loading({
  message = "Carregando...",
  size = "md",
  className = "",
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 text-slate-500 ${className}`}
    >
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      <span>{message}</span>
    </div>
  );
}
