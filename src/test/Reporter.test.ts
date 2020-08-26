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

const expectedTayblObject = {
  _files: [
    {
      "File Path": "dummy-path-1",
      Count: 1,
      _conditional_positions: [{ Position: `line: 3,   column: 2   ` }],
    },
    {
      "File Path": "dummy-path-2",
      Count: 2,
      _conditional_positions: [
        { Position: `line: 5,   column: 7   ` },
        { Position: `line: 6,   column: 10  ` },
      ],
    },
  ],
};

describe("Reporter", () => {
  describe("printTable", () => {
    beforeEach(() => (Taybl as jest.Mock).mockImplementation(mockImplementation));
    it("should call taybl with the correct object", async () => {
      // Given
      const conditionals = [
        Conditional.newInstance("dummy-path-1", 3, 2),
        Conditional.newInstance("dummy-path-2", 5, 7),
        Conditional.newInstance("dummy-path-2", 6, 10),
      ];
      const reporter = new Reporter();
      // When
      reporter.printTable(conditionals);
      // Then
      expect(Taybl).toBeCalledWith(expectedTayblObject);
    });
  });
});
