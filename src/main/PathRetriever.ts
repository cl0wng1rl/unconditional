import glob from "tiny-glob";

export default class PathRetriever {
  public async getPaths(pattern: string): Promise<string[]> {
    return await glob(pattern, { filesOnly: true });
  }
}
