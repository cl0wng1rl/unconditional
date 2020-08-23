import * as core from "@actions/core";
import * as github from "@actions/github";
import { readdirSync } from "fs";
import ConditionalDetector from "./main/ConditionalDetector";

async function run(): Promise<void> {
  try {
    // `who-to-greet` input defined in action metadata file
    // const nameToGreet = core.getInput("who-to-greet");
    // console.log(`Hello ${nameToGreet}!`);
    // const time = new Date().toTimeString();
    // core.setOutput("time", time);
    // // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${payload}`);
    console.log("./");
    console.log(readdirSync("./"));
    console.log(__dirname);
    console.log(readdirSync(__dirname));
    console.log("../");
    console.log(readdirSync("../"));
    console.log("../src/");
    console.log(readdirSync("../src/"));
    console.log("../src/main/");
    console.log(readdirSync("../src/main/"));

    const mainPath = "../src/main";
    const files = readdirSync("src/main");
    files.forEach((file) => {
      const path = `${__dirname}/${mainPath}/${file}`;
      const cond = new ConditionalDetector(path);
      const positionList = cond
        .getConditionals()
        .map((c) => `\nln:${c.getLineNumber()}, col:${c.getColumnNumber()}`)
        .join("");
      console.log(`${file}:${positionList}`);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
