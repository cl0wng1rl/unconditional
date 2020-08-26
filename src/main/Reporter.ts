import Conditional from "./Conditional";
import Taybl from "taybl";

type tayblObject = { _files: innerTaybleObject[] };
type innerTaybleObject = {
  "File Path": string;
  Count: number;
  _conditional_positions: { Position: string }[];
};

export default class Reporter {
  public printTable(data: Conditional[]): void {
    const tayblData: tayblObject = this.constructTayblObject(data);
    this.printTayblWithData(tayblData);
  }

  private constructTayblObject(conditionals: Conditional[]): tayblObject {
    const paths = [...new Set(conditionals.map((cond) => cond.getFilePath()))];
    const pathMap: Map<string, Conditional[]> = this.getMapFromPathToConditionals(conditionals);
    const obj = paths.map((path: string) => this.getInnerTayblObject(path, pathMap));
    return { _files: obj };
  }

  private getMapFromPathToConditionals(conditionals: Conditional[]): Map<string, Conditional[]> {
    const pathToConditionalsMap: Map<string, Conditional[]> = new Map();
    const addToMap = (cond: Conditional) => this.addConditionalToMap(cond, pathToConditionalsMap);
    conditionals.forEach(addToMap);
    return pathToConditionalsMap;
  }

  private getInnerTayblObject(path: string, map: Map<string, Conditional[]>): innerTaybleObject {
    return {
      "File Path": path,
      Count: map.get(path)!.length,
      _conditional_positions: this.getConditionalsStrings(map.get(path)!),
    };
  }

  private addConditionalToMap(conditional: Conditional, map: Map<string, Conditional[]>) {
    if (!map.get(conditional.getFilePath())) map.set(conditional.getFilePath(), []);
    map.get(conditional.getFilePath())!.push(conditional);
  }

  private getConditionalsStrings(conditionals: Conditional[]): { Position: string }[] {
    return conditionals.map((cond) => ({ Position: this.getConditionalString(cond) }));
  }

  private getConditionalString(conditional: Conditional): string {
    const linePart = `line: ${conditional.getLineNumber()},`.padEnd(10);
    const columnPart = `column: ${conditional.getColumnNumber()}`.padEnd(12);
    return `${linePart} ${columnPart}`;
  }

  private printTayblWithData(data: tayblObject) {
    new Taybl(data)
      .withHorizontalLineStyle("=")
      .withVerticalLineStyle(":")
      .withNumberOfSpacesAtEndOfColumns(1)
      .withNumberOfSpacesAtStartOfColumns(1)
      .print();
  }
}
