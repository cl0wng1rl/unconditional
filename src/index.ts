import * as core from "@actions/core";
import * as github from "@actions/github";
import ConditionalDetector from "./main/ConditionalDetector";
import FileRetriever from "./main/FileRetriever";

const parseStringList = (arrString: string): string[] =>
  arrString.split(" ").filter((s) => s.length);

async function run(): Promise<void> {
  try {
    const include: string[] = parseStringList(core.getInput("include"));
    const exclude: string[] = parseStringList(core.getInput("exclude"));
    const conditionalLayer: string[] = parseStringList(core.getInput("conditionalLayer"));
    const max: number = Number.parseInt(core.getInput("max"));

    const files = await new FileRetriever().getPaths(include, exclude);
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
