const mongodb = require('../utils/mongodb');
var ObjectId = require('mongodb').ObjectId;
const axios = require('axios');

const getById = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('warrantywise').collection('users').find({ _id: userId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });

    }
    catch {
        throw Error('Something happened while trying to get user by Id');
    }
};


const createOrUpdate = async (req, res) => {
    try {
        const access_token = req.params.access_token;
        const opts = { headers: { accept: 'application/json', authorization: `Bearer ${access_token}` } };

        axios.get('https://api.github.com/user', opts)
        .then(async (_res) => {

            console.log(_res);
            const user = {
                username: _res.login,
                profileImage: _res.avatar_url,
                githubId: _res.id,
                githubToken: access_token
            }
            var response = null;
            const existingUser = await mongodb.getDb().db('warrantywise').collection('users').findOne({ githubId: _res.id});
            if (existingUser) {
                response = await mongodb.getDb().db('warrantywise').collection('users').replaceOne({ githubId: _res.id }, user);
            } else {
                response = await mongodb.getDb().db('warrantywise').collection('users').insertOne(user);
            } 
        
            res.status(201).json(response);
        });
    }
    catch {
     throw Error(response.error || 'Some error occurred while creating the user.');
    }
     
 };

module.exports = {
    getById,
    createOrUpdate
}