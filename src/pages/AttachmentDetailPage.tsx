import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
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
import { gdeTypeLabels, documentTypeLabels } from "../lib/types";

interface AttachmentData {
  gdeType?: string;
  documentType?: string;
  fileName?: string;
  fileSize?: number;
  submittedAt?: string;
  documentTypeLabel?: string;
  status?: string;

  // Campos específicos para Proposta de Estágio (Anexo I)
  telefoneAluno?: string;
  temasAreas?: string;
  orientadorDocente?: string;
  emailOrientador?: string;
  temLocalEstagio?: string;

  // Campos condicionais da entidade de acolhimento (8-17)
  nomeEntidadeAcolhimento?: string;
  moradaEntidadeAcolhimento?: string;
  codigoPostalEntidadeAcolhimento?: string;
  telefoneEntidadeAcolhimento?: string;
  emailEntidadeAcolhimento?: string;
  pessoaContactadaEntidadeAcolhimento?: string;
  cargoPessoaContactadaEntidadeAcolhimento?: string;
  supervisorEntidadeAcolhimento?: string;
  emailSupervisorEntidadeAcolhimento?: string;
  cargoSupervisorEntidadeAcolhimento?: string;

  // Campos específicos para Protocolo de Estágio (Anexo II)
  dataInicioEstagio?: string;
  dataFinalizacaoEstagio?: string;
  empresaEstagio?: string;
  nomeRepresentanteEntidadeAcolhimento?: string;
  nipcEntidadeAcolhimento?: string;
  caeEntidadeAcolhimento?: string;
  localEstagio?: string;

  // Campos específicos para Requerimento a Estágio com UCs em Atraso (Art. 14)
  telefoneAlunoArt14?: string;
  numeroUcsAtraso?: string;
  nomeUcsAtraso?: string;

  // Campos específicos para Plano de Estágio (Anexo III)
  temasAreasEA3?: string;
  objetivosPlanoTrabalho?: string;
  nomeOrientadorEA3?: string;
  emailOrientadorEA3?: string;
  supervisorEntidade?: string;
  emailSupervisor?: string;
  cargoSupervisor?: string;
  horaInicio?: string;
  horaFim?: string;

  // Campos específicos para Ata de Reunião Orientador e Estagiário (Anexo IV)
  numeroAta?: string;
  diaReuniao?: string;
  mesReuniao?: string;
  horasReuniao?: string;
  minutosReuniao?: string;
  horasConclusao?: string;
  localReuniao?: string;
  ordemTrabalhos?: string;

  // Campos específicos para Ata de Reunião Orientador, Supervisor e Estagiário (Anexo V)
  numeroAtaEA5?: string;
  diaReuniaoEA5?: string;
  mesReuniaoEA5?: string;
  horasReuniaoEA5?: string;
  horasConclusaoEA5?: string;
  escolaOrientador?: string;
  ordemTrabalhosEA5?: string;

  // Campos específicos para Parecer do Supervisor (Anexo IX)
  atitudeDesempenho?: string;
  aplicacaoConceitos?: string;
  grauDificuldade?: string;

  // Campos específicos para Requerimento de Adiamento de Entrega do Relatório de Estágio (Anexo X)
  escolaAluno?: string;
  motivosAdiamento?: string;
  adiamentoAte?: string;

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

  const formatTime = (timeString?: string) => {
    if (!timeString) return "-";
    return timeString;
  };

  const getEmpresaLabel = (empresa?: string) => {
    switch (empresa) {
      case "bosch":
        return "Bosch Car Multimedia Portugal, S.A.";
      case "deloitte":
        return "Deloitte Delivery Center. S.A. (Curso Tecnologias de Inovação Informática)";
      case "outra":
        return "Outra Empresa";
      default:
        return empresa || "-";
    }
  };

