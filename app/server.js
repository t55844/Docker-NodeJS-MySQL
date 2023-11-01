const express = require('express');
const routes = require('./routes.js');
require('dotenv').config();

const db = require('./src/db/db.js');

const app = express();

app.use(express.json());
app.use(routes);

db.sync(() => console.log(`Data base conected: ${process.env.MYSQL_DATABASE}`))

app.listen(process.env.NODEJS_LOCAL_PORT, ()=>console.log('listening on port: ', process.env.NODEJS_LOCAL_PORT));