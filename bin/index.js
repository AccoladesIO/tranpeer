#! /usr/bin/env node

import boxen from "boxen";
import { translate } from "@vitalets/google-translate-api";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import figlet from "figlet";
import chalk from "chalk";

const usage = chalk.magenta(
  "\nUsage: tranpeer -l <language>  -s <sentence> \n" +
    boxen(
      chalk.yellow("\n" + "Translates a sentence to specific language" + "\n"),
      { padding: 1, borderColor: "green", dimBorder: true }
    ) +
    "\n"
);

const yargsInstance = yargs(hideBin(process.argv));

yargsInstance
  .usage(usage)
  .option("l", {
    alias: "language",
    describe: "Translate to language",
    type: "string",
    demandOption: false,
  })
  .option("s", {
    alias: "sentence",
    describe: "Sentence to be translated",
    type: "string",
    demandOption: false,
  })
  .help()
  .parse();
// console.log(yargs.argv);

function runCLI() {
  const argv = yargsInstance.argv;

  if (argv.language == null && argv.l == null) {
    console.log(
      chalk.yellow(figlet.textSync("Tranpeer", { horizontalLayout: "full" }))
    );
    yargsInstance.showHelp().parse();
    return;
  }

  if (argv.sentence == null && argv.s == null) {
    yargsInstance.showHelp().parse();
    return;
  }

  const language = argv.l || argv.language;

  const sentence = argv.s || argv.sentence;

  // console.log( language,sentence);
  translate(sentence, { to: language.toLowerCase() })
    .then((res) => {
      console.log(
        "\n" +
          boxen(chalk.green(sentence + "\n\n" + res.text), {
            padding: 1,
            borderColor: "green",
            dimBorder: true,
          }) +
          "\n"
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

runCLI();
