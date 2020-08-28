import ConditionalReporter from "../main/ConditionalReporter";
import Conditional from "../main/Conditional";

const expectedTayblObject = {
  _files: [
    {
      "File Path": "dummy-path-1",
      Count: 1,
      _conditional_positions: [{ Line: 3, Column: 2 }],
    },
    {
      "File Path": "dummy-path-2",
      Count: 2,
      _conditional_positions: [
        { Line: 5, Column: 7 },
        { Line: 6, Column: 10 },
      ],
    },
  ],
};

describe("ConditionalReporter", () => {
  describe("getDataObject", () => {
    it("should call taybl with the correct object", async () => {
      // Given
      const conditionals = [
        Conditional.newInstance("dummy-path-1", 3, 2),
        Conditional.newInstance("dummy-path-2", 5, 7),
        Conditional.newInstance("dummy-path-2", 6, 10),
      ];
      const reporter = new ConditionalReporter();
      // When
      const tayblObject = reporter.getDataObject(conditionals);
      // Then
      expect(tayblObject).toEqual(expectedTayblObject);
    });
  });
});
