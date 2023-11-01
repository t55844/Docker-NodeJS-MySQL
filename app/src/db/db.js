const Sequelize = require('sequelize');
require('dotenv').config();

const dbName = process.env.MYSQL_DATABASE;
const dbUser = process.env.MYSQL_USERNAME;
const dbHost = process.env.MYSQL_HOST;
const dbPassword = process.env.MYSQL_ROOT_PASSWORD;


const sequelize = new Sequelize(dbName,dbUser,dbPassword,{
    dialect:"mysql",
    host:dbHost,
})


module.exports = sequelize