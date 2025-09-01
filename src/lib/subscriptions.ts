import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

export const subscribeToAttachmentCreated = (callback: (attachment: Schema["Attachment"]["type"]) => void) => {
  return client.models.Attachment.onCreate().subscribe({
    next: (attachment) => {
      callback(attachment);
    },
    error: (error) => {
      console.error("Erro na subscription de criação:", error);
    },
  });
};

export const subscribeToAttachmentUpdated = (callback: (attachment: Schema["Attachment"]["type"]) => void) => {
  return client.models.Attachment.onUpdate().subscribe({
    next: (attachment) => {
      callback(attachment);
    },
    error: (error) => {
      console.error("Erro na subscription de atualização:", error);
    },
  });
};

export const subscribeToAttachmentDeleted = (callback: (attachment: Schema["Attachment"]["type"]) => void) => {
  return client.models.Attachment.onDelete().subscribe({
    next: (attachment) => {
      callback(attachment);
    },
    error: (error) => {
      console.error("Erro na subscription de exclusão:", error);
    },
  });
};
