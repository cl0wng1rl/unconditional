import * as core from "@actions/core";
import * as github from "@actions/github";
import FileRetriever from "./main/FileRetriever";
import ConditionalReporter from "./main/ConditionalReporter";
import Conditional from "./main/Conditional";
import ConditionalDetector from "./main/ConditionalDetector";
import Taybl from "taybl";
import DataReporter from "./main/DataReporter";

const parseStringList = (arrString: string): string[] =>
  arrString.split(" ").filter((s) => s.length);

async function run(): Promise<void> {
  try {
    const include: string[] = parseStringList(core.getInput("include"));
    const exclude: string[] = parseStringList(core.getInput("exclude"));
    const conditionalLayer: string[] = parseStringList(core.getInput("conditionalLayer"));
    const max: number = Number.parseInt(core.getInput("max"));

    const fr = new FileRetriever(include, exclude, conditionalLayer);

    const detector = new ConditionalDetector();
    const includedConds: Conditional[] = detector.getConditionals(await fr.getIncludedPaths());
    const layerConds: Conditional[] = detector.getConditionals(await fr.getLayerPaths());
    const nonLayerConds: Conditional[] = detector.getConditionals(await fr.getNonLayerPaths());

    const dataReporter = new DataReporter(includedConds, layerConds, max);
    new Taybl(dataReporter.getDataObject()).withVerticalLineStyle(":").print();
    console.log("");
    console.log(
      `Percentage in Conditional Layer: ${dataReporter.getPercentIncluded().toFixed(1)} %`
    );
    const exceeding = dataReporter.getNumberOfExceedingFiles();
    console.log(`Number of Files Exceeding Max: ${exceeding}`);
    console.log("");

    if (dataReporter.getNumberOfExceedingFiles()) {
      core.setFailed(`There are ${exceeding} files containing too many conditionals!`);
    } else {
      console.log("Congratulations! Your code is unconditional.");
    }

    const conditionalReport = new ConditionalReporter().getDataObject(nonLayerConds);
    new Taybl(conditionalReport).withHorizontalLineStyle("=").print();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
