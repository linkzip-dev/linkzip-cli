const { color } = require("console-log-colors");
const { cyan } = color;
const { getCurrentPath } = require("../helpers/filesystem");
const { zipBuild } = require("../services/zip");

function packageCommand(yargs, config) {
  const currentPath = getCurrentPath();
  const projectConfigFile = `${currentPath}/${config.systemConfig.configProjectFileName}`;
  zipBuild(config, projectConfigFile, currentPath, function (archiveFile, pointer) {
    console.log("-----");
    console.log(`Build file: ${archiveFile}`);
    console.log(cyan(pointer + " total bytes zipped"));
  });
}

module.exports = { packageCommand };
