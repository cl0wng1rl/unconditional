import * as core from "@actions/core";
import * as github from "@actions/github";
import ConditionalDetector from "./main/ConditionalDetector";
import FileRetriever from "./main/FileRetriever";
import Configuration from "./main/Configuration";

async function run(): Promise<void> {
  try {
    const config = new Configuration();
    const files = await new FileRetriever().getPaths(config.getInclude(), config.getExclude());
    files.forEach((file) => {
      const cond = new ConditionalDetector(file);
      const positionList = cond
        .getConditionals()
        .map((c) => `\n - ln:${c.getLineNumber()}, col:${c.getColumnNumber()}`)
        .join("");
      console.log(`${file}:${positionList}`);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
