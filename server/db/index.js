// const {
//   db: { config, defaultType },
// } = require('../../config');

// const { fatal } = require('../error/ApiError');

import { fatal } from '../error/ApiError';

import configObj from '../../config';
const {
  db: { config, defaultType },
} = configObj;

const db = {};
let type = defaultType;

const funcWrapper = (func) =>
  typeof func === 'function' ? func : fatal(`FATAL: cannot find ${func.name} function for this DB wrapper`);

const init = async () => {
  try {
    for (const [k, v] of Object.entries(config)) {
      // const wrapper = require(`./${k}`)(v);
      const wrapperFile = await import(`./${k}`);
      const wrapper = wrapperFile(v);

      await wrapper.testConnection();
      console.log(`INFO: DB wrapper for ${k} initiated`);
      db[k] = wrapper;
    }
  } catch (error) {
    fatal(`FATAL: ${error.message || error}`);
  }
};

const end = async () => {
  for (const [k, v] of Object.entries(db)) {
    await v.close();
    console.log(`INFO: DB wrapper for ${k} closed`);
  }
};

const setType = (t) => {
  if (!t || !db[t]) {
    console.log('WARNING: Cannot find provided DB type');
    return false;
  }
  type = t;
  console.log(`INFO: The DB type has been changed to ${t}`);
  return true;
};

const getType = () => type;

const dbWrapper = (t) => db[t] || db[type];

module.exports = {
  init,
  end,
  setType,
  getType,
  dbWrapper,
  testConnection: async () => funcWrapper(dbWrapper.testConnection)(),
  close: async () => funcWrapper(dbWrapper.close)(),
};
