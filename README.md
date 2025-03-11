# Prova de Conceito vue-flow
Projeto desenvolvido e validado usando o NodeJS `v22.11.0`.

## Rodando o ambiente local
```shell
npm i
```

```shell
npm run dev
```

O propjeto iniciará na porta `5173`.

## Composição do projeto
biblioteca | versão | finalidade
---|---|---
@formkit/vue | 1.6.9 | Gerenciamento de formulários para edição dos nós
@vue-flow/core | 1.42.1 | Motor de renderização/edição do diagrama que representa o fluxo de conversação estático.
@vue-flow/controls | 1.1.2 | Addon que permite a criação de botões personalizados no editor de fluxo.
@vue-flow/minimap | 1.5.2 | Addon que renderiza um mini mapa no canto inferior direito do editor de fluxo.
@vue-flow/node-toolbar | 1.1.0 | Addon que renderiza botões nos nós do diagrama (sem uso no momento).
@vue-flow/background | 1.3.2 | Addon que renderiza o padrão de plano de fundo do editor de fluxo.
marked | 15.0.7 | Conversor de strings Markdown para HTML.
dompurify | 3.2.4 | Garante que o Markdown não seja usado para injetar scripts maliciosos no html gerado na exibição (dispensável).
vuex | 4.1.0 | Gerenciador de estados compartilhados na aplicação.

## Principais funcionalidades
### Editor de Fluxo
O projeto conta apenas com um editor de fluxo de conversação, renderizado diretamente no componente raíz (`App.vue`), sem qualquer tipo de roteador ou outras páginas.

Esse editor é capaz de sincronizar o estado do diagrama na `LocalStorage` mediante os seguintes cenários:
- Criação de um novo nó via arrasta-e-solta (mais detalhes no composable `useDnD.ts`).
- Edição do conteúdo de um nó via formkit (mais detalhes no composable `useNodeEditor.ts`).
- Criação de uma conexão entre dois nós (mais detalhes no próprio `App.vue`).

Uma vez sincronizado na `LocalStorage` o gerenciador de estados (vuex) passa a usar essa sincronização como o estado inicial do diagrama. Ou seja, mesmo recarregando a tela, o diagrama permanece. Sendo necessário limpar a `LocalStorage` para apagá-lo.

O diagrama é composto por nós que estabelecem diferentes comportamentos do robô, tendo 1 porta de entrada e 1 ou mais portas de saída (alguns nós especiais fogem dessa regra, tendo apenas entradas ou apenas saídas):
- **Decision/Decisão**: funciona como um switch case no qual o robô testa as possibilidades de cima para baixo e dá continuidade no fluxo de acordo com o resultado das expressões lógicas. Em caso de não haver um nó conectado na expressão escohida, o fluxo é finalizado. Caso nenhuma das expressões dê verdadeiro, o nó contectado à porta `default` é invocado, estando sujeito à mesma regra das outras portas de saída. Em suma, é um nó de 1 entrada e muitas saídas.
- **Declaration/Declaração**: pode ser usado tanto para instanciar uma variável nova quanto para mudar o tipo de uma variável já existente. É um nó de 1 entrada e 1 saída.
- **Integration/Integração**: estabelece as regras de chamada de APIs via protocolo HTTP. É um nó de 1 entrada e 1 saída (a princípio, embora talvez fosse útil ter uma porta para tratamento de erros no futuro).
- **Message/Mensagem**: serve apenas para sinalizar que o robô deve enviar uma mensagem no chat. Podendo ser em texto (respeitando o padrão Markdown, semelhante ao que os mensageiros como o WhatsApp já aceitam), uma imagem, ou um vídeo. É um nó de 1 entrada e 1 saída.
- **TextInput/Entrada de Texto**: indica ao robô que ele deve aguardar o input do usuário, a princípio, indefinidamente, embora exista a expectativa de que o robô possa ocasionalmente reforçar que está aguardando uma resposta no futuro. Naturalmente, instancia uma variável do tipo texto/`string` no fluxo. É um nó de 1 entrada e 1 saída.
- **Redirect/Redirecionamento**: redireciona o fluxo de uma jornada para outra jornada, através do UUID que pode ser copiado no nó "Jornada". É um nó de 1 entrada e 0 saídas (embora, na prática, a saída seja a próxima jornada).
- **Root/Raíz**: também chamado de "Jornada", a princípio, seria um nó único por diagrama, mas mediante a falta de um roteador no projeto, decidimos por flexibilizar essa regra e permitir que ele também fosse arrastável do menu lateral. Seu objetivo é estabelecer o início de uma jornada, podendo ser linkado por um nó de redirecionamento. Não possui entradas físicas, mas possui sempre 1 saída.
- **Selecion/Seleção**: serve para sinalizar que o robô deve enviar uma mensagem contendo botões de múltipla escolha para o usuário. Cada botão acompanha um UUID que o isola e, portanto, define qual porta de saída deve ser acionada. No entanto, existe um algoritmo simples (apenas de demonstrativo) que também valida o texto digitado pelo usuário, uma vez que o input de texto continua disponível, e tenta identificar uma opção dentre as disponíveis. Em caso de nenhuma opção ser acionada, a opção default é utilizada, seguindo as mesmas regras do nó de seleção. É um nó de 1 entrada e muitas saídas.
- **Post-it/Anotação**: não participa diretamente do fluxo, ne possui entradas ou saídas, serve apenas para o usuário deixar observações a respeito do fluxo. Sendo totalmente ignorado pela máquina de estados que simula o robô.

Cada nó, com exeção do nó Raíz/Jornada (mais detalhes**: `RootNode.vue` e `RootProcessor.ts`) conta com:
- Um renderizador customizado que exibe o conteúdo do nó no editor de fluxos e estabelece as regras de utiização das portas de entradas e saídas individualmente. Para mais detalhes, consulte os arquivos da pasta `src/components/CustomNodes`.
- Um editor dedicado que renderiza um formulário destinado a atualizar os dados do nó selecionado. Para encontrar o editor de cada nó, consulte a pasta `src/components/StepEditors`, seus nomes são definidos pelo nome do nó que cada um afeta, com exceção do nó "Post-it", cuja edição é aplicada instantaneamente.

### Simulador de Conversação
O projeto acompanha também um simulador de conversação embarcado, que roda diretamente na página, sem qualquer backend associado. Esse simulador é responsável por seguir o roteiro estabelecido pelo editor de fluxo. Para mais detalhes, consulte os arquivos: `src/composables/useConversationEngine.ts` e `src/domain/Conversation/Engine.ts`.

O simulador nada mais é que uma máquina de estados que encontra o nó raíz principal e navega na árvore de acordo com as ligações estabelecidas entre as portas de entrada e saída dos nós. **Se valendo do princípio de que cada porta de saída conecta-se a apenas 1 porta de entrada** por vez (várias portas em um mesmo nó não são um problema).

Essa máquina de estados delega o que fazer em cada nó para processadores individuais, localizados na pasta `src/domain/Conversation/Processor`, cujos nomes seguem o mesmo padrão de nome dos nós e editores de nós já citados. Cada processador estabelece as regras do que cada nó deve fazer, fincando restrita à maquina de estados apenas a lógica de construção e navegação na árvore de decisão.
