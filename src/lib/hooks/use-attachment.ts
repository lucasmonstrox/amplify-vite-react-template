import { useState, useEffect, useCallback } from "react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

export function useAttachment(id: string) {
  const [attachment, setAttachment] = useState<
    Schema["Attachment"]["type"] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttachment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await client.models.Attachment.get({ id });

      // Processa o attachment para decodificar o campo data
      if (response.data) {
        try {
          // Se data for uma string, tenta fazer parse para JSON
          if (typeof response.data.data === "string") {
            setAttachment({
              ...response.data,
              data: JSON.parse(response.data.data),
            });
          } else {
            // Se já for um objeto, retorna como está
            setAttachment(response.data);
          }
        } catch (parseError) {
          console.warn(
            `Erro ao fazer parse do data para attachment ${response.data.id}:`,
            parseError
          );
          // Em caso de erro no parse, retorna o attachment original
          setAttachment(response.data);
        }
      } else {
        setAttachment(null);
      }
    } catch (err) {
      console.error("Erro ao buscar attachment:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAttachment();
    }
  }, [id, fetchAttachment]);

  return {
    attachment,
    loading,
    error,
    refetch: fetchAttachment,
  };
}
