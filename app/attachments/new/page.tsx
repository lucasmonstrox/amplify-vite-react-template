"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { AttachmentForm } from "@/components/attachment-form";

function NewAttachmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Submeter Anexo
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Preencha as informações necessárias e selecione o arquivo para
            upload. Certifique-se de que o arquivo está no formato correto (PDF,
            DOC ou DOCX).
          </p>
        </div>
        <AttachmentForm />
      </div>
    </div>
  );
}

export default withAuthenticator(NewAttachmentPage);
