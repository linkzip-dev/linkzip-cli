function getUserHome() {
  return process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"];
}

function getConfigDir(folder) {
  return `${getUserHome()}/${folder}`;
}

function getCurrentPath() {
  return process.cwd();
}

module.exports = { getUserHome, getConfigDir, getCurrentPath };
