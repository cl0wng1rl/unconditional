import Conditional from "../main/Conditional";

describe("Conditional", () => {
  describe("newInstance", () => {
    it("should be created with three parameters", () => {
      const conditional: Conditional = Conditional.newInstance("test path", 0, 0);
      expect(conditional).toBeTruthy();
    });
  });
});
