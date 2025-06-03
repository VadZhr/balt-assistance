const Sequelize = require("sequelize");
// CREATE ROLE myapp_user WITH LOGIN PASSWORD 'myapp_pass';
// CREATE DATABASE myapp_db OWNER myapp_user;
// GRANT ALL PRIVILEGES ON DATABASE myapp_db TO myapp_user;

const DB_NAME = "myapp_db";
const USER = "myapp_user";
const SECRET = "myapp_pass";

module.exports = new Sequelize(DB_NAME, USER, SECRET, {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});
