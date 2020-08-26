import Reporter from "../main/Reporter";
import Taybl from "taybl";
import Conditional from "../main/Conditional";
jest.mock("Taybl");
const mockImplementation = jest.fn(() => ({
  withHorizontalLineStyle: jest.fn(() => ({
    withVerticalLineStyle: jest.fn(() => ({
      withNumberOfSpacesAtEndOfColumns: jest.fn(() => ({
        withNumberOfSpacesAtStartOfColumns: jest.fn(() => ({
          print: jest.fn(() => {}),
        })),
      })),
    })),
  })),
}));

describe("Reporter", () => {
  describe("getPaths", () => {
    beforeEach(() => (Taybl as jest.Mock).mockImplementation(mockImplementation));
    it("should correctly use the glob module", async () => {
      // Given
      const reporter = new Reporter();
      // When
      reporter.printTable([Conditional.newInstance("dummy-path", 3, 3)]);
      // Then
      const defaultOptions = {
        files: [
          {
            "File Path": "dummy-path",
            Count: 1,
            "conditionals for path": [{ Position: `line: 3,   column: 3   ` }],
          },
        ],
      };
      expect(Taybl).toBeCalledWith(defaultOptions);
    });
  });
});
