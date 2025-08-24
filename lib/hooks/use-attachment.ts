import { useState, useEffect } from "react";
import { client } from "@/lib/graphql-client";
import { Schema } from "@/amplify/data/resource";

type Attachment = Schema["Attachment"];

export function useAttachment(id: string) {
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttachment = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await client.models.Attachment.get({ id });
      setAttachment(response.data);
    } catch (err) {
      console.error("Erro ao buscar attachment:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAttachment();
    }
  }, [id]);

  return {
    attachment,
    loading,
    error,
    refetch: fetchAttachment,
  };
}
