import type { Edge, Node } from "@vue-flow/core";
import UUID from "../../utils/UUID";
import type { Journey } from "../Journey/Journey";
import { MessageProcessor } from "./Processor/MessageProcessor";
import { TextInputProcessor } from "./Processor/TextInputProcessor";
import { DecisionProcessor } from "./Processor/DecisionProcessor";
import { SelectionProcessor } from "./Processor/SelectionProcessor";
import { IntegrationProcessor } from "./Processor/IntegrationProcessor";
import { DeclarationProcessor } from "./Processor/DeclarationProcessor";
import { RedirectProcessor } from "./Processor/RedirectProcessor";
import { RootProcessor } from "./Processor/RootProcessor";

export namespace Engine {

  export type ConversationStatus =
    | "not_ready"
    | "initializing"
    | "waiting_input"
    | "sending_message"
    | "processing"
    | "processed"
    | "failed"
    | "completed";

  export interface ConversationTracking<T = Journey.Step> {
    input: T;
    outputs: Record<string, string>;
    numberOfOutputs: number;
  }

  export type OnStatusChangeCallback = (newStatus: Engine.ConversationStatus) => void;

  export type OnStateUpdateCallback = (newState: Engine.ConversationTracking) => void;

  export type OnFailCallback = (failure: any) => void;

  export interface ChatIO {
    id: UUID;
    inputMetadata?: ChatInputMetadata;
    outputMetadata?: ChatOutputMetadada;
    content?: string;
    contentType?: Journey.Message.Type;
    b64?: string;
    sentAt: Date;
  }

  export interface ChatInputMetadata {
    selectedOption: string;
  }

  export interface ChatOutputMetadada {
    options: { label?: string, value: string }[];
  }

  export interface ProcessingInput<T = Journey.Step> {
    variables: Record<string, any>;
    currentState: ConversationTracking<T>;
    sendMessage: (message: ChatIO) => void;
    secondaryRoots: Engine.ConversationTracking<Journey.Root>[];
    redirects: Engine.ConversationTracking<Journey.Redirect>[];
  }

  export interface ProcessedInput {
    selectedOutput?: string;
    nextStatus: ConversationStatus;
    handleNextUserInput?: (input: ChatIO | undefined) => ProcessedInput;
  }

  export interface StepProcessor {
    process(processingInput: ProcessingInput): ProcessedInput;
  }

}

export default class EmulatedEngine {

  private handleNextUserInput?: (input: Engine.ChatIO) => Engine.ProcessedInput;
  private processorsByStrategy: Record<Journey.StepType, Engine.StepProcessor>;
  private variables: Record<string, any> = {};
  private _currentState: Engine.ConversationTracking;
  private _status: Engine.ConversationStatus = "not_ready";

  private constructor(
    readonly primaryRoot: Engine.ConversationTracking<Journey.Root>,
    private readonly secondaryRoots: Engine.ConversationTracking<Journey.Root>[],
    private readonly redirects: Engine.ConversationTracking<Journey.Redirect>[],
    private readonly tracking: Engine.ConversationTracking[],

    /* ACTIONS */
    private readonly sendMessage: (message: Engine.ChatIO) => void,
    private readonly onStatusChange: Engine.OnStatusChangeCallback,
    private readonly onStateUpdate: Engine.OnStateUpdateCallback,
    private readonly onFail: Engine.OnFailCallback,

    /* PROCESSORS */
    readonly rootProcessor = new RootProcessor(),
    readonly messageProcessor = new MessageProcessor(),
    readonly redirectProcessor = new RedirectProcessor(),
    readonly declarationProcessor = new DeclarationProcessor(),
    readonly decisionProcessor = new DecisionProcessor(),
    readonly integrationProcessor = new IntegrationProcessor(),
    readonly textInputProcessor = new TextInputProcessor(),
    readonly selectionProcessor = new SelectionProcessor(),
  ) {
    this._currentState = primaryRoot;
    this.processorsByStrategy = {
      "root": rootProcessor,
      "message": messageProcessor,
      "redirect": redirectProcessor,
      "declaration": declarationProcessor,
      "decision": decisionProcessor,
      "integration": integrationProcessor,
      "text-input": textInputProcessor,
      "selection": selectionProcessor,
    }
  }

  get status() {
    return this._status;
  }

  private set status(newStatus: Engine.ConversationStatus) {
    if (this._status !== newStatus) this.onStatusChange(newStatus);
    this._status = newStatus;
  }

  get currentState() {
    return this._currentState;
  }

  private set currentState(newState: Engine.ConversationTracking) {
    if (this._currentState !== newState) this.onStateUpdate(newState);
    this._currentState = newState;
  }

  start() {
    this.status = "initializing";
    this.next();
  }

