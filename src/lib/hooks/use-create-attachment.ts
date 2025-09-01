import { useState, useCallback } from "react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../../amplify/data/resource";
import { AttachmentFormData } from "../schemas";

const client = generateClient<Schema>();

export function useCreateAttachment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewAttachment = useCallback(
    async (formData: AttachmentFormData) => {
      try {
        setLoading(true);
        setError(null);

        // Preparar os dados para o campo "data"
        const attachmentData = {
          gdeType: formData.gdeType,
          documentType: formData.documentType,
          fileName: formData.file?.name,
          fileSize: formData.file?.size,
          submittedAt: new Date().toISOString(),

          // Campos específicos para Proposta de Estágio (Anexo I)
          telefoneAluno: formData.telefoneAluno,
          temasAreas: formData.temasAreas,
          orientadorDocente: formData.orientadorDocente,
          emailOrientador: formData.emailOrientador,
          temLocalEstagio: formData.temLocalEstagio,

          // Campos adicionais quando temLocalEstagio é "sim"
          nomeEntidadeAcolhimento: formData.nomeEntidadeAcolhimento,
          moradaEntidadeAcolhimento: formData.moradaEntidadeAcolhimento,
          codigoPostalEntidadeAcolhimento:
            formData.codigoPostalEntidadeAcolhimento,
          telefoneEntidadeAcolhimento: formData.telefoneEntidadeAcolhimento,
          emailEntidadeAcolhimento: formData.emailEntidadeAcolhimento,
          pessoaContactadaEntidadeAcolhimento:
            formData.pessoaContactadaEntidadeAcolhimento,
          cargoPessoaContactadaEntidadeAcolhimento:
            formData.cargoPessoaContactadaEntidadeAcolhimento,
          supervisorEntidadeAcolhimento: formData.supervisorEntidadeAcolhimento,
          emailSupervisorEntidadeAcolhimento:
            formData.emailSupervisorEntidadeAcolhimento,
          cargoSupervisorEntidadeAcolhimento:
            formData.cargoSupervisorEntidadeAcolhimento,

          // Campos específicos para Protocolo de Estágio (Anexo II)
          dataInicioEstagio: formData.dataInicioEstagio,
          dataFinalizacaoEstagio: formData.dataFinalizacaoEstagio,
          empresaEstagio: formData.empresaEstagio,

          // Campos específicos para Requerimento a Estágio com UCs em Atraso (Art. 14)
          telefoneAlunoArt14: formData.telefoneAlunoArt14,
          numeroUcsAtraso: formData.numeroUcsAtraso,
          nomeUcsAtraso: formData.nomeUcsAtraso,

          // Campos específicos para Plano de Estágio (Anexo III)
          temasAreasEA3: formData.temasAreasEA3,
          objetivosPlanoTrabalho: formData.objetivosPlanoTrabalho,
          nomeOrientadorEA3: formData.nomeOrientadorEA3,
          emailOrientadorEA3: formData.emailOrientadorEA3,
          supervisorEntidade: formData.supervisorEntidade,
          emailSupervisor: formData.emailSupervisor,
          cargoSupervisor: formData.cargoSupervisor,
          horaInicio: formData.horaInicio,
          horaFim: formData.horaFim,

          // Campos específicos para Ata de Reunião Orientador e Estagiário (Anexo IV)
          numeroAta: formData.numeroAta,
          diaReuniao: formData.diaReuniao,
          mesReuniao: formData.mesReuniao,
          horasReuniao: formData.horasReuniao,
          minutosReuniao: formData.minutosReuniao,
          horasConclusao: formData.horasConclusao,
          localReuniao: formData.localReuniao,
          ordemTrabalhos: formData.ordemTrabalhos,

          // Campos específicos para Ata de Reunião Orientador, Supervisor e Estagiário (Anexo V)
          numeroAtaEA5: formData.numeroAtaEA5,
          diaReuniaoEA5: formData.diaReuniaoEA5,
          mesReuniaoEA5: formData.mesReuniaoEA5,
          horasReuniaoEA5: formData.horasReuniaoEA5,
          horasConclusaoEA5: formData.horasConclusaoEA5,
          escolaOrientador: formData.escolaOrientador,
          ordemTrabalhosEA5: formData.ordemTrabalhosEA5,

          // Campos específicos para Parecer do Supervisor (Anexo IX)
          atitudeDesempenho: formData.atitudeDesempenho,
          aplicacaoConceitos: formData.aplicacaoConceitos,
          grauDificuldade: formData.grauDificuldade,
        };

        // Remover campos undefined/null
        const cleanData = Object.fromEntries(
          Object.entries(attachmentData).filter(
            ([, value]) => value !== undefined && value !== null && value !== ""
          )
        );

        const response = await client.models.Attachment.create({
          data: JSON.stringify(cleanData),
        });

        return response.data;
      } catch (err) {
        console.error("Erro ao criar attachment:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Erro desconhecido ao criar attachment";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    createAttachment: createNewAttachment,
    loading,
    error,
  };
}
