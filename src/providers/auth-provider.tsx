"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <Authenticator
      initialState="signIn"
      loginMechanisms={["email"]}
      signUpAttributes={["email"]}
      socialProviders={[]}
      hideSignUp={true}
    >
      {children}
    </Authenticator>
  );
}
