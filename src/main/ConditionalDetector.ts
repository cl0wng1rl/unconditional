import Conditional from "./Conditional";
import ConditionalFileDetector from "./ConditionalFileDetector";

export default class ConditionalDetector {
  private conditionals: Conditional[] = [];

  public getConditionals(files: string[]): Conditional[] {
    this.conditionals = [];
    files.forEach(this.addConditionals);
    return this.conditionals;
  }

  private addConditionals = (path: string) => {
    const newConditionals = new ConditionalFileDetector(path).getConditionals();
    this.conditionals = this.conditionals.concat(newConditionals);
  };
}
