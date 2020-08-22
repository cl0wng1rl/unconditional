import Conditional from "./Conditional";

export default class ConditionalBuilder {
  private filePath: string = "";
  private lineNumber: number = 0;
  private columnNumber: number = 0;

  public withFilePath(filePath: string): ConditionalBuilder {
    this.filePath = filePath;
    return this;
  }

  public withLineNumber(lineNumber: number): ConditionalBuilder {
    this.lineNumber = lineNumber;
    return this;
  }

  public withColumnNumber(columnNumber: number): ConditionalBuilder {
    this.columnNumber = columnNumber;
    return this;
  }

  public build(): Conditional {
    return new Conditional(this.filePath, this.lineNumber, this.columnNumber);
  }
}
