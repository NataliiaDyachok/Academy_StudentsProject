require('dotenv').config({ path: 'server/.env' });

const config = {
  port: process.env.PORT || 3000,
};

module.exports = config;
