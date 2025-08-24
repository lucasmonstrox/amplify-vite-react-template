# Attachments com GraphQL e Amplify

Este documento explica como usar a funcionalidade de Attachments com GraphQL e AWS Amplify.

## Estrutura

### Schema GraphQL

O schema está definido em `amplify/data/resource.ts`:

```typescript
const schema = a.schema({
  Attachment: a
    .model({
      id: a.id(),
      data: a.json(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});
```

### Cliente GraphQL

O cliente está configurado em `lib/graphql-client.ts`:

```typescript
import { generateClient } from "aws-amplify/api";
import { data } from "@/amplify/data/resource";

export const client = generateClient<typeof data>();
```

## Como usar

### 1. Hook personalizado

Use o hook `useAttachments` em `lib/hooks/use-attachments.ts`:

```typescript
import { useAttachments } from "@/lib/hooks/use-attachments";

function MyComponent() {
  const { attachments, loading, error, refetch } = useAttachments();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {attachments.map((attachment) => (
        <div key={attachment.id}>{/* Renderizar attachment */}</div>
      ))}
    </div>
  );
}
```

### 2. Cliente direto

Use o cliente diretamente para operações específicas:

```typescript
import { client } from "@/lib/graphql-client";

// Listar todos os attachments
const result = await client.models.Attachment.list();

// Criar um novo attachment
const newAttachment = await client.models.Attachment.create({
  data: {
    gdeType: "emissao",
    documentType: "proposta-estagio",
    documentTypeLabel: "Proposta de Estágio (Anexo I)",
    submittedAt: new Date().toISOString(),
    status: "pending",
    fileName: "documento.pdf",
    fileSize: 1024000,
  },
});

// Buscar um attachment específico
const attachment = await client.models.Attachment.get({ id: "attachment-id" });

// Atualizar um attachment
const updated = await client.models.Attachment.update({
  id: "attachment-id",
  data: { status: "approved" },
});

// Deletar um attachment
await client.models.Attachment.delete({ id: "attachment-id" });
```

## Estrutura dos dados

Os dados são armazenados no campo `data` como JSON. A estrutura esperada é:

```typescript
interface AttachmentData {
  gdeType: "emissao" | "submissao" | "resumo";
  documentType: DocumentType; // Definido em lib/types.ts
  documentTypeLabel: string;
  submittedAt: string; // ISO date string
  status: "pending" | "approved" | "rejected";
  fileName?: string;
  fileSize?: number;
}
```

## Componente AttachmentsList

O componente `AttachmentsList` em `components/attachments-list.tsx` já está configurado para:

- Carregar dados do GraphQL automaticamente
- Mostrar estados de loading e erro
- Filtrar por tipo de GDE, tipo de documento e data
- Buscar por texto
- Atualizar dados com botão de refresh

## Exemplos

Veja `lib/examples/create-attachment-example.ts` para exemplos de como criar e listar attachments.

## Configuração

Certifique-se de que o Amplify está configurado corretamente:

1. O backend está configurado em `amplify/backend.ts`
2. O provider está configurado em `components/amplify-provider.tsx`
3. As credenciais AWS estão configuradas

## Comandos úteis

```bash
# Iniciar o servidor de desenvolvimento
turbo dev

# Fazer deploy do backend Amplify
amplify push

# Ver logs do backend
amplify console
```
