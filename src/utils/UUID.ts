export default class UUID {

  readonly source: string;

  constructor(source: string) {
    if (!UUID.isValid(source))
      throw Error(`The given string is not a valid UUID: ${source}`);

    this.source = source;
  }

  toString(): string {
    return this.source;
  }

  static copy(uuid: UUID) {
    return new UUID(uuid.source);
  }

  static random() {
    const TEMPLATE = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    const source = TEMPLATE.replace(/[xy]/g, (char) => {
      const random = (Math.random() * 16) | 0;
      const value = char === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });

    return new UUID(source);
  };

  static isValid(value: string): boolean {
    const regex = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
    return regex.test(value);
  }

}
