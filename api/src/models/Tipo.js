const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('tipo', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
}