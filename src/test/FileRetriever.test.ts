import FileRetriever from "../main/FileRetriever";
import GlobHandler from "../main/GlobHandler";
import { mocked } from "ts-jest/utils";

jest.mock("../main/GlobHandler");
describe("FileRetriever", () => {
  describe("getPaths", () => {
    it("should return mocked value", async () => {
      // Given
      (GlobHandler as jest.Mock).mockImplementation(() => ({
        getPaths: (): Promise<string[]> => new Promise((res) => res(["path"])),
      }));
      const fileRetriever = new FileRetriever();
      // When
      const globPattern = "glob-pattern";
      const paths = await fileRetriever.getPaths(globPattern);
      // Then
      const expectedPaths = ["path"];
      expect(paths).toEqual(expectedPaths);
    });
  });
});
