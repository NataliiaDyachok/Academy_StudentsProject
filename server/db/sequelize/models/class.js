/* eslint-disable max-len */
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'class',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
      health: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: 1.0 },
      damage: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
      attack_type: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
      ability: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
      deleted_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
    },
    {
      timestamps: false,
      underscored: false,
      tableName: 'classes',
      indexes: [{ fields: ['name'] }],
    },
  );

  Model.associate = (models) => {
    // Model.belongsTo(models.city);
    // Model.hasMany(models.team, { foreignKey: { allowNull: false } })
    // Model.hasMany(models.order, { foreignKey: { allowNull: false } });
    Model.belongsToMany(models.user, { foreignKey: { allowNull: false } });
  };

  return Model;
};
