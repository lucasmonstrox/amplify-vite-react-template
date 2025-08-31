"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { attachmentSchema, type AttachmentFormData } from "@/lib/schemas";
import { useCreateAttachment } from "@/lib/hooks/use-create-attachment";

const documentOptions = [
  { value: "proposta-estagio", label: "Proposta de Estágio (Anexo I)" },
  { value: "protocolo-estagio", label: "Protocolo de Estágio (Anexo II)" },
  {
    value: "requerimento-ucs-atraso",
    label: "Requerimento a Estágio com UCs em Atraso (Art. 14)",
  },
  { value: "plano-estagio", label: "Plano de Estágio (Anexo III)" },
  {
    value: "ata-reuniao-orientador-estagiario",
    label: "Ata de Reunião Orientador e Estagiário (Anexo IV)",
  },
  {
    value: "ata-reuniao-orientador-supervisor-estagiario",
    label: "Ata de Reunião Orientador, Supervisor e Estagiário (Anexo V)",
  },
  {
    value: "registro-presencas-diarias",
    label: "Registo de Presenças Diárias (Anexo VI)",
  },
  { value: "parecer-orientador", label: "Parecer do Orientador (Anexo VIII)" },
  { value: "parecer-supervisor", label: "Parecer do Supervisor (Anexo IX)" },
  {
    value: "requerimento-adiamento-relatorio",
    label:
      "Requerimento de Adiamento de Entrega do Relatório de Estágio (Anexo X)",
  },
  { value: "relatorio-estagio", label: "Relatório de Estágio" },
];

