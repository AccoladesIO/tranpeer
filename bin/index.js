#!/usr/bin/env node
import boxen from "boxen"; 
import { translate } from "@vitalets/google-translate-api"; 
import yargs from "yargs"; 
import { hideBin } from "yargs/helpers"; 
import figlet from "figlet"; 
import chalk from "chalk"; 

/**
 * Changes:
 * 1. Used async/await for better readability and error handling.
 * 2. Added default language (`pt`) if none is provided.
 * 3. Improved error handling with specific messages.
 * 4. Added examples to the CLI usage.
 * 5. Validated input arguments (non-empty strings).
 * 6. Organized code for better readability and maintainability.
 */


const usage = chalk.magenta(
  "\nUsage: tranpeer -l <language> -s <sentence>\n" +
  boxen(
    chalk.yellow("\nTranslates a sentence to a specific language\n"),
    { padding: 1, borderColor: "green", dimBorder: true }
  ) +
  "\nExamples:\n" +
  chalk.cyan("  tranpeer -l fr -s 'Hello, world!'") +
  "\n" +
  chalk.cyan("  tranpeer --language es --sentence 'How are you?'") +
  "\n"
);


const yargsInstance = yargs(hideBin(process.argv))
  .usage(usage)
  .option("l", {
    alias: "language",
    describe: "Translate to language (default: en)",
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
  .alias("h", "help");


async function runCLI () {
  const argv = yargsInstance.argv;


  if (!argv.language && !argv.sentence) {
    console.log(
      chalk.yellow(figlet.textSync("Tranpeer", { horizontalLayout: "full" }))
    );
    yargsInstance.showHelp();
    return;
  }

  const language = (argv.l || argv.language || "pt").toLowerCase();
  const sentence = argv.s || argv.sentence;

  // Validate inputs
  if (!sentence || typeof sentence !== "string" || sentence.trim() === "") {
    console.error(chalk.red("Error: A valid sentence must be provided."));
    return;
  }

  try {
    const res = await translate(sentence, { to: language });
    console.log(
      "\n" +
      boxen(chalk.green(`${sentence}\n\n${res.text}`), {
        padding: 1,
        borderColor: "green",
        dimBorder: true,
      }) +
      "\n"
    );
  } catch (err) {
    console.error(chalk.red("Error translating sentence: ", err.message));
  }
}

runCLI();
