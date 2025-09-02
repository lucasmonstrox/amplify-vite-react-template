import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export const listAttachments = async () => {
  try {
    const response = await client.models.Attachment.list();
    const attachments = response.data || [];

    // Ordena os attachments pela data de submissão (do mais recente para o menos recente)
    const sortedAttachments = attachments.sort((a, b) => {
      const dataA = a.data as any;
      const dataB = b.data as any;

      const dateA = dataA?.submittedAt
        ? new Date(dataA.submittedAt)
        : new Date(0);
      const dateB = dataB?.submittedAt
        ? new Date(dataB.submittedAt)
        : new Date(0);

      // Ordenação decrescente (mais recente primeiro)
      return dateB.getTime() - dateA.getTime();
    });

    return sortedAttachments;
  } catch (error) {
    console.error("Erro ao listar attachments:", error);
    throw error;
  }
};

export const getAttachment = async (id: string) => {
  try {
    const response = await client.models.Attachment.get({ id });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar attachment:", error);
    throw error;
  }
};
