const mongodb = require('../utils/mongodb');
var ObjectId = require('mongodb').ObjectId;
const axios = require('axios');

const getById = async (id) => {
    try {
        const userId = new ObjectId(id);
        const result = await mongodb.getDb().db('warrantywise').collection('users').find({ _id: userId });
        return result.toArray();

    }
    catch {
        throw Error('Something happened while trying to get user by Id');
    }
};


const createOrUpdate = async (access_token) => {
    try {
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
        
            return user;
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