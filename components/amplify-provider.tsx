"use client";

import { Amplify } from "aws-amplify";
import { ReactNode } from "react";
import outputs from "../amplify_outputs.json";

type AmplifyProviderProps = {
  children: ReactNode;
};

Amplify.configure(outputs);

export function AmplifyProvider({ children }: AmplifyProviderProps) {
  return <>{children}</>;
}
