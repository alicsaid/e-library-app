// utils/dbConfig.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('elibrary', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
