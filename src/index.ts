import * as core from "@actions/core";
import * as github from "@actions/github";
import ConditionalFileDetector from "./main/ConditionalFileDetector";
import FileRetriever from "./main/FileRetriever";
import Reporter from "./main/Reporter";
import Conditional from "./main/Conditional";

const parseStringList = (arrString: string): string[] =>
  arrString.split(" ").filter((s) => s.length);

async function run(): Promise<void> {
  try {
    const include: string[] = parseStringList(core.getInput("include"));
    const exclude: string[] = parseStringList(core.getInput("exclude"));
    const conditionalLayer: string[] = parseStringList(core.getInput("conditionalLayer"));
    const max: number = Number.parseInt(core.getInput("max"));

    const files = await new FileRetriever(include, exclude, conditionalLayer).getNonLayerPaths();
    let conditionals: Conditional[] = [];
    files.forEach(
      (file) =>
        (conditionals = conditionals.concat(new ConditionalFileDetector(file).getConditionals()))
    );
    new Reporter().printTable(conditionals);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
