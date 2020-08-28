import DataReporter from "../main/DataReporter";
import Conditional from "../main/Conditional";

const expectedTayblObject = {
  _data: [
    {
      Section: "Included",
      total: 6,
      files: 3,
      average: 2,
    },
    {
      Section: "Layer",
      total: 4,
      files: 2,
      average: 2,
    },
  ],
};

const include = [
  Conditional.newInstance("dummy-path-1", 3, 2),
  Conditional.newInstance("dummy-path-2", 5, 7),
  Conditional.newInstance("dummy-path-2", 4, 18),
  Conditional.newInstance("dummy-path-3", 6, 10),
  Conditional.newInstance("dummy-path-3", 8, 10),
  Conditional.newInstance("dummy-path-3", 11, 7),
];

const layer = [
  Conditional.newInstance("dummy-path-4", 1, 1),
  Conditional.newInstance("dummy-path-5", 2, 3),
  Conditional.newInstance("dummy-path-5", 4, 3),
  Conditional.newInstance("dummy-path-5", 14, 3),
];

describe("DataReporter", () => {
  describe("getDataObject", () => {
    it("should call taybl with the correct object", async () => {
      // Given
      const reporter = new DataReporter();
      // When
      const tayblObject = reporter.getDataObject(include, layer, 1);
      // Then
      expect(tayblObject).toEqual(expectedTayblObject);
    });
  });
});