export function AttachmentForm() {
  const router = useRouter();
  const {
    createAttachment,
    loading: createLoading,
    error: createError,
  } = useCreateAttachment();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AttachmentFormData>({
    resolver: zodResolver(attachmentSchema),
    defaultValues: {
      gdeType: undefined,
      documentType: undefined,
      telefoneAluno: "",
      temasAreas: "",
      orientadorDocente: "",
      emailOrientador: "",
      temLocalEstagio: undefined,
      dataInicioEstagio: "",
      dataFinalizacaoEstagio: "",
      empresaEstagio: undefined,
      telefoneAlunoArt14: "",
      numeroUcsAtraso: "",
      nomeUcsAtraso: "",
      temasAreasEA3: "",
      objetivosPlanoTrabalho: "",
      nomeOrientadorEA3: "",
      emailOrientadorEA3: "",
      supervisorEntidade: "",
      emailSupervisor: "",
      cargoSupervisor: "",
      horaInicio: "",
      horaFim: "",
      numeroAta: "",
      diaReuniao: "",
      mesReuniao: "",
      horasReuniao: "",
      minutosReuniao: "",
      horasConclusao: "",
      localReuniao: "",
      ordemTrabalhos: "",
      numeroAtaEA5: "",
      diaReuniaoEA5: "",
      mesReuniaoEA5: "",
      horasReuniaoEA5: "",
      horasConclusaoEA5: "",
      escolaOrientador: "",
      ordemTrabalhosEA5: "",
      atitudeDesempenho: "",
      aplicacaoConceitos: "",
      grauDificuldade: "",
    },
  });

  const watchedGdeType = form.watch("gdeType");
  const watchedDocumentType = form.watch("documentType");
  
  // Debug: Log dos erros do formulário
  console.log("=== DEBUG: ERROS DO FORMULÁRIO ===");
  console.log("formState.errors:", form.formState.errors);
  console.log("formState.isValid:", form.formState.isValid);
  console.log("formState.isDirty:", form.formState.isDirty);
  console.log("formState.isSubmitting:", form.formState.isSubmitting);
  
  // Debug: Log dos valores dos campos
  const formValues = form.getValues();
  console.log("=== VALORES DOS CAMPOS ===");
  console.log("gdeType:", formValues.gdeType);
  console.log("documentType:", formValues.documentType);
  console.log("telefoneAluno:", formValues.telefoneAluno);
  console.log("temasAreas:", formValues.temasAreas);
  console.log("orientadorDocente:", formValues.orientadorDocente);
  console.log("emailOrientador:", formValues.emailOrientador);
  console.log("temLocalEstagio:", formValues.temLocalEstagio);
  
  // Debug: Log detalhado dos erros
  if (Object.keys(form.formState.errors).length > 0) {
    console.log("=== ERROS DETALHADOS ===");
    Object.entries(form.formState.errors).forEach(([field, error]) => {
      console.log(`Campo ${field}:`, error);
    });
  }

  // Verifica se deve mostrar o segundo step
  const shouldShowSecondStep =
    watchedGdeType === "emissao" &&
    (watchedDocumentType === "proposta-estagio" ||
      watchedDocumentType === "protocolo-estagio" ||
      watchedDocumentType === "requerimento-ucs-atraso" ||
      watchedDocumentType === "plano-estagio" ||
      watchedDocumentType === "ata-reuniao-orientador-estagiario" ||
      watchedDocumentType === "ata-reuniao-orientador-supervisor-estagiario" ||
      watchedDocumentType === "parecer-supervisor");

  // Verifica se deve mostrar campos específicos para cada tipo
  const shouldShowPropostaFields =
    watchedGdeType === "emissao" && watchedDocumentType === "proposta-estagio";
  const shouldShowProtocoloFields =
    watchedGdeType === "emissao" && watchedDocumentType === "protocolo-estagio";
  const shouldShowRequerimentoFields =
    watchedGdeType === "emissao" &&
    watchedDocumentType === "requerimento-ucs-atraso";
  const shouldShowPlanoFields =
    watchedGdeType === "emissao" && watchedDocumentType === "plano-estagio";
  const shouldShowAtaFields =
    watchedGdeType === "emissao" &&
    watchedDocumentType === "ata-reuniao-orientador-estagiario";
  const shouldShowAtaSupervisorFields =
    watchedGdeType === "emissao" &&
    watchedDocumentType === "ata-reuniao-orientador-supervisor-estagiario";
  const shouldShowParecerSupervisorFields =
    watchedGdeType === "emissao" &&
    watchedDocumentType === "parecer-supervisor";

  // Verifica se deve mostrar o campo de arquivo (apenas para Submissão)
  const shouldShowFileField = watchedGdeType === "submissao";

  function handleNextStep() {
    if (currentStep === 1 && shouldShowSecondStep) {
      setCurrentStep(2);
    } else {
      form.handleSubmit(onSubmit)();
    }
  }

  function handlePreviousStep() {
    setCurrentStep(1);
  }

  async function onSubmit(data: AttachmentFormData) {
    try {
      console.log("=== INICIANDO SUBMISSÃO DO FORMULÁRIO ===");
      console.log("Dados do formulário:", {
        fileName: data.file?.name || "Nenhum arquivo",
        fileSize: data.file?.size || 0,
        ...data,
      });

      console.log("Chamando createAttachment...");
      // Criar o attachment usando a mutation
      const newAttachment = await createAttachment(data);

      console.log("=== ATTACHMENT CRIADO COM SUCESSO ===");
      console.log("Attachment criado com sucesso:", newAttachment);
      setSuccessMessage("Attachment criado com sucesso!");

      // Limpar formulário
      form.reset();
      setSelectedFile(null);
      setCurrentStep(1);

      // Redirecionar para a página de detalhes do attachment criado
      setTimeout(() => {
        router.push(`/attachments/${newAttachment.id}`);
      }, 1500);
    } catch (error) {
      console.error("=== ERRO NO ENVIO ===");
      console.error("Erro completo:", error);
      console.error("Tipo do erro:", typeof error);
      console.error("Mensagem do erro:", error instanceof Error ? error.message : "Erro desconhecido");
      setError("Erro ao criar attachment: " + (error instanceof Error ? error.message : "Erro desconhecido"));
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("file", file);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Submeter Anexo
        </CardTitle>
        <CardDescription className="text-center">
          {currentStep === 1
            ? "Passo 1: Selecione o tipo de GDE e documento"
            : "Passo 2: Preencha as informações adicionais"}
        </CardDescription>
        {/* Indicador de progresso */}
        <div className="flex items-center justify-center space-x-2 mt-4">
          <div
            className={`w-3 h-3 rounded-full ${
              currentStep >= 1 ? "bg-primary" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-3 h-3 rounded-full ${
              currentStep >= 2 ? "bg-primary" : "bg-gray-300"
            }`}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNextStep();
            }}
            className="space-y-6"
          >
            {/* Primeiro Step - Campos 1 e 2 */}
            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="gdeType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-base font-semibold">
                        1. GDE
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="emissao" id="emissao" />
                            <label
                              htmlFor="emissao"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Emissão
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="submissao" id="submissao" />
                            <label
                              htmlFor="submissao"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Submissão
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="resumo" id="resumo" />
                            <label
                              htmlFor="resumo"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Resumo
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        2. GDE
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo de documento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {documentOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Segundo Step - Campos específicos */}
            {currentStep === 2 && shouldShowSecondStep && (
              <>
                {/* Campos para Proposta de Estágio (Anexo I) */}
                {shouldShowPropostaFields && (
                  <>
                    <FormField
                      control={form.control}
                      name="telefoneAluno"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            3.(EA1) Telefone do aluno
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Ex: 912345678"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="temasAreas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            4.(EA1) Temas ou áreas preferenciais para a
                            realização do estágio
                          </FormLabel>
                          <FormControl>
                            <textarea
                              placeholder="Introduza a sua resposta"
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="orientadorDocente"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            5.(EA1) Proposta de orientador (Docente)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Docente do IPCA - Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emailOrientador"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            6.(EA1) Email do orientador (Docente)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email do IPCA (@ipca.pt) - Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="temLocalEstagio"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base font-semibold">
                            7.(EA1) Tem local de estágio?
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sim" id="sim" />
                                <label
                                  htmlFor="sim"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Sim
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="nao" id="nao" />
                                <label
                                  htmlFor="nao"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Não
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Campos para Protocolo de Estágio (Anexo II) */}
                {shouldShowProtocoloFields && (
                  <>
                    <FormField
                      control={form.control}
                      name="dataInicioEstagio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            3.(EA2) Data de início de estágio
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              placeholder="Introduza a data de entrada (dd/MM/yyyy)"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dataFinalizacaoEstagio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            4.(EA2) Data de finalização de estágio
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              placeholder="Introduza a data de entrada (dd/MM/yyyy)"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="empresaEstagio"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base font-semibold">
                            5.(EA2) Empresa onde irá estagiar
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bosch" id="bosch" />
                                <label
                                  htmlFor="bosch"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Bosch Car Multimedia Portugal, S.A.
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="deloitte"
                                  id="deloitte"
                                />
                                <label
                                  htmlFor="deloitte"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Deloitte Delivery Center. S.A. (Curso
                                  Tecnologias de Inovação Informática)
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="outra" id="outra" />
                                <label
                                  htmlFor="outra"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Outra Empresa
                                </label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Campos para Requerimento a Estágio com UCs em Atraso (Art. 14) */}
                {shouldShowRequerimentoFields && (
                  <>
                    <FormField
                      control={form.control}
                      name="telefoneAlunoArt14"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            3.(EArt14) Telefone do aluno
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Ex: 912345678"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="numeroUcsAtraso"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            4.(EArt14) Número de UCs em atraso
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 3"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nomeUcsAtraso"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            5.(EArt14) Nome das UCs em atraso
                          </FormLabel>
                          <FormControl>
                            <textarea
                              placeholder="Introduza a sua resposta"
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Campos para Plano de Estágio (Anexo III) */}
                {shouldShowPlanoFields && (
                  <>
                    <FormField
                      control={form.control}
                      name="temasAreasEA3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            3.(EA3) Temas ou áreas preferenciais para a
                            realização do estágio
                          </FormLabel>
                          <FormControl>
                            <textarea
                              placeholder="Introduza a sua resposta"
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="objetivosPlanoTrabalho"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            4.(EA3) Objetivos e plano de trabalho
                          </FormLabel>
                          <FormControl>
                            <textarea
                              placeholder="Introduza a sua resposta"
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nomeOrientadorEA3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            5.(EA3) Nome do orientador (Docente)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emailOrientadorEA3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            6.(EA3) Email do orientador (Docente)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email do IPCA (@ipca.pt) - Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="supervisorEntidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            7.(EA3) Supervisor na entidade de acolhimento
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emailSupervisor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            8.(EA3) Email do supervisor na entidade de
                            acolhimento
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cargoSupervisor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            9.(EA3) Cargo do supervisor na entidade de
                            acolhimento
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="horaInicio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            10.(EA3) Horário de estágio: Hora de início
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="horaFim"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            11.(EA3) Horário de estágio: Hora de fim
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Campos para Ata de Reunião Orientador e Estagiário (Anexo IV) */}
                {shouldShowAtaFields && (
                  <>
                    <FormField
                      control={form.control}
                      name="numeroAta"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            3.(EA4) Número da ata
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 1"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="diaReuniao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            4.(EA4) Dia em que decorreu a reunião
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 15"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mesReuniao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            5.(EA4) Mês em que decorreu a reunião (por extenso)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="horasReuniao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            6.(EA4) Horas em que decorreu a reunião
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 14"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="minutosReuniao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            7.(EA4) Minutos em que decorreu a reunião
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 30"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="horasConclusao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            8.(EA4) Horas de conclusão da reunião
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="localReuniao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            9.(EA4) Local em que decorreu a reunião
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ordemTrabalhos"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            10.(EA4) Ordem de trabalhos da reunião
                          </FormLabel>
                          <FormControl>
                            <textarea
                              placeholder="Introduza a sua resposta"
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Campos para Ata de Reunião Orientador, Supervisor e Estagiário (Anexo V) */}
                {shouldShowAtaSupervisorFields && (
                  <>
                    <FormField
                      control={form.control}
                      name="numeroAtaEA5"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            3.(EA5) Número da ata
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 1"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="diaReuniaoEA5"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            4.(EA5) Dia em que decorreu a reunião
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Ex: 15"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mesReuniaoEA5"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            5.(EA5) Mês em que decorreu a reunião (por extenso)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="horasReuniaoEA5"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            6.(EA5) Horas em que decorreu a reunião
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="horasConclusaoEA5"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            7.(EA5) Horas de conclusão da reunião
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="escolaOrientador"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            8.(EA5) Escola do orientador (Docente)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduza a sua resposta"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ordemTrabalhosEA5"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            9.(EA5) Ordem de trabalhos da reunião
                          </FormLabel>
                          <FormControl>
                            <textarea
                              placeholder="Introduza a sua resposta"
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* Campos para Parecer do Supervisor (Anexo IX) */}
                {shouldShowParecerSupervisorFields && (
                  <>
                    <FormField
                      control={form.control}
                      name="atitudeDesempenho"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            3.(EA9) 50%: Atitude e desempenho (0-20 valores)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              step="0.1"
                              placeholder="Ex: 15.5"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aplicacaoConceitos"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            4.(EA9) 30%: Aplicação de conceitos aprendidos ao
                            longo do curso (0-20 valores)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              step="0.1"
                              placeholder="Ex: 16.0"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="grauDificuldade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">
                            5.(EA9) 20%: Grau de dificuldade (0-20 valores)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              step="0.1"
                              placeholder="Ex: 14.5"
                              {...field}
                              disabled={createLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </>
            )}

            {/* Campo de arquivo apenas para Submissão */}
            {shouldShowFileField && (
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Arquivo
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          disabled={createLoading}
                        />
                        {selectedFile && (
                          <div className="text-sm text-slate-600">
                            Arquivo selecionado: {selectedFile.name} (
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Mensagens de feedback */}
            {createError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">Erro: {createError}</p>
              </div>
            )}

            {successMessage && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">{successMessage}</p>
              </div>
            )}

            {/* Botões de navegação */}
            <div className="flex space-x-4">
              {currentStep === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={createLoading}
                  className="flex-1"
                >
                  Anterior
                </Button>
              )}
              <Button type="submit" className="flex-1" disabled={createLoading}>
                {createLoading
                  ? "Enviando..."
                  : currentStep === 1
                  ? "Próximo"
                  : "Enviar Anexo"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
