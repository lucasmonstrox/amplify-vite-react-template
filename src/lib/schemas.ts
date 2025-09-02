import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Schema para Proposta de Estágio (Anexo I)
const propostaEstagioSchema = z
  .object({
    // Campos obrigatórios básicos (3-7)
    telefoneAluno: z.string().min(1, "Telefone do aluno é obrigatório"),
    temasAreas: z.string().min(1, "Temas ou áreas é obrigatório"),
    orientadorDocente: z.string().min(1, "Orientador docente é obrigatório"),
    emailOrientador: z
      .string()
      .min(1, "Email do orientador é obrigatório")
      .email("Email inválido"),
    temLocalEstagio: z.enum(["sim", "nao"], {
      required_error: "Seleção obrigatória",
    }),

    // Campos condicionais quando temLocalEstagio é "sim" (8-17)
    nomeEntidadeAcolhimento: z.string().optional(),
    moradaEntidadeAcolhimento: z.string().optional(),
    codigoPostalEntidadeAcolhimento: z.string().optional(),
    telefoneEntidadeAcolhimento: z.string().optional(),
    emailEntidadeAcolhimento: z.string().optional(),
    pessoaContactadaEntidadeAcolhimento: z.string().optional(),
    cargoPessoaContactadaEntidadeAcolhimento: z.string().optional(),
    supervisorEntidadeAcolhimento: z.string().optional(),
    emailSupervisorEntidadeAcolhimento: z.string().optional(),
    cargoSupervisorEntidadeAcolhimento: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.temLocalEstagio === "sim") {
        return (
          data.nomeEntidadeAcolhimento &&
          data.nomeEntidadeAcolhimento.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Nome da entidade de acolhimento é obrigatório",
      path: ["nomeEntidadeAcolhimento"],
    }
  )
  .refine(
    (data) => {
      if (data.temLocalEstagio === "sim") {
        return (
          data.moradaEntidadeAcolhimento &&
          data.moradaEntidadeAcolhimento.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Morada da entidade de acolhimento é obrigatória",
      path: ["moradaEntidadeAcolhimento"],
    }
  )
  .refine(
    (data) => {
      if (data.temLocalEstagio === "sim") {
        return (
          data.codigoPostalEntidadeAcolhimento &&
          data.codigoPostalEntidadeAcolhimento.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Código postal da entidade de acolhimento é obrigatório",
      path: ["codigoPostalEntidadeAcolhimento"],
    }
  )
  .refine(
    (data) => {
      if (data.temLocalEstagio === "sim") {
        return (
          data.telefoneEntidadeAcolhimento &&
          data.telefoneEntidadeAcolhimento.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Telefone da entidade de acolhimento é obrigatório",
      path: ["telefoneEntidadeAcolhimento"],
    }
  )
  .refine(
    (data) => {
      if (data.temLocalEstagio === "sim") {
        return (
          data.emailEntidadeAcolhimento &&
          data.emailEntidadeAcolhimento.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Email da entidade de acolhimento é obrigatório",
      path: ["emailEntidadeAcolhimento"],
    }
  )
  .refine(
    (data) => {
      if (data.temLocalEstagio === "sim") {
        return (
          data.pessoaContactadaEntidadeAcolhimento &&
          data.pessoaContactadaEntidadeAcolhimento.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Pessoa contactada na entidade de acolhimento é obrigatória",
      path: ["pessoaContactadaEntidadeAcolhimento"],
    }
  )
  .refine(
    (data) => {
      if (data.temLocalEstagio === "sim") {
        return (
          data.cargoPessoaContactadaEntidadeAcolhimento &&
          data.cargoPessoaContactadaEntidadeAcolhimento.trim() !== ""
        );
      }
      return true;
    },
    {
      message:
        "Cargo da pessoa contactada na entidade de acolhimento é obrigatório",
      path: ["cargoPessoaContactadaEntidadeAcolhimento"],
    }
  )
  .refine(
    (data) => {
      if (data.temLocalEstagio === "sim") {
        return (
          data.supervisorEntidadeAcolhimento &&
          data.supervisorEntidadeAcolhimento.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Supervisor na entidade de acolhimento é obrigatório",
      path: ["supervisorEntidadeAcolhimento"],
    }
  )
  .refine(
    (data) => {
      if (data.temLocalEstagio === "sim") {
        return (
          data.emailSupervisorEntidadeAcolhimento &&
          data.emailSupervisorEntidadeAcolhimento.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Email do supervisor na entidade de acolhimento é obrigatório",
      path: ["emailSupervisorEntidadeAcolhimento"],
    }
  )
  .refine(
    (data) => {
      if (data.temLocalEstagio === "sim") {
        return (
          data.cargoSupervisorEntidadeAcolhimento &&
          data.cargoSupervisorEntidadeAcolhimento.trim() !== ""
        );
      }
      return true;
    },
    {
      message: "Cargo do supervisor na entidade de acolhimento é obrigatório",
      path: ["cargoSupervisorEntidadeAcolhimento"],
    }
  )
  .refine(
    (data) => {
      // Se tem local de estágio, validar formato de email para campos de email
      if (data.temLocalEstagio === "sim") {
        if (
          data.emailEntidadeAcolhimento &&
          data.emailEntidadeAcolhimento.trim() !== ""
        ) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(data.emailEntidadeAcolhimento)) {
            return false;
          }
        }
        if (
          data.emailSupervisorEntidadeAcolhimento &&
          data.emailSupervisorEntidadeAcolhimento.trim() !== ""
        ) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(data.emailSupervisorEntidadeAcolhimento)) {
            return false;
          }
        }
      }
      return true;
    },
    {
      message: "Email inválido",
      path: ["emailEntidadeAcolhimento"],
    }
  );

// Schema para Protocolo de Estágio (Anexo II)
const protocoloEstagioSchema = z.object({
  // Campos obrigatórios (3-5)
  dataInicioEstagio: z.string().min(1, "Data de início é obrigatória"),
  dataFinalizacaoEstagio: z
    .string()
    .min(1, "Data de finalização é obrigatória"),
  empresaEstagio: z.enum(["bosch", "deloitte", "outra"], {
    required_error: "Empresa é obrigatória",
  }),

  // Campos obrigatórios do step 3 (6-9)
  nomeRepresentanteEntidadeAcolhimento: z
    .string()
    .min(1, "Nome do representante é obrigatório"),
  nipcEntidadeAcolhimento: z.string().min(1, "NIPC é obrigatório"),
  caeEntidadeAcolhimento: z.string().min(1, "CAE é obrigatório"),
  localEstagio: z.string().min(1, "Local de estágio é obrigatório"),
});

// Schema para Requerimento a Estágio com UCs em Atraso (Art. 14)
const requerimentoUcsAtrasoSchema = z.object({
  telefoneAlunoArt14: z.string().min(1, "Telefone do aluno é obrigatório"),
  numeroUcsAtraso: z.string().min(1, "Número de UCs em atraso é obrigatório"),
  nomeUcsAtraso: z.string().min(1, "Nome das UCs em atraso é obrigatório"),
});

// Schema para Plano de Estágio (Anexo III)
const planoEstagioSchema = z.object({
  temasAreasEA3: z.string().min(1, "Temas ou áreas é obrigatório"),
  objetivosPlanoTrabalho: z
    .string()
    .min(1, "Objetivos e plano de trabalho é obrigatório"),
  nomeOrientadorEA3: z.string().min(1, "Nome do orientador é obrigatório"),
  emailOrientadorEA3: z
    .string()
    .min(1, "Email do orientador é obrigatório")
    .email("Email inválido"),
  supervisorEntidade: z.string().min(1, "Supervisor na entidade é obrigatório"),
  emailSupervisor: z
    .string()
    .min(1, "Email do supervisor é obrigatório")
    .email("Email inválido"),
  cargoSupervisor: z.string().min(1, "Cargo do supervisor é obrigatório"),
  horaInicio: z.string().min(1, "Hora de início é obrigatória"),
  horaFim: z.string().min(1, "Hora de fim é obrigatória"),
});

// Schema para Ata de Reunião Orientador e Estagiário (Anexo IV)
const ataReuniaoOrientadorEstagiarioSchema = z.object({
  numeroAta: z.string().min(1, "Número da ata é obrigatório"),
  diaReuniao: z.string().min(1, "Dia da reunião é obrigatório"),
  mesReuniao: z.string().min(1, "Mês da reunião é obrigatório"),
  horasReuniao: z.string().min(1, "Horas da reunião é obrigatório"),
  minutosReuniao: z.string().min(1, "Minutos da reunião é obrigatório"),
  horasConclusao: z.string().min(1, "Horas de conclusão é obrigatório"),
  localReuniao: z.string().min(1, "Local da reunião é obrigatório"),
  ordemTrabalhos: z.string().min(1, "Ordem de trabalhos é obrigatório"),
});

// Schema para Ata de Reunião Orientador, Supervisor e Estagiário (Anexo V)
const ataReuniaoOrientadorSupervisorEstagiarioSchema = z.object({
  numeroAtaEA5: z.string().min(1, "Número da ata é obrigatório"),
  diaReuniaoEA5: z.string().min(1, "Dia da reunião é obrigatório"),
  mesReuniaoEA5: z.string().min(1, "Mês da reunião é obrigatório"),
  horasReuniaoEA5: z.string().min(1, "Horas da reunião é obrigatório"),
  horasConclusaoEA5: z.string().min(1, "Horas de conclusão é obrigatório"),
  escolaOrientador: z.string().min(1, "Escola do orientador é obrigatório"),
  ordemTrabalhosEA5: z.string().min(1, "Ordem de trabalhos é obrigatório"),
});

// Schema para Parecer do Supervisor (Anexo IX)
const parecerSupervisorSchema = z.object({
  atitudeDesempenho: z.string().min(1, "Atitude e desempenho é obrigatório"),
  aplicacaoConceitos: z.string().min(1, "Aplicação de conceitos é obrigatório"),
  grauDificuldade: z.string().min(1, "Grau de dificuldade é obrigatório"),
});

// Schema para Requerimento de Adiamento de Entrega do Relatório de Estágio (Anexo X)
const requerimentoAdiamentoRelatorioSchema = z.object({
  escolaAluno: z.string().min(1, "Escola do aluno é obrigatório"),
  motivosAdiamento: z.string().min(1, "Motivos de adiamento é obrigatório"),
  adiamentoAte: z.string().min(1, "Adiamento até é obrigatório"),
});

// Schema para Relatório de Estágio
const relatorioEstagioSchema = z.object({
  // Campos específicos para Relatório de Estágio
  // Por enquanto vazio, será implementado quando necessário
});

// Schema para Submissão (apenas arquivo)
const submissaoSchema = z.object({
  file: z
    .instanceof(File, { message: "Arquivo é obrigatório" })
    .refine((file) => file.size > 0, {
      message: "Arquivo não pode estar vazio",
    }),
});

// Schema principal que combina todos os schemas baseado no tipo
export const attachmentSchema = z.union([
  // Emissão - diferentes schemas baseado no documentType
  z
    .object({
      gdeType: z.literal("emissao"),
      documentType: z.literal("proposta-estagio"),
      file: z.instanceof(File).optional(),
      data: z.string().optional(),
    })
    .and(propostaEstagioSchema),

  z
    .object({
      gdeType: z.literal("emissao"),
      documentType: z.literal("protocolo-estagio"),
      file: z.instanceof(File).optional(),
      data: z.string().optional(),
    })
    .and(protocoloEstagioSchema),

  z
    .object({
      gdeType: z.literal("emissao"),
      documentType: z.literal("requerimento-ucs-atraso"),
      file: z.instanceof(File).optional(),
      data: z.string().optional(),
    })
    .and(requerimentoUcsAtrasoSchema),

  z
    .object({
      gdeType: z.literal("emissao"),
      documentType: z.literal("plano-estagio"),
      file: z.instanceof(File).optional(),
      data: z.string().optional(),
    })
    .and(planoEstagioSchema),

  z
    .object({
      gdeType: z.literal("emissao"),
      documentType: z.literal("ata-reuniao-orientador-estagiario"),
      file: z.instanceof(File).optional(),
      data: z.string().optional(),
    })
    .and(ataReuniaoOrientadorEstagiarioSchema),

  z
    .object({
      gdeType: z.literal("emissao"),
      documentType: z.literal("ata-reuniao-orientador-supervisor-estagiario"),
      file: z.instanceof(File).optional(),
      data: z.string().optional(),
    })
    .and(ataReuniaoOrientadorSupervisorEstagiarioSchema),

  z
    .object({
      gdeType: z.literal("emissao"),
      documentType: z.literal("parecer-supervisor"),
      file: z.instanceof(File).optional(),
      data: z.string().optional(),
    })
    .and(parecerSupervisorSchema),

  z
    .object({
      gdeType: z.literal("emissao"),
      documentType: z.literal("requerimento-adiamento-relatorio"),
      file: z.instanceof(File).optional(),
      data: z.string().optional(),
    })
    .and(requerimentoAdiamentoRelatorioSchema),

  z
    .object({
      gdeType: z.literal("emissao"),
      documentType: z.literal("relatorio-estagio"),
      file: z.instanceof(File).optional(),
      data: z.string().optional(),
    })
    .and(relatorioEstagioSchema),

  // Submissão
  z
    .object({
      gdeType: z.literal("submissao"),
      documentType: z.enum([
        "proposta-estagio",
        "protocolo-estagio",
        "requerimento-ucs-atraso",
        "plano-estagio",
        "ata-reuniao-orientador-estagiario",
        "ata-reuniao-orientador-supervisor-estagiario",
        "parecer-supervisor",
        "requerimento-adiamento-relatorio",
        "relatorio-estagio",
      ]),
      data: z.string().optional(),
    })
    .and(submissaoSchema),

  // Resumo
  z.object({
    gdeType: z.literal("resumo"),
    documentType: z.enum([
      "proposta-estagio",
      "protocolo-estagio",
      "requerimento-ucs-atraso",
      "plano-estagio",
      "ata-reuniao-orientador-estagiario",
      "ata-reuniao-orientador-supervisor-estagiario",
      "parecer-supervisor",
      "requerimento-adiamento-relatorio",
      "relatorio-estagio",
    ]),
    file: z.instanceof(File).optional(),
    data: z.string().optional(),
  }),
]);

// Tipo base com todos os campos possíveis
export type AttachmentFormData = {
  gdeType: "emissao" | "submissao" | "resumo";
  documentType?: string;
  file?: File;
  data?: string;

  // Campos específicos para Proposta de Estágio (Anexo I)
  telefoneAluno?: string;
  temasAreas?: string;
  orientadorDocente?: string;
  emailOrientador?: string;
  temLocalEstagio?: "sim" | "nao";

  // Campos específicos para Protocolo de Estágio (Anexo II)
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
  dataInicioEstagio?: string;
  dataFinalizacaoEstagio?: string;
  empresaEstagio?: "sim" | "nao";
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
};

// Schemas auxiliares para validação específica
export const getSchemaForDocumentType = (
  gdeType: string,
  documentType: string
) => {
  if (gdeType === "emissao") {
    switch (documentType) {
      case "proposta-estagio":
        return propostaEstagioSchema;
      case "protocolo-estagio":
        return protocoloEstagioSchema;
      case "requerimento-ucs-atraso":
        return requerimentoUcsAtrasoSchema;
      case "plano-estagio":
        return planoEstagioSchema;
      case "ata-reuniao-orientador-estagiario":
        return ataReuniaoOrientadorEstagiarioSchema;
      case "ata-reuniao-orientador-supervisor-estagiario":
        return ataReuniaoOrientadorSupervisorEstagiarioSchema;
      case "parecer-supervisor":
        return parecerSupervisorSchema;
      case "requerimento-adiamento-relatorio":
        return requerimentoAdiamentoRelatorioSchema;
      case "relatorio-estagio":
        return relatorioEstagioSchema;
      default:
        return z.object({});
    }
  } else if (gdeType === "submissao") {
    return submissaoSchema;
  } else if (gdeType === "resumo") {
    return z.object({});
  }
  return z.object({});
};
