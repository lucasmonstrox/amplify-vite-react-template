"use client";

import { Amplify } from "aws-amplify";
import { ReactNode, useEffect } from "react";
import awsExports from "../amplify_outputs.json";

type AmplifyProviderProps = {
  children: ReactNode;
};

export function AmplifyProvider({ children }: AmplifyProviderProps) {
  useEffect(() => {
    Amplify.configure(awsExports);
  }, []);

  return <>{children}</>;
}
