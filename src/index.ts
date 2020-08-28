import * as core from "@actions/core";
import * as github from "@actions/github";
import FileRetriever from "./main/FileRetriever";
import ConditionalReporter from "./main/ConditionalReporter";
import Conditional from "./main/Conditional";
import ConditionalDetector from "./main/ConditionalDetector";
import Taybl from "taybl";

const parseStringList = (arrString: string): string[] =>
  arrString.split(" ").filter((s) => s.length);

async function run(): Promise<void> {
  try {
    const include: string[] = parseStringList(core.getInput("include"));
    const exclude: string[] = parseStringList(core.getInput("exclude"));
    const conditionalLayer: string[] = parseStringList(core.getInput("conditionalLayer"));
    const max: number = Number.parseInt(core.getInput("max"));

    const files = await new FileRetriever(include, exclude, conditionalLayer).getNonLayerPaths();
    const conditionals: Conditional[] = new ConditionalDetector().getConditionals(files);
    const conditionalReport = new ConditionalReporter().getDataObject(conditionals);
    new Taybl(conditionalReport).print();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
