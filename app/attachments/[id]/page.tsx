"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Download,
  Calendar,
  FileText,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  GdeType,
  DocumentType,
  gdeTypeLabels,
  documentTypeLabels,
} from "@/lib/types";
import { useAttachment } from "@/lib/hooks/use-attachment";
import { Loading } from "@/components/ui/loading";

interface AttachmentData {
  gdeType?: GdeType;
  documentType?: DocumentType;
  fileName?: string;
  fileSize?: number;
  submittedAt?: string;
  status?: string;
  hours?: string;
  documentTypeLabel?: string;
}

function AttachmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { attachment, loading, error } = useAttachment(id);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "-";
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Aprovado";
      case "rejected":
        return "Rejeitado";
      case "pending":
        return "Pendente";
      default:
        return "Desconhecido";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loading message="Carregando attachment..." size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !attachment) {
    return (
      <div className="p-4">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Attachment não encontrado
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {error || "O attachment solicitado não foi encontrado."}
              </p>
              <Button onClick={() => router.push("/attachments")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar à listagem
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const data = attachment.data
    ? (JSON.parse(attachment.data) as AttachmentData)
    : ({} as AttachmentData);
  const gdeType = data.gdeType;
  const documentType = data.documentType;
  const fileName = data.fileName;
  const fileSize = data.fileSize;
  const status = data.status || "pending";
  const hours = data.hours;
  const documentTypeLabel =
    data.documentTypeLabel ||
    (documentType ? documentTypeLabels[documentType] : "Documento");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => router.push("/attachments")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Detalhes do Attachment
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Visualize as informações completas desta submissão
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações principais */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card de informações básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informações do Documento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Tipo de GDE
                    </label>
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      {gdeType ? gdeTypeLabels[gdeType] : "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Tipo de Documento
                    </label>
                    <p className="text-slate-900 dark:text-slate-100 font-medium">
                      {documentTypeLabel}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Status
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(status)}
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(
                          status
                        )}`}
                      >
                        {getStatusLabel(status)}
                      </span>
                    </div>
                  </div>
                  {hours && (
                    <div>
                      <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Horas
                      </label>
                      <p className="text-slate-900 dark:text-slate-100 font-medium">
                        {hours}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Card de arquivo */}
            {fileName && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Arquivo Anexado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {fileName}
                        </p>
                        <p className="text-sm text-slate-500">
                          {formatFileSize(fileSize)}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Card de dados JSON (para debug) */}
            <Card>
              <CardHeader>
                <CardTitle>Dados Completos</CardTitle>
                <CardDescription>
                  Informações técnicas do attachment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm overflow-x-auto">
                  {JSON.stringify(attachment, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card de metadados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Metadados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    ID do Attachment
                  </label>
                  <p className="text-sm text-slate-900 dark:text-slate-100 font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded">
                    {attachment.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Criado em
                  </label>
                  <p className="text-slate-900 dark:text-slate-100">
                    {attachment.createdAt
                      ? formatDate(new Date(attachment.createdAt))
                      : "-"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Card de ações */}
            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Visualizar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(AttachmentDetailPage);
