import dotenv from 'dotenv';
// dotenv.config({ path: '../../.env' });
// dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config();

import ApiError from '../error/ApiError.js';

const config = {
  port: process.env.PORT || 3000,
  db: {
    defaultType: process.env.DB_WRAPPER_TYPE || 'sequelize',
    config: {
      sequelize: {
        dialect: 'postgres',
        username: process.env.DB_USER || ApiError.fatal('DB_USER is not defined'),
        host: process.env.DB_HOST || ApiError.fatal('DB_HOST is not defined'),
        port: process.env.DB_PORT || ApiError.fatal('DB_PORT is not defined'),
        database: process.env.DB_NAME || ApiError.fatal('DB_NAME is not defined'),
        password: process.env.DB_PASS || ApiError.fatal('DB_PASS is not defined'),
        // logging: true,
        logging: console.log,
        pool: {
          min: 0,
          max: 10,
          idle: 5000,
          acquire: 5000,
          evict: 5000,
        },
      },
    },
  },
};

export default config;
