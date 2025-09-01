# Rui2K - Sistema de Gerenciamento de Anexos

Este projeto foi migrado do Next.js para Vite com React Router, mantendo a autenticação do Amplify.

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VITE_USER_POOL_ID=your-user-pool-id
VITE_USER_POOL_CLIENT_ID=your-user-pool-client-id
VITE_GRAPHQL_ENDPOINT=your-graphql-endpoint
VITE_AWS_REGION=your-aws-region
```

### Instalação

```bash
npm install
```

### Execução

```bash
npm run dev
```

## Estrutura do Projeto

- `/src/components/` - Componentes reutilizáveis
- `/src/lib/` - Utilitários, hooks e configurações
- `/src/pages/` - Páginas da aplicação
- `/amplify/` - Configuração do Amplify

## Rotas

- `/login` - Página de login
- `/attachments` - Lista de anexos
- `/attachments/new` - Criar novo anexo
- `/attachments/:id` - Detalhes do anexo

Todas as rotas (exceto `/login`) são protegidas por autenticação.