import Conditional from "./Conditional";
import ConditionalBuilder from "./ConditionalBuilder";
import { readFileSync } from "fs";

export default class ConditionalDetector {
  private static readonly IF_REG_EX: RegExp = /(\/\*[\s\S]*?\*\/|\/\/.*)|((?:(?:[^\w]|^)if ?\()|(\n))/gm;

  private fileContent: string;
  private builder: ConditionalBuilder;
  private currentMatch: RegExpExecArray | null = null;
  private currentLineNumber: number = 1;
  private conditionals: Conditional[] = [];

  constructor(filePath: string) {
    this.fileContent = readFileSync(filePath).toString();
    this.builder = new ConditionalBuilder().withFilePath(filePath);
    this.findConditionals();
  }

  public getConditionals(): Conditional[] {
    return this.conditionals;
  }

  private findConditionals(): void {
    this.currentMatch = ConditionalDetector.IF_REG_EX.exec(this.fileContent);
    while (this.currentMatch !== null) {
      this.handleMatch(this.currentMatch);
      this.setToNextMatch();
    }
  }

  private handleMatch(match: RegExpExecArray) {
    if (match[0] !== undefined) this.currentLineNumber += match[0].split("\n").length;
    else if (match[1] !== undefined) this.addConditionalWithColumnIndex(match.index);
    else if (match[2] !== undefined) this.currentLineNumber++;
  }

  private addConditionalWithColumnIndex(index: number) {
    const conditional: Conditional = this.builder
      .withLineNumber(this.currentLineNumber)
      .withColumnNumber(index)
      .build();
    this.conditionals.push(conditional);
  }

  private setToNextMatch(): void {
    this.currentMatch = ConditionalDetector.IF_REG_EX.exec(this.fileContent);
  }
}
