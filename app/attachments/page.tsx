"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { AttachmentsList } from "./components/attachments-list";

export default function AttachmentsPage() {
  const { user } = useAuthenticator();

  if (!user) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="container mx-auto py-8">
        <AttachmentsList />
      </div>
    </div>
  );
}
