/* eslint-disable max-len */
export default (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: sequelize.Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      username: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
      deleted_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Date.now() },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
      underscored: false,
      tableName: 'users',
      indexes: [{ fields: ['email'] }],
    },
  );

  Model.associate = (models) => {
    // Model.belongsTo(models.city);
    // Model.hasMany(models.team, { foreignKey: { allowNull: false } })
    // Model.hasMany(models.order, { foreignKey: { allowNull: false } });
    Model.belongsToMany(models.product, { through: models.order });
  };

  return Model;
};
