const fs = require("fs");
const prompts = require("prompts");
const validate = require("uuid-validate");
const { getCurrentPath } = require("../helpers/filesystem");
const { color } = require("console-log-colors");
const { yellow, green } = color;

async function initCommand(yargs, config) {
  const configFilePath = `${getCurrentPath()}/${config.systemConfig.configProjectFileName}`;
  if (fs.existsSync(configFilePath)) {
    console.log(yellow("Project config already exists!"));
    return false;
  }
  const questions = [
    {
      type: "text",
      name: "project_id",
      message: "Please enter your project id from the dashboard",
      validate: (value) => (!validate(value) ? "Incorrect project id" : true),
    },
    {
      type: "text",
      name: "build_dir",
      message: "Upload directory path?",
      validate: (value) => (!fs.existsSync(value) ? ` The directory "${value}" does not exist` : true),
    },
  ];
  const response = await prompts(questions);
  if (response.project_id && response.build_dir) {
    const json = JSON.stringify(response, null, 4);
    fs.writeFile(configFilePath, json, "utf8", function () {
      console.log(green("Project config file created!"));
    });
  }
}

module.exports = { initCommand };
