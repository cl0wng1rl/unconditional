export default class Conditional {
  private filePath: string;
  private lineNumber: number;
  private columnNumber: number;

  public static newInstance(
    filePath: string,
    lineNumber: number,
    columnNumber: number
  ): Conditional {
    return new Conditional(filePath, lineNumber, columnNumber);
  }

  private constructor(filePath: string, lineNumber: number, columnNumber: number) {
    this.filePath = filePath;
    this.lineNumber = lineNumber;
    this.columnNumber = columnNumber;
  }

  public getFilePath(): string {
    return this.filePath;
  }

  public getLineNumber(): number {
    return this.lineNumber;
  }

  public getColumnNumber(): number {
    return this.columnNumber;
  }
}
