import ConditionalDetector from "../main/ConditionalDetector";
import Conditional from "../main/Conditional";

type ConditionalData = { lineNumber: number; columnNumber: number };
const expectedConditionals: ConditionalData[] = [
  { lineNumber: 2, columnNumber: 1 },
  { lineNumber: 6, columnNumber: 1 },
  { lineNumber: 8, columnNumber: 8 },
  { lineNumber: 10, columnNumber: 8 },
  { lineNumber: 14, columnNumber: 3 },
  { lineNumber: 3, columnNumber: 1 },
  { lineNumber: 7, columnNumber: 1 },
  { lineNumber: 9, columnNumber: 8 },
  { lineNumber: 11, columnNumber: 8 },
  { lineNumber: 15, columnNumber: 3 },
];

const expectConditionalToBeAsExpected = (conditional: Conditional, index: number) => {
  expect(conditional.getLineNumber()).toEqual(expectedConditionals[index].lineNumber);
  expect(conditional.getColumnNumber()).toEqual(expectedConditionals[index].columnNumber);
};

describe("ConditionalDetector", () => {
  describe("getConditionals", () => {
    it("should return the correct conditionals", () => {
      const paths = [
        __dirname + "/data/ConditionalDetector.data.1.js",
        __dirname + "/data/ConditionalDetector.data.2.js",
      ];
      const detector: ConditionalDetector = new ConditionalDetector();
      const conditionals: Conditional[] = detector.getConditionals(paths);
      expect(conditionals.length).toEqual(expectedConditionals.length);
      conditionals.forEach(expectConditionalToBeAsExpected);
    });
  });
});
