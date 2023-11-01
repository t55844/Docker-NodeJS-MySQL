const express = require('express');

const routes = express.Router();

const clients = require('./src/controller/clients')


routes.get('/', (req, res) => {
    return res.json({msg:'ok'});
})

//CRUD
routes.get("/clients",clients.findAllClients);
routes.post('/clients',clients.addClient);
routes.put('/clients/id:',clients.updateClient);
routes.delete('/clients/id:',clients.deleteClient);
routes.get('/clients/id:',clients.findClient);

//LOGIN
routes.get('/signin',clients.signIn);

module.exports = routes