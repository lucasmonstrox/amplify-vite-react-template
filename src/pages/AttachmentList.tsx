import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { DatePicker } from "../components/ui/date-picker";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Plus, Eye, Download, Search, RefreshCw } from "lucide-react";
import { useAttachmentList } from "../lib/hooks/use-attachment-list";
import { Loading } from "../components/ui/loading";
import {
  GdeType,
  DocumentType,
  gdeTypeLabels,
  documentTypeLabels,
} from "../lib/types";

interface AttachmentData {
  gdeType?: GdeType;
  documentType?: DocumentType;
  fileName?: string;
  fileSize?: number;
  submittedAt?: string;
  documentTypeLabel?: string;
}

export function AttachmentsListPage() {
  const [gdeTypeFilter, setGdeTypeFilter] = useState<GdeType | "all">("all");
  const [documentTypeFilter, setDocumentTypeFilter] = useState<
    DocumentType | "all"
  >("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { attachments, loading, error, refetch } = useAttachmentList();

  const filteredAttachments = useMemo(() => {
    return attachments.filter((attachment) => {
      // O campo data já vem decodificado dos hooks, não precisa mais fazer JSON.parse
      const data = (attachment.data as AttachmentData) || {};
      const gdeType = data.gdeType;
      const documentType = data.documentType;
      const submittedAt = data.submittedAt ? new Date(data.submittedAt) : null;

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
          // Filtro por range de datas
          if (startDate && endDate) {
            // Range: data deve estar entre startDate e endDate (inclusive)
            const start = new Date(startDate + "T00:00:00");
            const end = new Date(endDate + "T23:59:59");

            if (submittedAt < start || submittedAt > end) {
              matchesDate = false;
            }
          } else if (startDate) {
            // Apenas data inicial: a partir de (inclusive)
            const start = new Date(startDate + "T00:00:00");
            if (submittedAt < start) {
              matchesDate = false;
            }
          } else if (endDate) {
            // Apenas data final: até (inclusive)
            const end = new Date(endDate + "T23:59:59");
            if (submittedAt > end) {
              matchesDate = false;
            }
          }
        }
      }

      return matchesGdeType && matchesDocumentType && matchesDate;
    });
  }, [attachments, gdeTypeFilter, documentTypeFilter, startDate, endDate]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatDateForFilter = (date: Date) => {
    // Formatar data no formato YYYY-MM-DD usando fuso horário local
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const clearFilters = () => {
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
          <Link to="/attachments/new">
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
            Filtre as submissões por tipo e período de data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="space-y-2" style={{ width: "20%" }}>
              <Label htmlFor="gdeType">Tipo de GDE</Label>
              <Select
                value={gdeTypeFilter}
                onValueChange={(value) =>
                  setGdeTypeFilter(value as GdeType | "all")
                }
              >
                <SelectTrigger className="w-full">
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
            <div className="space-y-2" style={{ width: "20%" }}>
              <Label htmlFor="documentType">Tipo de Documento</Label>
              <Select
                value={documentTypeFilter}
                onValueChange={(value) =>
                  setDocumentTypeFilter(value as DocumentType | "all")
                }
              >
                <SelectTrigger className="w-full">
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
            <div className="space-y-2" style={{ width: "20%" }}>
              <Label htmlFor="startDate">Data Inicial</Label>
              <DatePicker
                date={startDate ? new Date(startDate) : undefined}
                onDateChange={(date) =>
                  setStartDate(date ? formatDateForFilter(date) : "")
                }
                placeholder="Data inicial"
              />
            </div>
            <div className="space-y-2" style={{ width: "20%" }}>
              <Label htmlFor="endDate">Data Final</Label>
              <DatePicker
                date={endDate ? new Date(endDate) : undefined}
                onDateChange={(date) =>
                  setEndDate(date ? formatDateForFilter(date) : "")
                }
                placeholder="Data final"
              />
            </div>
            <div className="space-y-2" style={{ width: "20%" }}>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Limpar Filtros
              </Button>
            </div>
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
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-8 text-slate-500"
                    >
                      <Loading message="A carregar anexos..." />
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
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
                      colSpan={4}
                      className="text-center py-8 text-slate-500"
                    >
                      Nenhuma submissão encontrada com os filtros aplicados
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttachments.map((attachment) => {
                    // O campo data já vem decodificado dos hooks, não precisa mais fazer JSON.parse
                    const data = (attachment.data as AttachmentData) || {};
                    const gdeType = data.gdeType;
                    const documentType = data.documentType;
                    const fileName = data.fileName;
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

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/attachments/${attachment.id}`}>
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
