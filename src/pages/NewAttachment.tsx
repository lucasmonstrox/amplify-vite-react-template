import { AttachmentForm } from "../components/attachment-form";

export function NewAttachmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Novo Anexo
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Preencha os dados para criar um novo anexo
        </p>
      </div>

      <AttachmentForm />
    </div>
  );
}