  next(
    input?: Engine.ChatIO,
  ) {
    try {
      let selectedOutput: string | undefined = undefined;

      if (!!this.handleNextUserInput) {
        const processedInput = this.handleNextUserInput(input!!);
        this.status = processedInput.nextStatus;
        selectedOutput = processedInput.selectedOutput;
      }

      console.debug("currentState", this.currentState);
      console.debug("userInput", input);

      if (this.status === "not_ready") throw Error("Não inicializado");

      if (this.status! in ["initializing", "waiting_input"])
        throw Error(`Impossível prosseguir no status atual: ${this.status}`);

      if (this.currentState.input.step !== "root" && !input)
        throw Error("Impossível prosseguir sem um input do usuário");

      (window as any).engine = this;
      console.log("out", this.currentState);

      if (!selectedOutput) {
        selectedOutput = this.currentState.numberOfOutputs === 1
          ? this.currentState.outputs[this.currentState.input.id.source]
          : input?.inputMetadata?.selectedOption;
      }

      let processedInput: Engine.ProcessedInput = {
        selectedOutput,
        nextStatus: this.status,
      };
      let loopCount = 0;

      while (!EmulatedEngine.TERMINAL_STATUSES.includes(processedInput.nextStatus)) {
        if (
          this.currentState.numberOfOutputs == 0 && 
          this.currentState.input.step !== "redirect"
        ) {
          this.status = "completed";
          return;
        }

        loopCount++;
        this.status = "processing";
        processedInput = this.processByStrategy(selectedOutput);
        selectedOutput = processedInput.selectedOutput;
        this.status = processedInput.nextStatus;
        this.handleNextUserInput = processedInput.handleNextUserInput;

        if (loopCount > 10) {
          throw Error("Um possível loop infinito foi interrompido!");
        }
      }
    } catch (error) {
      console.error(error);
      this.status = "failed";
      this.onFail(error);
    }
  }

  private processByStrategy(selectedOutput?: string) {
    this.currentState = this.findNextState(selectedOutput);
    const processor = this.processorsByStrategy[this.currentState.input.step];

    const processed = processor.process({
      variables: this.variables,
      currentState: this.currentState,
      secondaryRoots: this.secondaryRoots,
      redirects: this.redirects,
      sendMessage: (message: Engine.ChatIO) => {
        this.status = "sending_message";
        this.sendMessage(message);
      },
    });

    return processed;
  }

  private findNextState(selectedOutput?: string) {
    const nextStateIndex = this.tracking.findIndex(({ input: possibleInput }) => {
      return possibleInput.id.source === selectedOutput;
    });

    if (nextStateIndex === -1) {
      throw Error(
        `Impossível determinar o próximo nó \
        ${this.currentState.input.step} >>> ${selectedOutput}`
      );
    }

    return this.tracking[nextStateIndex];
  }

  static create(
    nodes: Node<Journey.Step>[],
    edges: Edge[],
    sendMessage: (message: Engine.ChatIO) => void,
    onStatusChange: Engine.OnStatusChangeCallback,
    onStateUpdate: Engine.OnStateUpdateCallback,
    onFail: Engine.OnFailCallback,
  ) {
    function getSingleOutput(
      node: Node,
      source: string,
      target: string,
    ): Record<string, string> {
      return node.id === source ? { [node.data.id.source]: target } : {}
    }
    function getDecisionOutputs(
      node: Node,
      source: string,
      target: string,
    ): Record<string, string> {
      const data = node.data as Journey.Decision;
      return data?.expressions?.reduce(
        (acc, { id }) => {
          if (data.default.source === source)
            return { ...acc, [data.default.source]: target };

          return id.source === source
            ? { ...acc, [id.source]: target }
            : acc;
        },
        {},
      );
    }
    function getSelectionOutputs(
      node: Node,
      source: string,
      target: string,
    ): Record<string, string> {
      const data = node.data as Journey.Selection;
      return data?.options?.reduce(
        (acc, { id }) => {
          if (data.defaultOption.id.source === source)
            return { ...acc, [data.defaultOption.id.source]: target };

          return id.source === source
            ? { ...acc, [id.source]: target }
            : acc;
        },
        {},
      );
    }

    const mappersByStep: Record<Journey.StepType, typeof getSingleOutput> = {
      "root": getSingleOutput,
      "message": getSingleOutput,
      "redirect": getSingleOutput,
      "declaration": getSingleOutput,
      "decision": getDecisionOutputs,
      "integration": getSingleOutput,
      "text-input": getSingleOutput,
      "selection": getSelectionOutputs,
    }

    const tracking = nodes.map((node) => {
      const mapper = mappersByStep[node.data?.step ?? "root"];
      const outputs = edges.reduce((acc, {
        source,
        sourceHandle,
        target,
        targetHandle,
      }) => {
        const mappedOutputs = mapper?.(
          node,
          sourceHandle ?? source,
          targetHandle ?? target
        );

        if (!!mappedOutputs) return { ...acc, ...mappedOutputs };

        return acc;
      }, {} as Record<string, string>);

      const tracking: Engine.ConversationTracking = {
        input: { ...(node.data ?? {}) } as Journey.Step,
        outputs,
        numberOfOutputs: Object.keys(outputs).length,
      };

      return tracking;
    });
    const redirects = tracking.reduce((acc, item) => {
      if (item.input.step === "redirect") {
        return [...acc, item];
      }
      return acc;
    }, [] as Engine.ConversationTracking[]);
    const [primaryRoot, ...secondaryRoots] = tracking.reduce((acc, item) => {
      if (item.input.step === "root") {
        return [...acc, item];
      }
      return acc;
    }, [] as Engine.ConversationTracking[]);

    (window as any).graph = { nodes, edges };
    return new EmulatedEngine(
      primaryRoot as Engine.ConversationTracking<Journey.Root>,
      secondaryRoots as Engine.ConversationTracking<Journey.Root>[],
      redirects as Engine.ConversationTracking<Journey.Redirect>[],
      tracking,
      sendMessage,
      onStatusChange,
      onStateUpdate,
      onFail,
    );
  }

  static TERMINAL_STATUSES: Engine.ConversationStatus[] = [
    "completed",
    "waiting_input",
    "not_ready",
  ];

}
