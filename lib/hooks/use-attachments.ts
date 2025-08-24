import { useState, useEffect } from "react";
import { client } from "@/lib/graphql-client";
import { Schema } from "@/amplify/data/resource";

type Attachment = Schema["Attachment"];

export function useAttachments() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttachments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await client.models.Attachment.list();
      setAttachments(response.data);
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
