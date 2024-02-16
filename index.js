#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { configureCommand } = require("./commands/configure");
const { packageCommand } = require("./commands/package");
const { initCommand } = require("./commands/init");
const { deployCommand } = require("./commands/deploy");
const { profilesCommand } = require("./commands/profiles");
const config = require("./config.js");

yargs(hideBin(process.argv))
  .usage("Usage: <command>")
  .command(
    "init",
    "Init the project",
    () => true,
    (argv) => {
      initCommand(argv, config);
    },
  )
  .command(
    "package",
    "Prepare zip archive",
    () => true,
    (argv) => {
      packageCommand(argv, config);
    },
  )
  .command("deploy", "Deploy zip archive", () => {
    yargs.positional("message", {
      describe: "Deployment message",
      type: "string",
      alias: "m",
      default: "",
    });
    deployCommand(yargs, config);
  })
  .command(
    "configure",
    "Configure API keys",
    () => true,
    (argv) => {
      configureCommand(argv, config);
    },
  )
  .command(
    "profiles",
    "Show profiles list",
    () => true,
    (argv) => {
      profilesCommand(argv, config);
    },
  )
  .command(
    "active [profile]",
    "Select active profile",
    (yargs) => {
      return yargs.positional("profile", {
        describe: "profile to set in active",
        default: "default",
      });
    },
    (argv) => {
      profilesCommand(argv, config);
    },
  )
  .strictCommands()
  .strictOptions()
  .demandCommand(1)
  .parse();
