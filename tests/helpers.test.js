const configHelper = require("../helpers/config");
const mockFS = require("mock-fs");
const fs = require("fs");

const testApiToken = "c4245ecacad94e810dd300488eb3dbd8568bce7973986123";
const testProjectId = "d8df696a-06dc-4936-b443-eb757be0191b";

describe("Test config helpers", () => {
  test("test getCredentials", () => {
    mockFS({
      "/path/to/fake/dir": {
        "config.json": `{"API-TOKEN": "${testApiToken}"}`,
      },
    });
    const configFile = "/path/to/fake/dir/config.json";
    expect(fs.existsSync(configFile)).toBe(true);
    const credentials = configHelper.getCredentials(configFile);
    expect(credentials["API-TOKEN"]).toBe(testApiToken);
    mockFS.restore();
  });

  test("test getProjectConfig", () => {
    mockFS({
      "/path/to/fake/project/dir": {
        "linkzip.json": `
          {
            "project_id": "${testProjectId}",
            "build_dir": "./tests"
          }
        `,
      },
    });
    const configFile = "/path/to/fake/project/dir/linkzip.json";
    expect(fs.existsSync(configFile)).toBe(true);
    const credentials = configHelper.getProjectConfig(configFile);
    expect(credentials["project_id"]).toBe(testProjectId);
    mockFS.restore();
  });

  test("test getApiToken from FS", () => {
    mockFS({
      "/path/to/fake/dir": {
        "config.json": `{"API-TOKEN": "${testApiToken}"}`,
      },
    });
    expect(fs.existsSync("/path/to/fake/dir/config.json")).toBe(true);
    const token = configHelper.getApiToken("/path/to/fake/dir/config.json");
    expect(token).toBe(testApiToken);
    mockFS.restore();
  });

  test("test getApiToken from ENV", () => {
    const testApiToken = "some-api-token";
    process.env["API_TOKEN"] = testApiToken;
    const token = configHelper.getApiToken("/path/to/fake/dir/config.json");
    expect(token).toBe(testApiToken);
  });
});
