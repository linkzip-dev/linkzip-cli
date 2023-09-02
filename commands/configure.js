const { color } = require("console-log-colors");
const fs = require("fs");
const { green } = color;
const prompts = require("prompts");
const { getConfigDir } = require("../helpers/filesystem");

async function configureCommand(yargs, config) {
  const configFolder = getConfigDir(config.systemConfig.configFolder);
  if (!fs.existsSync(configFolder)) {
    fs.mkdirSync(configFolder);
  }

  const response = await prompts({
    type: "text",
    name: "token",
    message: "API token?",
    validate: (value) => (value.length < 40 ? "Invalid API token" : true),
  });
  if (response.token) {
    const json = JSON.stringify(
      {
        "API-TOKEN": response.token,
      },
      null,
      4,
    );
    const configFilePath = `${configFolder}/${config.systemConfig.configFileName}`;
    fs.writeFile(configFilePath, json, "utf8", function () {
      console.log(green("Config file was updated!"));
    });
  }
}

module.exports = { configureCommand };
