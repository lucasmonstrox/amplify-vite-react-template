import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { Attachment } from "@/API";
import { listAttachments } from "@/queries";

const client = generateClient();

export function useAttachments() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttachments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await client.graphql({
        query: listAttachments,
      });
      setAttachments(response.data.listAttachments.items || []);
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
