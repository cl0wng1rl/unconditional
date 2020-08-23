import * as core from "@actions/core";
import * as github from "@actions/github";
import { readdirSync } from "fs";
import ConditionalDetector from "./main/ConditionalDetector";
import PathRetriever from "./main/PathRetriever";

async function run(): Promise<void> {
  try {
    const files = await new PathRetriever().getPaths();
    console.log(files);
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
