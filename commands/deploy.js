const { color } = require("console-log-colors");
const { green } = color;
const { getCurrentPath, getConfigDir } = require("../helpers/filesystem");
const { zipBuild } = require("../services/zip");
const { uploadBuild } = require("../services/api");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

function deployCommand(yargs, config) {
  const currentPath = getCurrentPath();
  const projectConfigFile = `${currentPath}/${config.systemConfig.configProjectFileName}`;
  zipBuild(config, projectConfigFile, currentPath, function (archiveFile) {
    console.log("-----");
    const configDir = getConfigDir(config.systemConfig.configFolder);
    uploadBuild(configDir, projectConfigFile, config, archiveFile, function (res) {
      console.log(`Deployed! ${green(res.message)}`);
      fs.unlinkSync(archiveFile);
      qrcode.generate(res.message, { small: true });
    });
  });
}

module.exports = { deployCommand };
