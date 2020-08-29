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
    it("should create the correct object", async () => {
      // Given
      const reporter = new DataReporter(include, layer, 1);
      // When
      const tayblObject = reporter.getDataObject();
      // Then
      expect(tayblObject).toEqual(expectedTayblObject);
    });
  });

  describe("getPercentIncluded", () => {
    it("should return correct percentage", async () => {
      // Given
      const reporter = new DataReporter(include, layer, 1);
      // When
      const percent = reporter.getPercentIncluded();
      // Then
      const expectedPercentIncluded = (100 * layer.length) / include.length;
      expect(percent).toEqual(expectedPercentIncluded);
    });
  });

  describe("getNumberOfExceedingFiles", () => {
    it("should return the number of files that contain more than the max number of conditionals", async () => {
      // Given
      const reporter = new DataReporter(include, layer, 1);
      // When
      const exceeding = reporter.getNumberOfExceedingFiles();
      // Then
      const expectedExceeding = 2;
      expect(exceeding).toEqual(expectedExceeding);
    });
  });
});
