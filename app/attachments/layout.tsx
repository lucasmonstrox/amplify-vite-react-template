import { ReactNode } from "react";
import { Header } from "@/components/header";

type AttachmentsLayoutProps = {
  children: ReactNode;
};

export default function AttachmentsLayout({
  children,
}: AttachmentsLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      {children}
    </div>
  );
}
