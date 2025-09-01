export type GdeType = "emissao" | "submissao" | "resumo";

export type DocumentType =
  | "proposta-estagio"
  | "protocolo-estagio"
  | "requerimento-ucs-atraso"
  | "plano-estagio"
  | "ata-reuniao-orientador-estagiario"
  | "ata-reuniao-orientador-supervisor-estagiario"
  | "registro-presencas-diarias"
  | "parecer-orientador"
  | "parecer-supervisor"
  | "requerimento-adiamento-relatorio"
  | "relatorio-estagio";

export interface AttachmentSubmission {
  id: string;
  gdeType: GdeType;
  documentType: DocumentType;
  documentTypeLabel: string;
  hours?: string;
  submittedAt: Date;
  fileName?: string;
  fileSize?: number;
}

export const documentTypeLabels: Record<DocumentType, string> = {
  "proposta-estagio": "Proposta de Estágio (Anexo I)",
  "protocolo-estagio": "Protocolo de Estágio (Anexo II)",
  "requerimento-ucs-atraso":
    "Requerimento a Estágio com UCs em Atraso (Art. 14)",
  "plano-estagio": "Plano de Estágio (Anexo III)",
  "ata-reuniao-orientador-estagiario":
    "Ata de Reunião Orientador e Estagiário (Anexo IV)",
  "ata-reuniao-orientador-supervisor-estagiario":
    "Ata de Reunião Orientador, Supervisor e Estagiário (Anexo V)",
  "registro-presencas-diarias": "Registo de Presenças Diárias (Anexo VI)",
  "parecer-orientador": "Parecer do Orientador (Anexo VIII)",
  "parecer-supervisor": "Parecer do Supervisor (Anexo IX)",
  "requerimento-adiamento-relatorio":
    "Requerimento de Adiamento de Entrega do Relatório de Estágio (Anexo X)",
  "relatorio-estagio": "Relatório de Estágio",
};

export const gdeTypeLabels: Record<GdeType, string> = {
  emissao: "Emissão",
  submissao: "Submissão",
  resumo: "Resumo",
};
