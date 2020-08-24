import GlobHandler from "./GlobHandler";

export default class FileRetriever {
  private globHandler: GlobHandler;
  private filePaths: string[] = [];

  constructor() {
    this.globHandler = new GlobHandler();
  }

  public async getPaths(globs: string[], exceptions: string[] = []): Promise<string[]> {
    this.filePaths = this.getDifference(
      await this.getFilePaths(globs),
      await this.getFilePaths(exceptions)
    );
    return new Promise((res) => res(this.filePaths));
  }

  private async getFilePaths(globPatterns: string[]): Promise<string[]> {
    let filePaths: string[] = [];
    for (let i = 0; i < globPatterns.length; i++)
      filePaths = filePaths.concat(await this.globHandler.getPaths(globPatterns[i]));
    return this.deduplicate(filePaths);
  }

  private getDifference(arrA: string[], arrB: string[]): string[] {
    return arrA.filter((x) => !arrB.includes(x));
  }

  private deduplicate(arr: string[]): string[] {
    return [...new Set(arr)];
  }
}
