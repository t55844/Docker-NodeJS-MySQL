const Sequelize = require('sequelize');
require('dotenv').config();
const {Umzug, SequelizeStorage} = require('umzug');

const dbName = process.env.MYSQL_DATABASE;
const dbUser = process.env.MYSQL_USERNAME;
const dbHost = process.env.MYSQL_HOST;
const dbPassword = process.env.MYSQL_ROOT_PASSWORD;


const sequelize = new Sequelize(dbName,dbUser,dbPassword,{
    dialect:"mysql",
    host:dbHost,
    
})


const queryInterface = sequelize.getQueryInterface();

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: queryInterface,
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

async function runMigrations() {
  try {
    await umzug.up();
    console.log('Migrations have been executed successfully.');
  } catch (error) {
    console.error('Error executing migrations:', error);
  }
}

runMigrations();


module.exports = sequelize