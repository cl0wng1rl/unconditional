import Configuration from "../main/Configuration";
import { readFileSync } from "fs";
jest.mock("fs");

const configData = {
  include: ["includePath"],
  exclude: ["excludePath"],
  conditionalLayer: ["conditionalLayerPath"],
  max: 5,
};

describe("Configuration", () => {
  describe("with mocked config data", () => {
    beforeEach(() => {
      (readFileSync as jest.Mock).mockImplementation(() => Buffer.from(JSON.stringify(configData)));
    });
    describe("getInclude", () => {
      it("should return include field of mock data", () => {
        const config = new Configuration();
        expect(config.getInclude()).toEqual(["includePath"]);
      });
    });

    describe("getExclude", () => {
      it("should return exclude field of mock data", () => {
        const config = new Configuration();
        expect(config.getExclude()).toEqual(["excludePath"]);
      });
    });

    describe("getConditionalLayer", () => {
      it("should return conditionalLayer field of mock data", () => {
        const config = new Configuration();
        expect(config.getConditionalLayer()).toEqual(["conditionalLayerPath"]);
      });
    });

    describe("getMax", () => {
      it("should return max field of mock data", () => {
        const config = new Configuration();
        expect(config.getMax()).toEqual(5);
      });
    });
  });

  describe("with empty config object", () => {
    it("should return default values", () => {
      (readFileSync as jest.Mock).mockImplementation(() => Buffer.from("{}"));
      const config = new Configuration();
      expect(config.getInclude()).toEqual([]);
      expect(config.getExclude()).toEqual([]);
      expect(config.getConditionalLayer()).toEqual([]);
      expect(config.getMax()).toEqual(1);
    });
  });
});
