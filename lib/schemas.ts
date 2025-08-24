import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const attachmentSchema = z
  .object({
    gdeType: z.enum(["emissao", "submissao", "resumo"]),
    documentType: z.enum([
      "proposta-estagio",
      "protocolo-estagio",
      "requerimento-ucs-atraso",
      "plano-estagio",
      "ata-reuniao-orientador-estagiario",
      "ata-reuniao-orientador-supervisor-estagiario",
      "registro-presencas-diarias",
      "parecer-orientador",
      "parecer-supervisor",
      "requerimento-adiamento-relatorio",
      "relatorio-estagio",
    ]),
    // Campos específicos para Proposta de Estágio (Anexo I)
    telefoneAluno: z.string().optional(),
    temasAreas: z.string().optional(),
    orientadorDocente: z.string().optional(),
    emailOrientador: z.string().email("Email inválido").optional(),
    temLocalEstagio: z.enum(["sim", "nao"]).optional(),

    // Campos específicos para Protocolo de Estágio (Anexo II)
    dataInicioEstagio: z.string().optional(),
    dataFinalizacaoEstagio: z.string().optional(),
    empresaEstagio: z.enum(["bosch", "deloitte", "outra"]).optional(),

    // Campos específicos para Requerimento a Estágio com UCs em Atraso (Art. 14)
    telefoneAlunoArt14: z.string().optional(),
    numeroUcsAtraso: z.string().optional(),
    nomeUcsAtraso: z.string().optional(),

    // Campos específicos para Plano de Estágio (Anexo III)
    temasAreasEA3: z.string().optional(),
    objetivosPlanoTrabalho: z.string().optional(),
    nomeOrientadorEA3: z.string().optional(),
    emailOrientadorEA3: z.string().email("Email inválido").optional(),
    supervisorEntidade: z.string().optional(),
    emailSupervisor: z.string().optional(),
    cargoSupervisor: z.string().optional(),
    horaInicio: z.string().optional(),
    horaFim: z.string().optional(),

    // Campos específicos para Ata de Reunião Orientador e Estagiário (Anexo IV)
    numeroAta: z.string().optional(),
    diaReuniao: z.string().optional(),
    mesReuniao: z.string().optional(),
    horasReuniao: z.string().optional(),
    minutosReuniao: z.string().optional(),
    horasConclusao: z.string().optional(),
    localReuniao: z.string().optional(),
    ordemTrabalhos: z.string().optional(),

    // Campos específicos para Ata de Reunião Orientador, Supervisor e Estagiário (Anexo V)
    numeroAtaEA5: z.string().optional(),
    diaReuniaoEA5: z.string().optional(),
    mesReuniaoEA5: z.string().optional(),
    horasReuniaoEA5: z.string().optional(),
    horasConclusaoEA5: z.string().optional(),
    escolaOrientador: z.string().optional(),
    ordemTrabalhosEA5: z.string().optional(),

    // Campos específicos para Parecer do Supervisor (Anexo IX)
    atitudeDesempenho: z.string().optional(),
    aplicacaoConceitos: z.string().optional(),
    grauDificuldade: z.string().optional(),
    file: z.any().optional(),
  })
  .refine(
    (data) => {
      // Validação condicional para Proposta de Estágio
      if (
        data.gdeType === "emissao" &&
        data.documentType === "proposta-estagio"
      ) {
        return (
          data.telefoneAluno &&
          data.telefoneAluno.trim() !== "" &&
          data.temasAreas &&
          data.temasAreas.trim() !== "" &&
          data.orientadorDocente &&
          data.orientadorDocente.trim() !== "" &&
          data.emailOrientador &&
          data.emailOrientador.trim() !== "" &&
          data.temLocalEstagio
        );
      }
      return true;
    },
    {
      message: "Todos os campos são obrigatórios para Proposta de Estágio",
      path: ["telefoneAluno"],
    }
  )
  .refine(
    (data) => {
      // Validação condicional para Protocolo de Estágio
      if (
        data.gdeType === "emissao" &&
        data.documentType === "protocolo-estagio"
      ) {
        return (
          data.dataInicioEstagio &&
          data.dataInicioEstagio.trim() !== "" &&
          data.dataFinalizacaoEstagio &&
          data.dataFinalizacaoEstagio.trim() !== "" &&
          data.empresaEstagio
        );
      }
      return true;
    },
    {
      message: "Todos os campos são obrigatórios para Protocolo de Estágio",
      path: ["dataInicioEstagio"],
    }
  )
  .refine(
    (data) => {
      // Validação condicional para Requerimento a Estágio com UCs em Atraso
      if (
        data.gdeType === "emissao" &&
        data.documentType === "requerimento-ucs-atraso"
      ) {
        return (
          data.telefoneAlunoArt14 &&
          data.telefoneAlunoArt14.trim() !== "" &&
          data.numeroUcsAtraso &&
          data.numeroUcsAtraso.trim() !== "" &&
          data.nomeUcsAtraso &&
          data.nomeUcsAtraso.trim() !== ""
        );
      }
      return true;
    },
    {
      message:
        "Todos os campos são obrigatórios para Requerimento a Estágio com UCs em Atraso",
      path: ["telefoneAlunoArt14"],
    }
  )
  .refine(
    (data) => {
      // Validação condicional para Plano de Estágio
      if (data.gdeType === "emissao" && data.documentType === "plano-estagio") {
        return (
          data.temasAreasEA3 &&
          data.temasAreasEA3.trim() !== "" &&
          data.objetivosPlanoTrabalho &&
          data.objetivosPlanoTrabalho.trim() !== "" &&
          data.nomeOrientadorEA3 &&
          data.nomeOrientadorEA3.trim() !== "" &&
          data.emailOrientadorEA3 &&
          data.emailOrientadorEA3.trim() !== "" &&
          data.supervisorEntidade &&
          data.supervisorEntidade.trim() !== "" &&
          data.emailSupervisor &&
          data.emailSupervisor.trim() !== "" &&
          data.cargoSupervisor &&
          data.cargoSupervisor.trim() !== "" &&
          data.horaInicio &&
          data.horaInicio.trim() !== "" &&
          data.horaFim &&
          data.horaFim.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Todos os campos são obrigatórios para Plano de Estágio",
      path: ["temasAreasEA3"],
    }
  )
  .refine(
    (data) => {
      // Validação condicional para Ata de Reunião Orientador e Estagiário
      if (
        data.gdeType === "emissao" &&
        data.documentType === "ata-reuniao-orientador-estagiario"
      ) {
        return (
          data.numeroAta &&
          data.numeroAta.trim() !== "" &&
          data.diaReuniao &&
          data.diaReuniao.trim() !== "" &&
          data.mesReuniao &&
          data.mesReuniao.trim() !== "" &&
          data.horasReuniao &&
          data.horasReuniao.trim() !== "" &&
          data.minutosReuniao &&
          data.minutosReuniao.trim() !== "" &&
          data.horasConclusao &&
          data.horasConclusao.trim() !== "" &&
          data.localReuniao &&
          data.localReuniao.trim() !== "" &&
          data.ordemTrabalhos &&
          data.ordemTrabalhos.trim() !== ""
        );
      }
      return true;
    },
    {
      message:
        "Todos os campos são obrigatórios para Ata de Reunião Orientador e Estagiário",
      path: ["numeroAta"],
    }
  )
  .refine(
    (data) => {
      // Validação condicional para Ata de Reunião Orientador, Supervisor e Estagiário
      if (
        data.gdeType === "emissao" &&
        data.documentType === "ata-reuniao-orientador-supervisor-estagiario"
      ) {
        return (
          data.numeroAtaEA5 &&
          data.numeroAtaEA5.trim() !== "" &&
          data.diaReuniaoEA5 &&
          data.diaReuniaoEA5.trim() !== "" &&
          data.mesReuniaoEA5 &&
          data.mesReuniaoEA5.trim() !== "" &&
          data.horasReuniaoEA5 &&
          data.horasReuniaoEA5.trim() !== "" &&
          data.horasConclusaoEA5 &&
          data.horasConclusaoEA5.trim() !== "" &&
          data.escolaOrientador &&
          data.escolaOrientador.trim() !== "" &&
          data.ordemTrabalhosEA5 &&
          data.ordemTrabalhosEA5.trim() !== ""
        );
      }
      return true;
    },
    {
      message:
        "Todos os campos são obrigatórios para Ata de Reunião Orientador, Supervisor e Estagiário",
      path: ["numeroAtaEA5"],
    }
  )
  .refine(
    (data) => {
      // Validação condicional para Parecer do Supervisor
      if (
        data.gdeType === "emissao" &&
        data.documentType === "parecer-supervisor"
      ) {
        return (
          data.atitudeDesempenho &&
          data.atitudeDesempenho.trim() !== "" &&
          data.aplicacaoConceitos &&
          data.aplicacaoConceitos.trim() !== "" &&
          data.grauDificuldade &&
          data.grauDificuldade.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Todos os campos são obrigatórios para Parecer do Supervisor",
      path: ["atitudeDesempenho"],
    }
  )
  .refine(
    (data) => {
      // Validação condicional para arquivo (apenas para Submissão)
      if (data.gdeType === "submissao") {
        return data.file instanceof File && data.file.size > 0;
      }
      return true;
    },
    {
      message: "Selecione um arquivo para upload",
      path: ["file"],
    }
  );

export type AttachmentFormData = z.infer<typeof attachmentSchema>;
