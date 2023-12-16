const { color } = require("console-log-colors");
const { green, gray, red } = color;
var cliTable = require("cli-table");
const { getConfigDir } = require("../helpers/filesystem");
const { getCredentials } = require("../helpers/config");

async function profilesCommand(yargs, config) {
  const configFolder = getConfigDir(config.systemConfig.configFolder);
  const configFilePath = `${configFolder}/${config.systemConfig.configFileName}`;
  const credentials = getCredentials(configFilePath, false);
  const isEmptyCredentials = Object.keys(credentials).length === 0;
  if (!isEmptyCredentials) {
    var table = new cliTable({
      head: ["Profile", "token", "Active"],
    });
    for (const profile in credentials) {
      const token = "API-TOKEN" in credentials[profile] ? credentials[profile]["API-TOKEN"] : null;
      const active = "active" in credentials[profile] ? credentials[profile]["active"] : null;
      table.push([profile, token, active ? green("yes") : gray("no")]);
    }
    console.log(table.toString());
  } else {
    console.log(red(`Credentials file not found, please run "configure" command.`));
  }
}

module.exports = { profilesCommand };