  const getLocalEstagioLabel = (local?: string) => {
    switch (local) {
      case "sim":
        return "Sim";
      case "nao":
        return "Não";
      default:
        return local || "-";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading message="A carregar anexo..." />
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

  // Garantir que data seja um objeto válido
  const processedData: AttachmentData = (() => {
    if (!attachment.data) return {};

    if (typeof attachment.data === "string") {
      try {
        return JSON.parse(attachment.data);
      } catch (error) {
        console.warn("Erro ao fazer parse do data:", error);
        return {};
      }
    }

    if (typeof attachment.data === "object" && attachment.data !== null) {
      return attachment.data as AttachmentData;
    }

    return {};
  })();

  console.log("Dados finais processados:", processedData);

  // Determinar o tipo de documento para mostrar campos específicos
  const documentType = processedData.documentType;
  const gdeType = processedData.gdeType;

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
          <Button variant="destructive" size="sm" onClick={handleDelete}>
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
                {processedData.gdeType
                  ? gdeTypeLabels[
                      processedData.gdeType as keyof typeof gdeTypeLabels
                    ]
                  : "-"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Tipo de Documento
              </label>
              <p className="text-sm">
                {processedData.documentTypeLabel ||
                  (processedData.documentType
                    ? documentTypeLabels[
                        processedData.documentType as keyof typeof documentTypeLabels
                      ]
                    : "-")}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Data de Submissão
              </label>
              <p className="text-sm">{formatDate(processedData.submittedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Arquivo */}
      {processedData.fileName && (
        <Card>
          <CardHeader>
            <CardTitle>Arquivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{processedData.fileName}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(processedData.fileSize)}
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

      {/* Campos específicos para Proposta de Estágio (Anexo I) */}
      {documentType === "proposta-estagio" && gdeType === "emissao" && (
        <Card>
          <CardHeader>
            <CardTitle>Proposta de Estágio (Anexo I)</CardTitle>
            <CardDescription>
              Campos específicos da proposta de estágio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Telefone do Aluno
                </label>
                <p className="text-sm">{processedData.telefoneAluno || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Tem Local de Estágio
                </label>
                <p className="text-sm">
                  {getLocalEstagioLabel(processedData.temLocalEstagio)}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">
                  Temas ou Áreas Preferenciais
                </label>
                <p className="text-sm">{processedData.temasAreas || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Orientador Docente
                </label>
                <p className="text-sm">
                  {processedData.orientadorDocente || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email do Orientador
                </label>
                <p className="text-sm">
                  {processedData.emailOrientador || "-"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campos condicionais da entidade de acolhimento (8-17) */}
      {documentType === "proposta-estagio" &&
        gdeType === "emissao" &&
        processedData.temLocalEstagio === "sim" && (
          <Card>
            <CardHeader>
              <CardTitle>Entidade de Acolhimento</CardTitle>
              <CardDescription>
                Informações da entidade onde será realizado o estágio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Nome da Entidade de Acolhimento
                  </label>
                  <p className="text-sm">
                    {processedData.nomeEntidadeAcolhimento || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Morada da Entidade de Acolhimento
                  </label>
                  <p className="text-sm">
                    {processedData.moradaEntidadeAcolhimento || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Código Postal da Entidade de Acolhimento
                  </label>
                  <p className="text-sm">
                    {processedData.codigoPostalEntidadeAcolhimento || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Telefone da Entidade de Acolhimento
                  </label>
                  <p className="text-sm">
                    {processedData.telefoneEntidadeAcolhimento || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email da Entidade de Acolhimento
                  </label>
                  <p className="text-sm">
                    {processedData.emailEntidadeAcolhimento || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Pessoa Contactada na Entidade de Acolhimento
                  </label>
                  <p className="text-sm">
                    {processedData.pessoaContactadaEntidadeAcolhimento || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Cargo da Pessoa Contactada na Entidade de Acolhimento
                  </label>
                  <p className="text-sm">
                    {processedData.cargoPessoaContactadaEntidadeAcolhimento ||
                      "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Supervisor na Entidade de Acolhimento
                  </label>
                  <p className="text-sm">
                    {processedData.supervisorEntidadeAcolhimento || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email do Supervisor na Entidade de Acolhimento
                  </label>
                  <p className="text-sm">
                    {processedData.emailSupervisorEntidadeAcolhimento || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Cargo do Supervisor na Entidade de Acolhimento
                  </label>
                  <p className="text-sm">
                    {processedData.cargoSupervisorEntidadeAcolhimento || "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {/* Campos específicos para Protocolo de Estágio (Anexo II) */}
      {documentType === "protocolo-estagio" && gdeType === "emissao" && (
        <Card>
          <CardHeader>
            <CardTitle>Protocolo de Estágio (Anexo II)</CardTitle>
            <CardDescription>
              Campos específicos do protocolo de estágio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Data de Início de Estágio
                </label>
                <p className="text-sm">
                  {formatDate(processedData.dataInicioEstagio)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Data de Finalização de Estágio
                </label>
                <p className="text-sm">
                  {formatDate(processedData.dataFinalizacaoEstagio)}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">
                  Empresa onde irá estagiar
                </label>
                <p className="text-sm">
                  {getEmpresaLabel(processedData.empresaEstagio)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campos adicionais para Protocolo de Estágio (Anexo II) - Step 3 */}
      {documentType === "protocolo-estagio" && gdeType === "emissao" && (
        <Card>
          <CardHeader>
            <CardTitle>Informações da Entidade de Acolhimento</CardTitle>
            <CardDescription>
              Campos específicos da entidade de acolhimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Nome do Representante da Entidade de Acolhimento
                </label>
                <p className="text-sm">
                  {processedData.nomeRepresentanteEntidadeAcolhimento || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  NIPC da Entidade de Acolhimento
                </label>
                <p className="text-sm">
                  {processedData.nipcEntidadeAcolhimento || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  CAE da Entidade de Acolhimento
                </label>
                <p className="text-sm">
                  {processedData.caeEntidadeAcolhimento || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Local de Estágio
                </label>
                <p className="text-sm">{processedData.localEstagio || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campos específicos para Requerimento a Estágio com UCs em Atraso (Art. 14) */}
      {documentType === "requerimento-ucs-atraso" && gdeType === "emissao" && (
        <Card>
          <CardHeader>
            <CardTitle>
              Requerimento a Estágio com UCs em Atraso (Art. 14)
            </CardTitle>
            <CardDescription>
              Campos específicos do requerimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Telefone do Aluno
                </label>
                <p className="text-sm">
                  {processedData.telefoneAlunoArt14 || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Número de UCs em Atraso
                </label>
                <p className="text-sm">
                  {processedData.numeroUcsAtraso || "-"}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">
                  Nome das UCs em Atraso
                </label>
                <p className="text-sm">{processedData.nomeUcsAtraso || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campos específicos para Plano de Estágio (Anexo III) */}
      {documentType === "plano-estagio" && gdeType === "emissao" && (
        <Card>
          <CardHeader>
            <CardTitle>Plano de Estágio (Anexo III)</CardTitle>
            <CardDescription>
              Campos específicos do plano de estágio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">
                  Temas ou Áreas Preferenciais
                </label>
                <p className="text-sm">{processedData.temasAreasEA3 || "-"}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">
                  Objetivos e Plano de Trabalho
                </label>
                <p className="text-sm">
                  {processedData.objetivosPlanoTrabalho || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Nome do Orientador (Docente)
                </label>
                <p className="text-sm">
                  {processedData.nomeOrientadorEA3 || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email do Orientador (Docente)
                </label>
                <p className="text-sm">
                  {processedData.emailOrientadorEA3 || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Supervisor na Entidade de Acolhimento
                </label>
                <p className="text-sm">
                  {processedData.supervisorEntidade || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Email do Supervisor
                </label>
                <p className="text-sm">
                  {processedData.emailSupervisor || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Cargo do Supervisor
                </label>
                <p className="text-sm">
                  {processedData.cargoSupervisor || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Horário de Estágio: Hora de Início
                </label>
                <p className="text-sm">
                  {formatTime(processedData.horaInicio)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Horário de Estágio: Hora de Fim
                </label>
                <p className="text-sm">{formatTime(processedData.horaFim)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campos específicos para Ata de Reunião Orientador e Estagiário (Anexo IV) */}
      {documentType === "ata-reuniao-orientador-estagiario" &&
        gdeType === "emissao" && (
          <Card>
            <CardHeader>
              <CardTitle>
                Ata de Reunião Orientador e Estagiário (Anexo IV)
              </CardTitle>
              <CardDescription>
                Campos específicos da ata de reunião
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Número da Ata
                  </label>
                  <p className="text-sm">{processedData.numeroAta || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Dia da Reunião
                  </label>
                  <p className="text-sm">{processedData.diaReuniao || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Mês da Reunião
                  </label>
                  <p className="text-sm">{processedData.mesReuniao || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Horas da Reunião
                  </label>
                  <p className="text-sm">{processedData.horasReuniao || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Minutos da Reunião
                  </label>
                  <p className="text-sm">
                    {processedData.minutosReuniao || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Horas de Conclusão
                  </label>
                  <p className="text-sm">
                    {processedData.horasConclusao || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Local da Reunião
                  </label>
                  <p className="text-sm">{processedData.localReuniao || "-"}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Ordem de Trabalhos da Reunião
                  </label>
                  <p className="text-sm">
                    {processedData.ordemTrabalhos || "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {/* Campos específicos para Ata de Reunião Orientador, Supervisor e Estagiário (Anexo V) */}
      {documentType === "ata-reuniao-orientador-supervisor-estagiario" &&
        gdeType === "emissao" && (
          <Card>
            <CardHeader>
              <CardTitle>
                Ata de Reunião Orientador, Supervisor e Estagiário (Anexo V)
              </CardTitle>
              <CardDescription>
                Campos específicos da ata de reunião
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Número da Ata
                  </label>
                  <p className="text-sm">{processedData.numeroAtaEA5 || "-"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Dia da Reunião
                  </label>
                  <p className="text-sm">
                    {processedData.diaReuniaoEA5 || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Mês da Reunião
                  </label>
                  <p className="text-sm">
                    {processedData.mesReuniaoEA5 || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Horas da Reunião
                  </label>
                  <p className="text-sm">
                    {processedData.horasReuniaoEA5 || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Horas de Conclusão
                  </label>
                  <p className="text-sm">
                    {processedData.horasConclusaoEA5 || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Escola do Orientador (Docente)
                  </label>
                  <p className="text-sm">
                    {processedData.escolaOrientador || "-"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Ordem de Trabalhos da Reunião
                  </label>
                  <p className="text-sm">
                    {processedData.ordemTrabalhosEA5 || "-"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {/* Campos específicos para Parecer do Supervisor (Anexo IX) */}
      {documentType === "parecer-supervisor" && gdeType === "emissao" && (
        <Card>
          <CardHeader>
            <CardTitle>Parecer do Supervisor (Anexo IX)</CardTitle>
            <CardDescription>
              Campos específicos do parecer do supervisor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Atitude e Desempenho (50% - 0-20 valores)
                </label>
                <p className="text-sm">
                  {processedData.atitudeDesempenho || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Aplicação de Conceitos Aprendidos (30% - 0-20 valores)
                </label>
                <p className="text-sm">
                  {processedData.aplicacaoConceitos || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Grau de Dificuldade (20% - 0-20 valores)
                </label>
                <p className="text-sm">
                  {processedData.grauDificuldade || "-"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campos específicos para Requerimento de Adiamento de Entrega do Relatório de Estágio (Anexo X) */}
      {documentType === "requerimento-adiamento-relatorio" &&
        gdeType === "emissao" && (
          <Card>
            <CardHeader>
              <CardTitle>
                Requerimento de Adiamento de Entrega do Relatório de Estágio
                (Anexo X)
              </CardTitle>
              <CardDescription>
                Campos específicos do requerimento de adiamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Escola do aluno
                  </label>
                  <p className="text-sm">{processedData.escolaAluno || "-"}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    4.(EA10) Motivos de adiamento
                  </label>
                  <p className="text-sm">
                    {processedData.motivosAdiamento || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    5.(EA10) Adiamento até?
                  </label>
                  <p className="text-sm">{processedData.adiamentoAte || "-"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {/* Outros campos específicos (para documentos que não têm campos específicos definidos) */}
      {gdeType === "emissao" &&
        ![
          "proposta-estagio",
          "protocolo-estagio",
          "requerimento-ucs-atraso",
          "plano-estagio",
          "ata-reuniao-orientador-estagiario",
          "ata-reuniao-orientador-supervisor-estagiario",
          "parecer-supervisor",
          "requerimento-adiamento-relatorio",
        ].includes(documentType || "") && (
          <Card>
            <CardHeader>
              <CardTitle>Dados Específicos</CardTitle>
              <CardDescription>
                Campos específicos do tipo de documento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(processedData).map(([key, value]) => {
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
        )}
    </div>
  );
}
