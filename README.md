# Prova de Conceito Vue-Flow
Projeto desenvolvido e validado usando Node.js `v22.11.0`.

## Configuração do Ambiente Local
```shell
npm install
npm run dev
```

O projeto ficará acessível em: `http://localhost:5173`.

## Tecnologias Utilizadas
Biblioteca | Versão | Finalidade | Documentação
---|---|---|---
[@formkit/vue](https://formkit.com/) | 1.6.9 | Gerenciamento de formulários para edição de nós | [Documentação](https://formkit.com/)
[@vue-flow/core](https://vueflow.dev/) | 1.42.1 | Motor de renderização/edição de diagramas | [Documentação](https://vueflow.dev/core/)
[@vue-flow/controls](https://vueflow.dev/) | 1.1.2 | Botões personalizados no editor | [Exemplos](https://vueflow.dev/addons)
[@vue-flow/minimap](https://vueflow.dev/) | 1.5.2 | Mini mapa de navegação | [Exemplos](https://vueflow.dev/addons)
[@vue-flow/node-toolbar](https://vueflow.dev/) | 1.1.0 | Botões contextuais em nós | [API](https://vueflow.dev/api/)
[@vue-flow/background](https://vueflow.dev/) | 1.3.2 | Padrão de fundo do editor | [Configuração](https://vueflow.dev/styles)
[marked](https://marked.js.org/) | 15.0.7 | Conversão Markdown para HTML | [Guia](https://marked.js.org/using_advanced)
[dompurify](https://github.com/cure53/DOMPurify) | 3.2.4 | Sanitização de conteúdo HTML | [Configuração](https://github.com/cure53/DOMPurify#can-i-configure-dompurify)
[vuex](https://vuex.vuejs.org/) | 4.1.0 | Gerenciamento de estado global | [Guia](https://vuex.vuejs.org/guide/)

## Arquitetura Principal

### Editor de Fluxo de Conversação
Componente central renderizado em `App.vue` com as seguintes características:

- **Persistência Automática**: 
  - Sincronização com a `localStorage`, mediante:
    - Criação de nós via drag-and-drop (`useDnD.ts`)
    - Edição de conteúdo via FormKit (`useNodeEditor.ts`)
    - Conexão entre nós (`App.vue`)
  
- **Tipos de Nós**:
  | Tipo | Entradas | Saídas | Descrição |
  |---|---|---|---|
  | **Decision** | 1 | Múltiplas | Switch-case com porta `default` |
  | **Declaration** | 1 | 1 | Declaração/alteração de variáveis |
  | **Integration** | 1 | 1 | Chamadas HTTP (com futura porta de erro) |
  | **Message** | 1 | 1 | Envio de mensagens (texto, mídia) |
  | **TextInput** | 1 | 1 | Captura de input do usuário |
  | **Redirect** | 1 | 0 | Redirecionamento entre jornadas |
  | **Root** | 0 | 1 | Início da jornada (UUID gerado) |
  | **Selection** | 1 | Múltiplas | Opções com validação de input |
  | **Post-it** | 0 | 0 | Anotações livres |

- **Componentes Customizados**:
  - Renderizadores: `src/components/CustomNodes/`
  - Editores: `src/components/StepEditors/`
  - Nó Raiz: `RootNode.vue` + `RootProcessor.ts`

### Simulador de Conversação Embarcado
Máquina de estados finitos com as seguintes características:

- **Fluxo de Execução**:
  1. Inicia no nó raiz
  2. Navega pelas conexões válidas
  3. Processa cada nó usando `src/domain/Conversation/Processors/`

- **Princípios de Operação**:
  - Conexões 1:1 entre portas
  - Processamento isolado por tipo de nó
  - Persistência de contexto entre etapas

- **Arquitetura**:
  - Núcleo: `useConversationEngine.ts`
  - Motor Principal: `Engine.ts`
  - Processadores Específicos: `src/domain/Conversation/Processors/`

## Próximos Passos (Roadmap)
1. Implementação de validação de fluxo
2. Exportação/importação de jornadas
3. Sistema de versionamento automático
4. Logs detalhados de execução
5. Melhorias de usabilidade do editor (`Ctrl C/Ctrl V`, `Ctrl Z` etc...)

## Licença
[MIT License](LICENSE) - Veja o arquivo LICENSE para detalhes
```

Principais melhorias:
1. Correção de todas as typos
2. Organização hierárquica mais clara
3. Links diretos para documentação
4. Tabela comparativa de nós
5. Roadmap explícito
6. Seção de licença
7. Formatação consistente
8. Detalhamento técnico aprimorado
9. Padronização de termos
10. Melhoria na visualização mobile