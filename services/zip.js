const { color } = require("console-log-colors");
const fs = require("fs");
const { red, green } = color;
const recursive = require("recursive-readdir");
const archiver = require("archiver");
const path = require("path");

function buildArchiveFileName(projectId) {
  return `${projectId.toLowerCase().replace("-", "_")}_${Date.now()}.zip`;
}

function zipBuild(config, projectConfigFile, currentPath, callback) {
  const projectConfig = JSON.parse(fs.readFileSync(projectConfigFile, "utf8"));
  const archiveFileName = buildArchiveFileName(projectConfig.project_id);
  process.chdir(projectConfig.build_dir);

  recursive(".", function (err, files) {
    if (err) {
      throw err;
    }

    const newZipFile = `${currentPath}/${archiveFileName}`;
    const output = fs.createWriteStream(newZipFile);
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });

    output.on("close", function () {
      callback(newZipFile, archive.pointer());
    });

    output.on("end", function () {
      console.log(red("Data has been drained"));
    });

    archive.on("error", function (err) {
      throw err;
    });

    archive.pipe(output);

    const ignoreExtensions = config.systemConfig.ignoreExtensions;
    for (const iterator of files) {
      if (!ignoreExtensions.includes(path.extname(iterator).replace(".", ""))) {
        console.log(`Add file: ${green(iterator)}`);
        archive.file(iterator, { name: iterator });
      }
    }
    archive.finalize();
  });
}

module.exports = { zipBuild };
