export default class UUID {

  private source: string;

  constructor(source: string | UUID) {
    switch (typeof source) {
      case "string":
        if (!UUID.isValid(source))
          throw Error(`The given string is not a valid UUID: ${source}`);
    
        this.source = source;
        break;
      default:
        this.source = source.source;
        break;
    }
  }

  toString(): string {
    return this.source;
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
