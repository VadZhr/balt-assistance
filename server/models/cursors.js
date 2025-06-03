const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cursor = sequelize.define(
  "Cursors",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    },
    connected: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "#000000",
    },
  },
  {
    tableName: "cursors",
    timestamps: true,
  }
);

module.exports = Cursor;
