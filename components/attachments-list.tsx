"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GdeType,
  DocumentType,
  gdeTypeLabels,
  documentTypeLabels,
} from "@/lib/types";
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useAttachments } from "@/lib/hooks/use-attachments";
import { Loading } from "@/components/ui/loading";
import { Schema } from "@/amplify/data/resource";

type Attachment = Schema["Attachment"];

export function AttachmentsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gdeTypeFilter, setGdeTypeFilter] = useState<GdeType | "all">("all");
  const [documentTypeFilter, setDocumentTypeFilter] = useState<
    DocumentType | "all"
  >("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { attachments, loading, error, refetch } = useAttachments();

  const filteredAttachments = useMemo(() => {
    return attachments.filter((attachment) => {
      // Extrair dados do JSON para filtros
      const data = (attachment as any).data as any;
      const gdeType = data?.gdeType;
      const documentType = data?.documentType;
      const fileName = data?.fileName;
      const submittedAt = data?.submittedAt ? new Date(data.submittedAt) : null;

      const matchesSearch =
        searchTerm === "" ||
        (data?.documentTypeLabel &&
          data.documentTypeLabel
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (fileName && fileName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesGdeType =
        gdeTypeFilter === "all" || gdeType === gdeTypeFilter;
      const matchesDocumentType =
        documentTypeFilter === "all" || documentType === documentTypeFilter;

      // Filtro por data
      let matchesDate = true;
      if (startDate || endDate) {
        if (!submittedAt) {
          matchesDate = false;
        } else {
          const start = startDate ? new Date(startDate + "T00:00:00") : null;
          const end = endDate ? new Date(endDate + "T23:59:59") : null;

          if (start && submittedAt < start) {
            matchesDate = false;
          }
          if (end && submittedAt > end) {
            matchesDate = false;
          }
        }
      }

      return (
        matchesSearch && matchesGdeType && matchesDocumentType && matchesDate
      );
    });
  }, [
    attachments,
    searchTerm,
    gdeTypeFilter,
    documentTypeFilter,
    startDate,
    endDate,
  ]);

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

  const clearFilters = () => {
    setSearchTerm("");
    setGdeTypeFilter("all");
    setDocumentTypeFilter("all");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Listagem de Anexos
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Visualize e gerencie todas as submissões de anexos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refetch} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
          <Link href="/attachments/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Novo Anexo
            </Button>
          </Link>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            {/* Linha principal com busca e ações */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar por documento ou arquivo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              </div>
            </div>

            {/* Filtros avançados colapsáveis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Select
                value={gdeTypeFilter}
                onValueChange={(value) =>
                  setGdeTypeFilter(value as GdeType | "all")
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Tipo de GDE" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {Object.entries(gdeTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={documentTypeFilter}
                onValueChange={(value) =>
                  setDocumentTypeFilter(value as DocumentType | "all")
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Tipo de documento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os documentos</SelectItem>
                  {Object.entries(documentTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="date"
                  placeholder="Data inicial"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10 h-9"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="date"
                  placeholder="Data final"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10 h-9"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Submissões ({filteredAttachments.length})</CardTitle>
          <CardDescription>
            Lista de todas as submissões de anexos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo GDE</TableHead>
                  <TableHead>Tipo de Documento</TableHead>
                  <TableHead>Data de Submissão</TableHead>
                  <TableHead>Arquivo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-slate-500"
                    >
                      <Loading message="Carregando attachments..." />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-slate-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span>Erro ao carregar attachments: {error}</span>
                        <Button variant="outline" size="sm" onClick={refetch}>
                          Tentar novamente
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredAttachments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-slate-500"
                    >
                      Nenhuma submissão encontrada com os filtros aplicados
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttachments.map((attachment) => {
                    const data = (attachment as any).data as any;
                    const gdeType = data?.gdeType as GdeType;
                    const documentType = data?.documentType as DocumentType;
                    const fileName = data?.fileName;
                    const fileSize = data?.fileSize;
                    const submittedAt = data?.submittedAt
                      ? new Date(data.submittedAt)
                      : null;
                    const documentTypeLabel =
                      data?.documentTypeLabel ||
                      documentTypeLabels[documentType] ||
                      "Documento";

                    return (
                      <TableRow key={(attachment as any).id}>
                        <TableCell className="font-medium">
                          {gdeType ? gdeTypeLabels[gdeType] : "-"}
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {documentTypeLabel}
                        </TableCell>
                        <TableCell>
                          {submittedAt ? formatDate(submittedAt) : "-"}
                        </TableCell>
                        <TableCell>
                          {fileName ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {fileName}
                              </span>
                              <span className="text-xs text-slate-500">
                                ({formatFileSize(fileSize)})
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/attachments/${(attachment as any).id}`}
                            >
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            {fileName && (
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
