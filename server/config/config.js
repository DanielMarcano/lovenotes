const { setEnvVariables } = require('../utilities/utilities');
const config = require('./config.json');

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];

if (env !== 'production') {
  setEnvVariables(configEnv);
}