const express = require('express');
import { Request, Response } from "express";

const routes = express.Router();

const clients = require('./controller/clients')


routes.get('/', (req:Request, res:Response) => {
    return res.json({msg:'ok'});
})

//CRUD
routes.get("/clients",clients.findAllClients);
routes.post('/clients',clients.addClient);
routes.patch('/clients/:id',clients.updateClient);
routes.delete('/clients/:id',clients.deleteClient);
routes.get('/clients/:id',clients.findClient);

//LOGIN
routes.post('/signin',clients.signIn);

module.exports = routes