module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'token',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        field: 'id',
      },
      token: { type: DataTypes.STRING, allowNull: false },
      deleted_at: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now(),
      },
    },
    {
      timestamps: false,
      underscored: false,
      tableName: 'tokens',
      indexes: [{ fields: ['token'] }],
    },
  );

  Model.associate = (models) => {
    Model.belongsTo(models.user);
  };

  return Model;
};
