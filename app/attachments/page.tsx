"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { AttachmentsList } from "@/components/attachments-list";

function AttachmentsPage() {
  return (
    <div className="p-4">
      <div className="container mx-auto py-8">
        <AttachmentsList />
      </div>
    </div>
  );
}

// Configuração específica do withAuthenticator
export default withAuthenticator(AttachmentsPage, {
  initialState: "signIn",
  loginMechanisms: ["email"],
  signUpAttributes: ["email"],
  socialProviders: [],
  hideSignUp: true,
});
