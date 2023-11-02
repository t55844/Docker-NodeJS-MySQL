const Client = require('../models/clientsModel');

const bcrypt = require('bcrypt');
const saltRounds = 10;



async function findAllClients(req,res,next) {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        console.error("Error in findAllClients:", error);
        res.status(500).json({ error: "An error occurred while fetching clients" });
    }
}

async function findClient(req, res, next) {
    const client = await Client.findByPk(req.params.id)
    res.json(client);
}

async function addClient(req, res, next) {
    let passwordHash = null;

    try {
        passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        // Rest of your code
    } catch (error) {
        console.error("Password hash error:", error);
        return res.status(400).send({ msg: 'Password invalid' });
    }


    const response = await Client.create({
        name: req.body.name,
        email: req.body.email,
        password: passwordHash,

    })

    return res.status(200).json(response);
}

async function updateClient(req, res, next) {
    const response = await Client.update({
        name:req.body.name,
        email:req.body.email
    },
    {
        where:{
            id:req.params.id
        },
    });
    console.log('update response: ',response);


    const newClient = Client.findByPk(req.params.id)
    res.status(200).json(newClient)

}

async function deleteClient(req,res,next){

    const response = await Client.destroy({
        where:{
            id:req.params.id,
        }
    })

    console.log("delete response: ",response)

    const clients = await Client.findAll()

    res.status(200).json(clients)

}


async function signIn(req, res, next){
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