import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";
import { AttachmentFormData } from "./schemas";

const client = generateClient<Schema>();

export const createAttachment = async (formData: AttachmentFormData) => {
  try {
    console.log("=== INICIANDO MUTATION ===");
    console.log("formData recebido:", formData);
    console.log("formData.data:", formData.data);
    console.log("Tipo de formData.data:", typeof formData.data);

    // Se formData.data existe, usar ele diretamente (já contém todos os dados)
    if (formData.data) {
      console.log("Usando dados do campo 'data':", formData.data);

      // Parse do JSON para incluir todos os campos
      let parsedData;
      try {
        parsedData = JSON.parse(formData.data);
        console.log("Dados parseados:", parsedData);
      } catch (error) {
        console.error("Erro ao fazer parse do data:", error);
        parsedData = {};
      }

      const response = await client.models.Attachment.create({
        data: parsedData,
      });

      console.log("Response da criação:", response);
      return response.data;
    }

    // Caso contrário, preparar os dados manualmente
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

      // Campos específicos para Requerimento de Adiamento de Entrega do Relatório de Estágio (Anexo X)
      escolaAluno: formData.escolaAluno,
      motivosAdiamento: formData.motivosAdiamento,
      adiamentoAte: formData.adiamentoAte,
    };

    // Log dos dados antes da limpeza
    console.log("Dados antes da limpeza:", attachmentData);

    // Remover campos undefined/null
    const cleanData = Object.fromEntries(
      Object.entries(attachmentData).filter(
        ([, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    // Log dos dados após a limpeza
    console.log("Dados após a limpeza:", cleanData);

    const response = await client.models.Attachment.create({
      data: cleanData,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao criar attachment:", error);
    throw error;
  }
};

export const deleteAttachment = async (id: string) => {
  try {
    const response = await client.models.Attachment.delete({ id });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar attachment:", error);
    throw error;
  }
};
