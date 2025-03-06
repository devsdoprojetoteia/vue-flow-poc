import UUID from "../../utils/UUID";

export namespace Journey {

  export type StepType =
    | "root"
    | "message"
    | "redirect"
    | "declaration"
    | "decision"
    | "integration"
    | "text-input"
    | "selection";

  export type StepFactory = {
    root(id?: string | UUID): Root,
    message(id?: string | UUID): Message,
    redirect(id?: string | UUID): Redirect,
    declaration(id?: string | UUID): Declaration,
    decision(id?: string | UUID): Decision,
    integration(id?: string | UUID): Integration,
    textInput(id?: string | UUID): TextInput,
    selection(id?: string | UUID): Selection,
  }

  export interface Step {
    id: UUID;
    step: StepType;
  }

  export type ImplementedStep =
    | Root
    | Message
    | Redirect
    | Declaration
    | Decision
    | Integration
    | TextInput
    | Selection

  /**
   * ===========================================================================
   * Nó raíz/inicial
   * ===========================================================================
   */
  export interface Root extends Step {
    journeyId: UUID;
  }

  /**
   * ===========================================================================
   * Nó de envio de mensagem
   * ===========================================================================
   */
  export interface Message extends Step {
    type: Message.Type;
    content?: string;
    upload?: { name: string; files: File[] },
    b64?: string,
  }

  export namespace Message {

    export type Type = "text" | "image" | "video";

  }

  /**
   * ===========================================================================
   * Nó de recebimento de mensagem
   * ===========================================================================
   */
  export interface TextInput extends Step {
    variableName: string;
  }

  /**
   * ===========================================================================
   * Nó de declração de variável
   * ===========================================================================
   */
  export interface Declaration extends Step {
    variable: {
      name: string;
      type: Declaration.VariableType;
      value: string;
    }
  }

  export namespace Declaration {

    export type VariableType =
      | "string"
      | "number"
      | "date"
      | "date_time"
      | "boolean"
      | "object"
      | "array";

  }

  /**
   * ===========================================================================
   * Nó de integração com APIs Rest
   * ===========================================================================
   */
  export interface Integration extends Step {
    variableName: string;
    request: Partial<Integration.Request>;
    mock?: any;
  }

  export namespace Integration {

    export type Method = "get" | "post" | "patch" | "put" | "delete";

    export interface Request {
      url: string,
      method: Method,
      headers: Header[],
      body: any,
    }

    export interface Header {
      name: string;
      value: string;
    }

  }

  /**
   * ===========================================================================
   * Nó de envio de seleção múltipla
   * ===========================================================================
   */
  export interface Selection extends Step {
    title?: string;
    content?: string;
    options: Selection.Option[];
    defaultOption: Selection.DefaultOption;
  }

  export namespace Selection {

    export interface Option {
      id: UUID;
      label: string;
    }

    export interface DefaultOption {
      id: UUID;
      variableName: string;
    }

  }

  /**
   * ===========================================================================
   * Nó de decisão lógica
   * ===========================================================================
   */
  export interface Decision extends Step {
    title?: string;
    default: UUID;
    expressions: Decision.ExpressionTree[];
  }

  export namespace Decision {
    export type UnaryOperator =
      | "exists"
      | "is_true"
      | "is_false"
      | "is_number"
      | "is_string"
      | "is_date"
      | "is_object"
      | "is_array";

    export type BinaryOperator =
      | "gt"
      | "gte"
      | "lt"
      | "lte"
      | "eq"
      | "ne"
      | "in"
      | "includes";

    export type Operator = UnaryOperator | BinaryOperator;

    export type Children = string | ExpressionNode;

    export type ExpressionNode = {
      left: Children;
      operator: Operator;
      right?: Children;
    };

    export interface ExpressionTree {
      id: UUID;
      expression: ExpressionNode;
    }
  }

  /**
   * ===========================================================================
   * Nó de redirecionamento de jornada
   * ===========================================================================
   */
  export interface Redirect extends Step {
    title: string;
    targetJourneyId: UUID;
  }

}
