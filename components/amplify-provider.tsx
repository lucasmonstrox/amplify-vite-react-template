"use client";

import { Amplify } from "aws-amplify";
import { ReactNode } from "react";
import awsExports from "../amplify_outputs.json";

type AmplifyProviderProps = {
  children: ReactNode;
};

// Configuração específica para autenticação
const config = {
  ...awsExports,
  Auth: {
    ...awsExports.auth,
    // Configurações para manter a sessão
    cookieStorage: {
      domain: "localhost",
      path: "/",
      expires: 365,
      secure: false,
    },
  },
};

console.log("Configurando Amplify com:", config);
Amplify.configure(config);

export function AmplifyProvider({ children }: AmplifyProviderProps) {
  return <>{children}</>;
}
