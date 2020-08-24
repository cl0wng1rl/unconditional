import FileRetriever from "../main/FileRetriever";
import GlobHandler from "../main/GlobHandler";
import { mocked } from "ts-jest/utils";

const mockGetPaths = (...func: ((...x: any[]) => any)[]) => {
  const x = jest.fn();
  func.forEach((fn) => x.mockImplementationOnce(fn));
  return x;
};

const mockMethod = (arr: string[]): (() => Promise<string[]>) => (): Promise<string[]> =>
  new Promise((res) => res(arr));

jest.mock("../main/GlobHandler");
describe("FileRetriever", () => {
  describe("getPaths", () => {
    it("should return mocked value when called with no exception patterns", async () => {
      // Given
      const getPaths = mockGetPaths(mockMethod(["path"]));
      (GlobHandler as jest.Mock).mockImplementation(() => ({ getPaths: getPaths }));

      const fileRetriever = new FileRetriever();
      // When
      const globPattern = "glob-pattern";
      const paths = await fileRetriever.getPaths([globPattern]);
      // Then
      const expectedPaths = ["path"];
      expect(paths).toEqual(expectedPaths);
    });

    it("should return mocked value when called with exception patterns", async () => {
      // Given
      const getPaths = mockGetPaths(mockMethod(["a", "b", "c"]), mockMethod(["b", "c", "d"]));
      (GlobHandler as jest.Mock).mockImplementation(() => ({ getPaths: getPaths }));

      const fileRetriever = new FileRetriever();
      // When
      const globPattern = "glob-pattern";
      const exceptionPattern = "exception-pattern";
      const paths = await fileRetriever.getPaths([globPattern], [exceptionPattern]);
      // Then
      const expectedPaths = ["a"];
      expect(paths).toEqual(expectedPaths);
    });
  });
});
