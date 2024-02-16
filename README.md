**LinkZip Deployment CLI Tool**

This CLI tool simplifies the deployment process of a zip archive with static content to linkzip.dev.

### Installation

To use LinkZip, ensure you have Node.js and npm installed on your system. Then, you can install LinkZip globally using npm:

```bash
npm install -g linkzip-cli
```

### Commands

Below are the commands to start using linkzip in your project:

#### 1. `configure`

```bash
linkzip configure
```

This will prompt you to enter your API keys and create a configuration file specific to the current system user.

![configure](images/configure.svg)

#### 2. `init`

```bash
linkzip init
```

Initialize the project and specify the project ID (copy from [**linkzip**](https://app.linkzip.dev) dashboard) and local folder with static files to deploy.

![init](images/init.svg)

#### 3. `deploy`

```bash
linkzip deploy
```

Prepare and deploy the zip archive to [**linkzip**](https://app.linkzip.dev).

![deploy](images/init.svg)

### Options

For more detailed instructions and assistance, refer to the documentation or run the tool with the `--help` option.

- `--help`: Show help
- `--version`: Show version number

### Note

Ensure to provide the necessary arguments when using the commands.
