const fs = require("fs");

function getCredentials(credentialsPath) {
  if (!fs.existsSync(credentialsPath)) {
    console.log(`Credentials file ${credentialsPath} not found`);
  }
  return JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
}

function getProjectConfig(projectConfigPath) {
  if (!fs.existsSync(projectConfigPath)) {
    console.log(`Credentials file ${projectConfigPath} not found`);
  }
  return JSON.parse(fs.readFileSync(projectConfigPath, "utf8"));
}

function getApiToken(credentialsPath) {
  const token = process.env["API_TOKEN"];
  if (token) return token;
  const credentials = getCredentials(credentialsPath);
  return credentials["API-TOKEN"];
}

module.exports = { getCredentials, getProjectConfig, getApiToken };
