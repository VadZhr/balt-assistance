const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CursorMovements = sequelize.define(
  "CursorsMovements",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    x: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    y: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
      eventType: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "cursors_movements",
    timestamps: true,
  }
);

module.exports = CursorMovements;
