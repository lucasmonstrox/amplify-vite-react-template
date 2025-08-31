import { useState, useEffect, useCallback } from "react";
import { generateClient } from "aws-amplify/api";
import { Attachment } from "@/API";
import { getAttachment } from "@/queries";

const client = generateClient();

export function useAttachment(id: string) {
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttachment = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await client.graphql({
        query: getAttachment,
        variables: { id },
      });
      setAttachment(response.data.getAttachment || null);
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
