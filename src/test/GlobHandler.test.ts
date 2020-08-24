import GlobHandler from "../main/GlobHandler";
import glob from "tiny-glob";
import { mocked } from "ts-jest/utils";

jest.mock("tiny-glob", () =>
  jest.fn(async (): Promise<string[]> => new Promise((res) => res(["path1", "path2", "path3"])))
);

describe("GlobHandler", () => {
  describe("getPaths", () => {
    const mockGlob = mocked(glob, true);
    it("should correctly use the glob module", async () => {
      // Given
      const globHandler = new GlobHandler();
      const globPattern = "glob-pattern";
      // When
      await globHandler.getPaths(globPattern);
      // Then
      const defaultOptions = { filesOnly: true };
      expect(mockGlob).toBeCalledWith(globPattern, defaultOptions);
    });

    it("should return mocked value", async () => {
      // Given
      const globHandler = new GlobHandler();
      // When
      const globPattern = "glob-pattern";
      const paths = await globHandler.getPaths(globPattern);
      // Then
      const expectedPaths = ["path1", "path2", "path3"];
      expect(paths).toEqual(expectedPaths);
    });
  });
});
