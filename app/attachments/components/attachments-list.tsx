"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Eye, Download, Search, RefreshCw } from "lucide-react";
import { useAttachments } from "@/lib/hooks/use-attachments";
import { Loading } from "@/components/ui/loading";
import {
  GdeType,
  DocumentType,
  gdeTypeLabels,
  documentTypeLabels,
} from "@/lib/types";

interface AttachmentData {
  gdeType?: GdeType;
  documentType?: DocumentType;
  fileName?: string;
  fileSize?: number;
  submittedAt?: string;
  documentTypeLabel?: string;
}

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
      const data = attachment.data
        ? (JSON.parse(attachment.data) as AttachmentData)
        : ({} as AttachmentData);
      const gdeType = data.gdeType;
      const documentType = data.documentType;
      const fileName = data.fileName;
      const submittedAt = data.submittedAt ? new Date(data.submittedAt) : null;

      const matchesSearch =
        searchTerm === "" ||
        (data.documentTypeLabel &&
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros
          </CardTitle>
          <CardDescription>
            Filtre as submissões por tipo, data e texto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <Input
                id="search"
                placeholder="Buscar por texto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gdeType">Tipo de GDE</Label>
              <Select
                value={gdeTypeFilter}
                onValueChange={(value) =>
                  setGdeTypeFilter(value as GdeType | "all")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="emissao">Emissão</SelectItem>
                  <SelectItem value="submissao">Submissão</SelectItem>
                  <SelectItem value="resumo">Resumo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="documentType">Tipo de Documento</Label>
              <Select
                value={documentTypeFilter}
                onValueChange={(value) =>
                  setDocumentTypeFilter(value as DocumentType | "all")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="proposta-estagio">
                    Proposta de Estágio
                  </SelectItem>
                  <SelectItem value="protocolo-estagio">
                    Protocolo de Estágio
                  </SelectItem>
                  <SelectItem value="requerimento-ucs-atraso">
                    Requerimento a Estágio com UCs em Atraso
                  </SelectItem>
                  <SelectItem value="plano-estagio">
                    Plano de Estágio
                  </SelectItem>
                  <SelectItem value="ata-reuniao-orientador-estagiario">
                    Ata de Reunião Orientador e Estagiário
                  </SelectItem>
                  <SelectItem value="ata-reuniao-orientador-supervisor-estagiario">
                    Ata de Reunião Orientador, Supervisor e Estagiário
                  </SelectItem>
                  <SelectItem value="registro-presencas-diarias">
                    Registo de Presenças Diárias
                  </SelectItem>
                  <SelectItem value="parecer-orientador">
                    Parecer do Orientador
                  </SelectItem>
                  <SelectItem value="parecer-supervisor">
                    Parecer do Supervisor
                  </SelectItem>
                  <SelectItem value="requerimento-adiamento-relatorio">
                    Requerimento de Adiamento de Entrega do Relatório
                  </SelectItem>
                  <SelectItem value="relatorio-estagio">
                    Relatório de Estágio
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateRange">Período</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Data inicial"
                />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="Data final"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Submissões</CardTitle>
          <CardDescription>
            {filteredAttachments.length} submissão(ões) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>GDE</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Data</TableHead>
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
                    const data = attachment.data
                      ? (JSON.parse(attachment.data) as AttachmentData)
                      : ({} as AttachmentData);
                    const gdeType = data.gdeType;
                    const documentType = data.documentType;
                    const fileName = data.fileName;
                    const fileSize = data.fileSize;
                    const submittedAt = data.submittedAt
                      ? new Date(data.submittedAt)
                      : null;
                    const documentTypeLabel =
                      data.documentTypeLabel ||
                      (documentType
                        ? documentTypeLabels[documentType]
                        : "Documento");

                    return (
                      <TableRow key={attachment.id}>
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
                            <Link href={`/attachments/${attachment.id}`}>
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
