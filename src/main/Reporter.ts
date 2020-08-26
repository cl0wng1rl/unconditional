import Conditional from "./Conditional";
import Taybl from "taybl";

type tayblObject = {
  files: { "File Path": string; Count: number; "conditionals for path": { Position: string }[] }[];
};

export default class Reporter {
  public printTable(data: Conditional[]): void {
    const tayblData: tayblObject = this.constructTayblObject(data);
    const taybl = new Taybl(tayblData);
    taybl
      .withHorizontalLineStyle("=")
      .withVerticalLineStyle(":")
      .withNumberOfSpacesAtEndOfColumns(1)
      .withNumberOfSpacesAtStartOfColumns(1)
      .print();
  }

  private constructTayblObject(conditionals: Conditional[]): tayblObject {
    const paths = [...new Set(conditionals.map((cond) => cond.getFilePath()))];
    const pathMap: Map<string, Conditional[]> = this.getMapFromPathToConditionals(conditionals);
    const obj = paths.map((path: string) => {
      return {
        "File Path": path,
        Count: (pathMap.get(path) || []).length,
        "conditionals for path": (pathMap.get(path) || [])?.map((conditional) => ({
          Position:
            `line: ${conditional.getLineNumber()},`.padEnd(10) +
            ` column: ${conditional.getColumnNumber()}`.padEnd(13),
        })),
      };
    });
    return { files: obj };
  }

  private getMapFromPathToConditionals(conditionals: Conditional[]): Map<string, Conditional[]> {
    const pathToConditionalsMap: Map<string, Conditional[]> = new Map();
    const addToMap = (cond: Conditional) => this.addConditionalToMap(cond, pathToConditionalsMap);
    conditionals.forEach(addToMap);
    return pathToConditionalsMap;
  }

  private addConditionalToMap(conditional: Conditional, map: Map<string, Conditional[]>) {
    if (!map.get(conditional.getFilePath())) map.set(conditional.getFilePath(), []);
    map.get(conditional.getFilePath())?.push(conditional);
  }
}
