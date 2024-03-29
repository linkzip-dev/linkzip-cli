const apiErrors = {
  deployment_disabled: "Project in read-only mode",
  token_missing: "Missing API token",
  token_invalid: "Invalid API token",
  token_project_missing: "The project ID is missing",
  token_project_invalid: "Invalid project ID",
  invalid_file: "Invalid build file",
  file_too_big: "Build file is too big",
  cant_read_file_type: "Can't read file type",
  internal_server_error: "API server error",
};

module.exports = { apiErrors };
