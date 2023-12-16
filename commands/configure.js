const { color } = require("console-log-colors");
const fs = require("fs");
const { green } = color;
const prompts = require("prompts");
const { getConfigDir } = require("../helpers/filesystem");
const { getCredentials } = require("../helpers/config");

function writeConfigFile(configFolder, configFilePath, data) {
  if (!fs.existsSync(configFolder)) {
    fs.mkdirSync(configFolder);
  }
  const json = JSON.stringify(data, null, 4);
  fs.writeFile(configFilePath, json, "utf8", function () {
    console.log(green("Config file was updated!"));
  });
}

function deactivateProfiles(credentials) {
  for (const profile in credentials) {
    credentials[profile]["active"] = false;
  }
  return credentials;
}

function buildConfigFile(configFilePath, profile, token) {
  let credentials = getCredentials(configFilePath, false);
  const isEmptyCredentials = Object.keys(credentials).length === 0;
  if (!isEmptyCredentials) {
    if (checkConfigProfile(configFilePath, profile)) {
      credentials[profile]["API-TOKEN"] = token;
      return credentials;
    } else {
      credentials = deactivateProfiles(credentials);
      let newCredentials = {
        [profile]: {
          "API-TOKEN": token,
          active: true,
        },
      };
      return { ...credentials, ...newCredentials };
    }
  } else {
    return {
      [profile]: {
        "API-TOKEN": token,
        active: true,
      },
    };
  }
}

function checkConfigProfile(configFilePath, profile) {
  const credentials = getCredentials(configFilePath, false);
  return profile in credentials;
}

async function configureCommand(yargs, config) {
  const configFolder = getConfigDir(config.systemConfig.configFolder);
  const configFilePath = `${configFolder}/${config.systemConfig.configFileName}`;

  const questions = [
    {
      type: "text",
      name: "profile",
      message: `Please enter profile name or leave empty to use "default"`,
      initial: "default",
    },
    {
      type: (prev) => (checkConfigProfile(configFilePath, prev) ? "toggle" : null),
      name: "update_profile",
      initial: true,
      active: "yes",
      inactive: "no",
      message: "Do you want to update your existing profile?",
    },
    {
      type: (prev) => (prev ? "text" : null),
      name: "token",
      message: "API token?",
      validate: (value) => (value.length < 40 ? "Invalid API token" : true),
    },
  ];

  const response = await prompts(questions);
  if (response.token && response.profile) {
    const configFile = buildConfigFile(configFilePath, response.profile, response.token);
    writeConfigFile(configFolder, configFilePath, configFile);
  }
}

module.exports = { configureCommand };
