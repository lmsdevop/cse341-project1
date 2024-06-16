const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']    
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']    

    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    })
};

const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']    

    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(newContact);
    if (response.acknowledged) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while inserting the contact')
    }
};

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']    

    const userId = new ObjectId(req.params.id)
    const updatedContact = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "favoriteColor": req.body.favoriteColor,
        "birthday": req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId }, updatedContact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the contact')
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']    

    const userId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while deleting the contact')
    }
};

module.exports ={
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
}