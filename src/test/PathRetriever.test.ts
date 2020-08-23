import PathRetriever from "../main/PathRetriever";
import glob from "tiny-glob";
import { mocked } from "ts-jest/utils";

jest.mock("tiny-glob", () =>
  jest.fn(async (): Promise<string[]> => new Promise((res) => res(["path1", "path2", "path3"])))
);

describe("PathRetriever", () => {
  describe("getPaths", () => {
    const mockGlob = mocked(glob, true);
    it("should call glob with correct path and return mocked value", async () => {
      // Given
      const pr = new PathRetriever();
      // When
      const paths = await pr.getPaths();
      // Then
      expect(mockGlob).toBeCalled();
      expect(paths.length).toEqual(3);
      const expectedPaths = ["path1", "path2", "path3"];
      expect(paths).toEqual(expectedPaths);
    });
  });
});
