export default class Conditional {
  private filePath: string;
  private lineNumber: number;
  private columnNumber: number;

  constructor(filePath: string, lineNumber: number, columnNumber: number) {
    this.filePath = filePath;
    this.lineNumber = lineNumber;
    this.columnNumber = columnNumber;
  }
}
