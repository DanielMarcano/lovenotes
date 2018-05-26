const { ObjectId } = require('mongoose').Types;

/* Environment variable functions */

exports.setEnvVariables = (configEnv) => {
  Object.keys(configEnv).forEach((key) => {
    process.env[key] = configEnv[key];
  });
};

/* ObjectId validator */

exports.validateObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    const after = new ObjectId(id);
    if (id !== after.toHexString()) return false;
    return true;
  }
  return false;
};