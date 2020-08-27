import GlobHandler from "./GlobHandler";

export default class FileRetriever {
  private include: string[];
  private exclude: string[];
  private layer: string[];

  constructor(include: string[], exclude: string[] = [], layer: string[] = []) {
    this.include = include;
    this.exclude = exclude;
    this.layer = layer;
  }

  public async getIncludedPaths(): Promise<string[]> {
    const included = await this.getPaths(this.include);
    const excluded = await this.getPaths(this.exclude);
    return new Promise((res) => res(this.getDifference(included, excluded)));
  }

  public async getLayerPaths(): Promise<string[]> {
    const included = await this.getIncludedPaths();
    const layer = await this.getPaths(this.layer);
    return new Promise((res) => res(this.getIntersection(included, layer)));
  }

  public async getNonLayerPaths(): Promise<string[]> {
    const included = await this.getIncludedPaths();
    const layer = await this.getPaths(this.layer);
    return new Promise((res) => res(this.getDifference(included, layer)));
  }

  private async getPaths(globPatterns: string[]): Promise<string[]> {
    const globHandler: GlobHandler = new GlobHandler();
    let filePaths: string[] = [];
    for (let i = 0; i < globPatterns.length; i++)
      filePaths = filePaths.concat(await globHandler.getPaths(globPatterns[i]));
    return this.deduplicate(filePaths);
  }

  private getDifference(arrA: string[], arrB: string[]): string[] {
    return arrA.filter((x) => !arrB.includes(x));
  }

  private getIntersection(arrA: string[], arrB: string[]): string[] {
    return arrA.filter((x) => arrB.includes(x));
  }

  private deduplicate(arr: string[]): string[] {
    return [...new Set(arr)];
  }
}
