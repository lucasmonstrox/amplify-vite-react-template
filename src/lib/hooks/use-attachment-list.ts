import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

export function useAttachmentList() {
  const [attachments, setAttachments] = useState<
    Array<Schema["Attachment"]["type"]>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttachments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await client.models.Attachment.list();

      // Processa cada attachment para decodificar o campo data
      const processedAttachments = (response.data || []).map((attachment) => {
        try {
          // Se data for uma string, tenta fazer parse para JSON
          if (typeof attachment.data === "string") {
            return {
              ...attachment,
              data: JSON.parse(attachment.data),
            };
          }
          // Se já for um objeto, retorna como está
          return attachment;
        } catch (parseError) {
          console.warn(
            `Erro ao fazer parse do data para attachment ${attachment.id}:`,
            parseError
          );
          // Em caso de erro no parse, retorna o attachment original
          return attachment;
        }
      });

      // Ordena os attachments pela data de submissão (do mais recente para o menos recente)
      const sortedAttachments = processedAttachments.sort((a, b) => {
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

      setAttachments(sortedAttachments);
    } catch (err) {
      console.error("Erro ao buscar attachments:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, []);

  return {
    attachments,
    loading,
    error,
    refetch: fetchAttachments,
  };
}
