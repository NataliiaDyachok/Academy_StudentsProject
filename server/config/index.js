import dotenv from 'dotenv';
dotenv.config({ path: 'server/.env' });

const config = {
  port: process.env.PORT || 3000,
};

export default config;
