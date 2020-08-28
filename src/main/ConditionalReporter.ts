import Conditional from "./Conditional";
import Taybl from "taybl";

type tayblObject = { _files: innerTaybleObject[] };
type innerTaybleObject = {
  "File Path": string;
  Count: number;
  _conditional_positions: { Line: number; Column: number }[];
};

export default class ConditionalReporter {
  public getDataObject(data: Conditional[]): tayblObject {
    return this.constructTayblObject(data);
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

  private getConditionalsStrings(conditionals: Conditional[]): { Line: number; Column: number }[] {
    return conditionals.map(this.getPositionObject);
  }

  private getPositionObject = (cond: Conditional) => ({
    Line: cond.getLineNumber(),
    Column: cond.getColumnNumber(),
  });
}
