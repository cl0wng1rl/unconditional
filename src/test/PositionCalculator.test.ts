import PositionCalculator from "../main/PositionCalculator";
import { readFileSync } from "fs";
const getFileData = (path: string): string => readFileSync(__dirname + path).toString();

const expectLineAndColumnForIndex = (index: number, line: number, column: number): void => {
  // Given
  const data = getFileData("/data/PositionCalculator.data.1.js");
  const positionCalculator: PositionCalculator = new PositionCalculator(data);
  // When
  const positionData = positionCalculator.getPositionData(index);
  // Then
  expect(positionData.line).toEqual(line);
  expect(positionData.column).toEqual(column);
};

describe("PositionCalculator", () => {
  describe("getPositionData", () => {
    it("should return line 1 column 1 for index 0", () => expectLineAndColumnForIndex(0, 1, 1));
    it("should return line 1 column 10 for index 9", () => expectLineAndColumnForIndex(9, 1, 10));
    it("should return line 2 column 1 for index 10", () => expectLineAndColumnForIndex(10, 2, 1));
    it("should return line 3 column 2 for index 21", () => expectLineAndColumnForIndex(21, 3, 2));
    it("should return line 9 column 9 for index 79", () => expectLineAndColumnForIndex(79, 9, 9));
  });
});
