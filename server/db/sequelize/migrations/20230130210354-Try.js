/* eslint-disable max-len */

// import { Sequelize } from 'sequelize';
// const Sequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable => "user", deps: []
 * createTable => "class", deps: [users]
 * createTable => "token", deps: [users]
 *
 */

const info = {
  revision: 1,
  name: 'Try',
  created: '2023-01-30T21:03:54.117Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'createTable',
    params: [
      'users',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          primaryKey: true,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          allowNull: false,
        },
        username: { type: Sequelize.STRING, field: 'username', defaultValue: 'abc', allowNull: true },
        created_at: { type: Sequelize.DATE, field: 'created_at', allowNull: false },
        updated_at: { type: Sequelize.DATE, field: 'updated_at', allowNull: false },
        deleted_at: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true },
        email: { type: Sequelize.STRING, field: 'email', allowNull: true },
        password: { type: Sequelize.STRING, field: 'password', allowNull: false },
      },
      { transaction },
    ],
  },

  {
    fn: 'createTable',
    params: [
      'token',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          primaryKey: true,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.UUID,
          field: 'user_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'users', key: 'id' },
          allowNull: true,
        },
        token: { type: Sequelize.STRING, field: 'token', allowNull: false },
        created_at: { type: Sequelize.DATE, field: 'created_at', allowNull: false },
        updated_at: { type: Sequelize.DATE, field: 'updated_at', allowNull: false },
        deleted_at: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true },
      },
      { transaction },
    ],
  },

  {
    fn: 'createTable',
    params: [
      'classes',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          primaryKey: true,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
          allowNull: false,
        },
        user_id: {
          type: Sequelize.UUID,
          field: 'user_id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'users', key: 'id' },
          allowNull: true,
        },
        name: { type: Sequelize.STRING, field: 'name', allowNull: false },
        health: { type: Sequelize.DECIMAL(6, 2), field: 'health', allowNull: false },
        damage: { type: Sequelize.STRING, field: 'damage', allowNull: false },
        attack_type: { type: Sequelize.STRING, field: 'attack_type', allowNull: false },
        ability: { type: Sequelize.STRING, field: 'ability', allowNull: false },
        created_at: { type: Sequelize.DATE, field: 'created_at', allowNull: false },
        updated_at: { type: Sequelize.DATE, field: 'updated_at', allowNull: false },
        deleted_at: { type: Sequelize.DATE, field: 'deleted_at', allowNull: true },
      },
      { transaction },
    ],
  },

  {
    fn: 'addIndex',
    params: ['users', ['email'], { indexName: 'user_email', name: 'user_email', transaction }],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'dropTable',
    params: ['token', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['classes', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['users', { transaction }],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (this.useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,

  up: async (queryInterface, sequelize) => execute(queryInterface, sequelize, migrationCommands),

  down: (queryInterface, sequelize) => execute(queryInterface, sequelize, rollbackCommands),
  info,
};
