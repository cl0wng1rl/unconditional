import PathRetriever from "../main/PathRetriever";
import glob from "tiny-glob";
import { mocked } from "ts-jest/utils";

jest.mock("tiny-glob", () =>
  jest.fn(async (): Promise<string[]> => new Promise((res) => res(["path1", "path2", "path3"])))
);

describe("PathRetriever", () => {
  describe("getPaths", () => {
    const mockGlob = mocked(glob, true);
    it("should correctly use the glob module", async () => {
      // Given
      const pr = new PathRetriever();
      const globPattern = "glob-pattern";
      // When
      await pr.getPaths(globPattern);
      // Then
      const defaultOptions = { filesOnly: true };
      expect(mockGlob).toBeCalledWith(globPattern, defaultOptions);
    });

    it("should return mocked value", async () => {
      // Given
      const pr = new PathRetriever();
      // When
      const globPattern = "glob-pattern";
      const paths = await pr.getPaths(globPattern);
      // Then
      const expectedPaths = ["path1", "path2", "path3"];
      expect(paths).toEqual(expectedPaths);
    });
  });
});
