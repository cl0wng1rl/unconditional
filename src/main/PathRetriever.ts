import glob from "tiny-glob";

export default class PathRetriever {
  public async getPaths(): Promise<string[]> {
    return await glob(this.getGlobPattern(), { filesOnly: true });
  }

  private getGlobPattern(): string {
    return "*/**/*.ts";
  }
}
