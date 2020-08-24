import * as core from "@actions/core";
import * as github from "@actions/github";
import ConditionalDetector from "./main/ConditionalDetector";
import FileRetriever from "./main/FileRetriever";

async function run(): Promise<void> {
  try {
    const files = await new FileRetriever().getPaths("/src/**/*.ts");
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
