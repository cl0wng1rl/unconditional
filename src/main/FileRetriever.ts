import GlobHandler from "./GlobHandler";

export default class FileRetriever {
  private filePaths: string[] = [];

  public async getPaths(...globPatterns: string[]): Promise<string[]> {
    const globHandler = new GlobHandler();
    for (let i = 0; i < globPatterns.length; i++)
      this.filePaths = this.filePaths.concat(await globHandler.getPaths(globPatterns[i]));
    return new Promise((res) => res([...new Set(this.filePaths)]));
  }
}
