import Conditional from "../main/Conditional";

describe("Conditional", () => {
  describe("newInstance", () => {
    it("should be created with three parameters", () => {
      const conditional: Conditional = Conditional.newInstance("path", 0, 0);
      expect(conditional).toBeTruthy();
    });
  });

  describe("getFilePath", () => {
    it("should return correct file path", () => {
      const filePath: string = "test path";
      const conditional: Conditional = Conditional.newInstance(filePath, 0, 0);
      expect(conditional.getFilePath()).toEqual(filePath);
    });
  });

  describe("getLineNumber", () => {
    it("should return correct line number", () => {
      const lineNumber: number = 3;
      const conditional: Conditional = Conditional.newInstance("test path", lineNumber, 0);
      expect(conditional.getLineNumber()).toEqual(lineNumber);
    });
  });

  describe("getColumnNumber", () => {
    it("should return correct column number", () => {
      const columnNumber: number = 3;
      const conditional: Conditional = Conditional.newInstance("test path", 0, columnNumber);
      expect(conditional.getColumnNumber()).toEqual(columnNumber);
    });
  });
});
