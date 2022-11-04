const { alias, configPaths } = require("react-app-rewire-alias");
const rewireYarnWorkspaces = require("react-app-rewire-yarn-workspaces");

module.exports = function override(config, env) {
  return rewireYarnWorkspaces(
    alias(configPaths("./tsconfig.paths.json"))(config),
    env
  );
};
