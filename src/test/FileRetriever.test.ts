import FileRetriever from "../main/FileRetriever";
import GlobHandler from "../main/GlobHandler";

const mockGetPaths = (...funcs: ((...x: any[]) => any)[]) => {
  const x = jest.fn();
  funcs.forEach((fn) => x.mockImplementationOnce(fn));
  return x;
};

const mockMethod = (arr: string[]): (() => Promise<string[]>) => (): Promise<string[]> =>
  new Promise((res) => res(arr));

const mockGetPathsWith = (inc: string[], exc: string[] = [], lyr: string[] = []) => {
  if (lyr.length) return mockGetPaths(mockMethod(inc), mockMethod(exc), mockMethod(lyr));
  if (exc.length) return mockGetPaths(mockMethod(inc), mockMethod(exc));
  return mockGetPaths(mockMethod(inc));
};

jest.mock("../main/GlobHandler");
describe("FileRetriever", () => {
  describe("getIncludedPaths", () => {
    it("should return mocked value when called with no exception patterns", async () => {
      // Given
      const getPaths = mockGetPathsWith(["path"]);
      (GlobHandler as jest.Mock).mockImplementation(() => ({ getPaths: getPaths }));

      const include = "glob-pattern";
      const fileRetriever = new FileRetriever([include]);
      // When
      const paths = await fileRetriever.getIncludedPaths();
      // Then
      const expectedPaths = ["path"];
      expect(paths).toEqual(expectedPaths);
    });

    it("should return mocked value when called with exception patterns", async () => {
      // Given
      const getPaths = mockGetPathsWith(["a", "b", "c"], ["b", "c", "d"]);
      (GlobHandler as jest.Mock).mockImplementation(() => ({ getPaths: getPaths }));

      const include = "glob-pattern";
      const exception = "exception-pattern";
      const fileRetriever = new FileRetriever([include], [exception]);
      // When
      const paths = await fileRetriever.getIncludedPaths();
      // Then
      const expectedPaths = ["a"];
      expect(paths).toEqual(expectedPaths);
    });
  });

  describe("getLayerPaths", () => {
    it("should return mocked value when called with layer patterns", async () => {
      // Given
      const getPaths = mockGetPathsWith(["a", "b", "c"], ["c", "d", "e"], ["a", "b", "f"]);
      (GlobHandler as jest.Mock).mockImplementation(() => ({ getPaths: getPaths }));

      const include = "glob-pattern";
      const exception = "exception-pattern";
      const layer = "layer-pattern";
      const fileRetriever = new FileRetriever([include], [exception], [layer]);
      // When
      const paths = await fileRetriever.getLayerPaths();
      // Then
      const expectedPaths = ["a", "b"];
      expect(paths).toEqual(expectedPaths);
    });
  });

  describe("getNonLayerPaths", () => {
    it("should return mocked value when called with layer patterns", async () => {
      // Given
      const getPaths = mockGetPathsWith(["a", "b", "c"], ["c", "d", "e"], ["a", "f", "g"]);
      (GlobHandler as jest.Mock).mockImplementation(() => ({ getPaths: getPaths }));

      const include = "glob-pattern";
      const exception = "exception-pattern";
      const layer = "layer-pattern";
      const fileRetriever = new FileRetriever([include], [exception], [layer]);
      // When
      const paths = await fileRetriever.getNonLayerPaths();
      // Then
      const expectedPaths = ["b"];
      expect(paths).toEqual(expectedPaths);
    });
  });
});
