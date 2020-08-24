import { readFileSync } from "fs";
type Config = { include: string[]; exclude: string[]; conditionalLayer: string[]; max: number };

export default class Configuration {
  private static CONFIG_PATH: string = "unconditional.config.json";

  private config: Config;

  constructor() {
    this.config = this.parseConfigFile();
  }

  public getInclude(): string[] {
    return this.config.include;
  }

  public getExclude(): string[] {
    return this.config.exclude;
  }

  public getConditionalLayer(): string[] {
    return this.config.conditionalLayer;
  }

  public getMax(): number {
    return this.config.max;
  }

  private parseConfigFile(): Config {
    const fileData: any = JSON.parse(readFileSync(Configuration.CONFIG_PATH).toString());
    const config: Config = this.defaultConfig();
    if (fileData["include"]) config.include = fileData["include"];
    if (fileData["exclude"]) config.exclude = fileData["exclude"];
    if (fileData["conditionalLayer"]) config.conditionalLayer = fileData["conditionalLayer"];
    if (fileData["max"]) config.max = fileData["max"];
    return config;
  }

  private defaultConfig(): Config {
    return { include: [], exclude: [], conditionalLayer: [], max: 1 };
  }
}
