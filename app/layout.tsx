import "./globals.css";
import "@aws-amplify/ui-react/styles.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AmplifyProvider } from "@/components/amplify-provider";
import { AuthProvider } from "@/components/auth-provider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rui2K - Sistema de Anexos",
  description: "Sistema de gerenciamento de anexos para estágios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <AmplifyProvider>
          <AuthProvider>{children}</AuthProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}
