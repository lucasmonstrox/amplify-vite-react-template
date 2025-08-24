import { client } from "@/lib/graphql-client";

// Exemplo de como criar um Attachment
export async function createExampleAttachment() {
  try {
    const attachmentData = {
      gdeType: "emissao" as const,
      documentType: "proposta-estagio" as const,
      documentTypeLabel: "Proposta de Estágio (Anexo I)",
      submittedAt: new Date().toISOString(),
      status: "pending" as const,
      fileName: "exemplo_proposta.pdf",
      fileSize: 1024000,
    };

    const result = await client.models.Attachment.create({
      data: attachmentData,
    });

    console.log("Attachment criado:", result);
    return result;
  } catch (error) {
    console.error("Erro ao criar attachment:", error);
    throw error;
  }
}

// Exemplo de como listar todos os Attachments
export async function listAllAttachments() {
  try {
    const result = await client.models.Attachment.list();
    console.log("Attachments encontrados:", result.data);
    return result.data;
  } catch (error) {
    console.error("Erro ao listar attachments:", error);
    throw error;
  }
}
