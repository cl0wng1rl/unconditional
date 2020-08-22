export type PositionData = { line: number; column: number };

export default class PositionCalculator {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }

  public getPositionData(index: number): PositionData {
    return { line: this.getLineNumber(index), column: this.getColumnNumber(index) };
  }

  private getLineNumber(index: number): number {
    return index ? this.data.slice(0, index).split("\n").length : 1;
  }

  private getColumnNumber(index: number): number {
    let lastNewLine = this.data.slice(0, index).lastIndexOf("\n", index - 1);
    if (lastNewLine < 0) return index + 1;
    return index - lastNewLine;
  }
}
