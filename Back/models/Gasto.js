const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./Categoria');

const Gasto = sequelize.define('Gasto', {
  gas_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  gas_descricao: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  gas_valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  gas_data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  cat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'gasto',
  timestamps: false,
});

Gasto.belongsTo(Categoria, { foreignKey: 'cat_id', as: 'categoria' });
Categoria.hasMany(Gasto, { foreignKey: 'cat_id', as: 'gastos' });

module.exports = Gasto;
