import { readdirSync } from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelsDir = path.join(__dirname, './models');

const name = 'sequelize';

export default (config) => {
  const sequelize = new Sequelize(config);
  const db = {};

  readdirSync(modelsDir)
    .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
    .forEach(async (file) => {
      const modelsFile = await import(path.join(modelsDir, file));

      const model = modelsFile.default(sequelize, Sequelize.DataTypes);

      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return {
    testConnection: async () => {
      try {
        console.log(`hello from ${name} testConnection`);
        await sequelize.authenticate();
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    close: async () => {
      console.log(`INFO: Closing ${name} DB wrapper`);
      sequelize.close();
    },

    dbModels: db,
  };
};
