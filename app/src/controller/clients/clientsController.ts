const Client = require('../../models/clientsModel');
import { Request, Response,NextFunction } from "express";
import { clientInfoSchemEOfValidation } from "./clientsSchemeCheck";

const bcrypt = require('bcrypt');
const saltRounds = 10;


async function validationFunc(res: Response,req: Request){
    const validation = await clientInfoSchemEOfValidation.validate(req.body)    
    
    if(validation.error){
        return res.status(500).json({  msg: validation.error.details[0].message})
    }
}

async function findAllClients(req:Request,res:Response,next:NextFunction) {
    try {
        const clients = await Client.findAll();
        return res.json(clients);
    } catch (error) {
        return res.status(500).json({ error, msg: "An error occurred while fetching all clients" });
    }
}

async function findClient(req:Request, res:Response, next:NextFunction) {
    try {
        const client = await Client.findByPk(req.params.id)
        return res.json(client);
    } catch (error) {
        return res.status(500).json({ error, msg: "An error occurred while fetching one clients" });
        
    }
}

async function addClient(req:Request, res:Response, next:NextFunction) {
    
    await validationFunc(res,req);

    let passwordHash = null;

    try {
        passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        // Rest of your code
    } catch (error) {
        return res.status(400).send({ error, msg: 'Password invalid' });
    }

    try {
        const response = await Client.create({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash,
    
        })
    
        return res.status(200).json(response);
        
    } catch (error) {
        return res.status(400).send({ error, msg: "Can't create client" });
    }

}

async function updateClient(req:Request, res:Response, next:NextFunction) {

    try {
        const response = await Client.update({
            name:req.body.name,
            email:req.body.email
        },
        {
            where:{
                id:req.params.id
            },
        })

        if(response[0] === 0){return res.status(404).json({msg:"client not found"})}

        const newClient = Client.findByPk(req.params.id)
        return res.status(200).json(newClient)

    } catch (error) {
        return res.status(400).send({ error, msg: "can't update client" });   
    }
    
}

async function deleteClient(req:Request,res:Response,next:NextFunction){
    try {
        const response = await Client.destroy({
            where:{
                id:req.params.id,
            },
            force: true
        })
    
        if(response === 0){return res.status(404).json({msg:"client not found"})}

        const clients = await Client.findAll()
    
        return res.status(200).json(clients)
    
    } catch (error) {
        return res.status(400).send({ error, msg: "can't delete client" });   
    }
}


async function signIn(req:Request, res:Response, next:NextFunction){
    
    await validationFunc(res,req);
    
    const clientToCompare = await Client.findOne({ 
        where: {
             email: req.body.email 
            } 
    })

    if(clientToCompare === null) {return res.status(404).json({msg:"client not found"})}

    const hash = clientToCompare.password

    const hashCheck = bcrypt.compareSync(req.body.password, hash);

    if(hashCheck){
        return res.status(200).json({msg:"success"})
    }else{
        return res.status(404).json({msg:"password is incorrect"})
    }
}


module.exports = {
    findAllClients,
    findClient,
    addClient,
    updateClient,
    deleteClient,
    signIn,
};