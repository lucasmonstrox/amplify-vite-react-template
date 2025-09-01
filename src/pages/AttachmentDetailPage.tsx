import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Edit, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Loading } from "../components/ui/loading";
import { useAttachment } from "../lib/hooks/use-attachment";
import { deleteAttachment } from "../lib/mutations";
import {
  gdeTypeLabels,
  documentTypeLabels,
} from "../lib/types";

interface AttachmentData {
  gdeType?: string;
  documentType?: string;
  fileName?: string;
  fileSize?: number;
  submittedAt?: string;
  documentTypeLabel?: string;
  [key: string]: string | number | boolean | undefined;
}

export function AttachmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { attachment, loading, error, refetch } = useAttachment(id || "");

  const handleDelete = async () => {
    if (!id || !confirm("Tem certeza que deseja excluir este attachment?")) {
      return;
    }

    try {
      await deleteAttachment(id);
      navigate("/attachments");
    } catch (err) {
      console.error("Erro ao deletar attachment:", err);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "-";
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading message="Carregando attachment..." />
      </div>
    );
  }

  if (error || !attachment) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Erro ao carregar attachment
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => refetch()}>Tentar novamente</Button>
            <Button variant="outline" onClick={() => navigate("/attachments")}>
              Voltar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const data = attachment.data && typeof attachment.data === 'string'
    ? (JSON.parse(attachment.data) as AttachmentData)
    : ({} as AttachmentData);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/attachments")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Detalhes do Anexo
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              ID: {attachment.id}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/attachments/${id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Tipo de GDE
              </label>
              <p className="text-sm">
                {data.gdeType ? gdeTypeLabels[data.gdeType as keyof typeof gdeTypeLabels] : "-"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Tipo de Documento
              </label>
              <p className="text-sm">
                {data.documentTypeLabel ||
                  (data.documentType
                    ? documentTypeLabels[data.documentType as keyof typeof documentTypeLabels]
                    : "-")}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Data de Submissão
              </label>
              <p className="text-sm">{formatDate(data.submittedAt)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Status
              </label>
              <p className="text-sm capitalize">{data.status || "pending"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arquivo */}
      {data.fileName && (
        <Card>
          <CardHeader>
            <CardTitle>Arquivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{data.fileName}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(data.fileSize)}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dados Específicos */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Específicos</CardTitle>
          <CardDescription>
            Campos específicos do tipo de documento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(data).map(([key, value]) => {
              // Pular campos básicos já mostrados
              if (
                [
                  "gdeType",
                  "documentType",
                  "fileName",
                  "fileSize",
                  "submittedAt",
                  "status",
                  "documentTypeLabel",
                ].includes(key)
              ) {
                return null;
              }

              if (!value || value === "") {
                return null;
              }

              return (
                <div key={key} className="border-b pb-2">
                  <label className="text-sm font-medium text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <p className="text-sm mt-1">{String(value)}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
