import ConditionalDetector from "../main/ConditionalDetector";
import Conditional from "../main/Conditional";

type ConditionalData = { lineNumber: number; columnNumber: number };
const expectedConditionals: ConditionalData[] = [
  { lineNumber: 1, columnNumber: 1 },
  { lineNumber: 5, columnNumber: 1 },
  { lineNumber: 7, columnNumber: 8 },
  { lineNumber: 9, columnNumber: 8 },
  { lineNumber: 13, columnNumber: 3 },
];

describe("ConditionalDetector", () => {
  describe("getConditionals", () => {
    it("should return correct list of conditionals for first data file", () => {
      const dataPath = __dirname + "/data/ConditionalDetector.data.1.js";
      const detector = new ConditionalDetector(dataPath);
      const conditionals: Conditional[] = detector.getConditionals();

      expect(conditionals.length).toEqual(5);
      expect(conditionals.every((c) => c.getFilePath() === dataPath));

      conditionals.forEach((conditional, i) => {
        expect(conditional.getLineNumber()).toEqual(expectedConditionals[i].lineNumber);
        expect(conditional.getColumnNumber()).toEqual(expectedConditionals[i].columnNumber);
      });
    });
  });
});
