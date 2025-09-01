import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export const listAttachments = async () => {
  try {
    const response = await client.models.Attachment.list();
    return response.data || [];
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
