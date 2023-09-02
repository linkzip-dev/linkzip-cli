const { color } = require("console-log-colors");
const { green, red } = color;
const { getCurrentPath, getConfigDir } = require("../helpers/filesystem");
const { zipBuild } = require("../services/zip");
const { uploadBuild } = require("../services/api");
const { apiErrors } = require("../errors");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

function processResponse(res) {
  if (res.status === "ok") {
    console.log(`Deployed! ${green(res.message)}`);
    const CI = process.env["CI"];
    if (!CI) qrcode.generate(res.message, { small: true });
  } else {
    const message = apiErrors[res.message];
    console.log(red(`Error: code=${res.message}, message=${message}`));
  }
}

function deployCommand(yargs, config) {
  const currentPath = getCurrentPath();
  const projectConfigFile = `${currentPath}/${config.systemConfig.configProjectFileName}`;
  zipBuild(config, projectConfigFile, currentPath, function (archiveFile) {
    console.log("-----");
    const configDir = getConfigDir(config.systemConfig.configFolder);
    uploadBuild(configDir, projectConfigFile, config, archiveFile, function (res) {
      fs.unlinkSync(archiveFile);
      processResponse(res);
    });
  });
}

module.exports = { deployCommand };
