import Conditional from "./Conditional";
import { readFileSync } from "fs";
import PositionCalculator, { PositionData } from "./PositionCalculator";

export default class ConditionalDetector {
  private static readonly IF_REG_EX: RegExp = /((?:[ \t]|^)if ?\()|(\/\*[\s\S]*?\*\/|\/\/.*)/gm;

  private filePath: string;
  private fileContent: string;
  private currentMatch: RegExpExecArray | null = null;
  private positionCalculator: PositionCalculator;
  private conditionals: Conditional[] = [];

  constructor(filePath: string) {
    this.filePath = filePath;
    this.fileContent = readFileSync(filePath).toString();
    this.positionCalculator = new PositionCalculator(this.fileContent);
    this.findConditionals();
  }

  public getConditionals(): Conditional[] {
    return this.conditionals;
  }

  private findConditionals(): void {
    this.currentMatch = ConditionalDetector.IF_REG_EX.exec(this.fileContent);
    this.loopThroughConditionalMatches();
  }

  private loopThroughConditionalMatches(): void {
    while (this.currentMatch !== null) {
      this.handleMatch(this.currentMatch);
      this.setCurrentMatchToNextMatch();
    }
  }

  private handleMatch(match: RegExpExecArray): void {
    if (match[1]) {
      this.addConditionalAt(match.index + match[0].indexOf("if"));
    }
  }

  private addConditionalAt(index: number): void {
    const position: PositionData = this.positionCalculator.getPositionData(index);
    this.conditionals.push(Conditional.newInstance(this.filePath, position.line, position.column));
  }

  private setCurrentMatchToNextMatch(): void {
    this.currentMatch = ConditionalDetector.IF_REG_EX.exec(this.fileContent);
  }
}
