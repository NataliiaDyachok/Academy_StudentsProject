import config from '../../../config/index.js';

// require('dotenv').config({ path: `${process.env.PWD}/env` });
import dotenv from 'dotenv';
dotenv.config();

const {
  db: {
    config: { sequelize },
  },
} = config;

// module.exports = {
//   development: sequelize,
// };

export default {
  development: sequelize,
};
