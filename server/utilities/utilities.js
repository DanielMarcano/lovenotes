/* Environment variable functions */

exports.setEnvVariables = (configEnv) => {
  Object.keys(configEnv).forEach((key) => {
    process.env[key] = configEnv[key];
  });
};