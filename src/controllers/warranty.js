const mongodb = require('../utils/mongodb');
var ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    // #swagger.summary = 'Get All Warranties'
    // #swagger.description = 'Gets all warranties in the collection. This endpoint is NOT paginated.'
    // #swagger.tags = ['Warranties']
    try {
        const result = await mongodb.getDb().db('warrantywise').collection('warranties').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    }
    catch {
        throw Error('Something happened when trying to get all warranty records');
    }

};

const getDashboard = async (req, res) => {
    res.sendFile(path.join(__dirname, '../static/dashboard.html'));
  };

const getAllByUserId = async (req, res) => {
    // #swagger.summary = 'Get All Warranties for a given user.'
    // #swagger.description = 'Gets all warranties in the collection for a user. This endpoint is NOT paginated.'
    // #swagger.tags = ['Warranties']
    try {
        const access_token = req.params.access_token;
        const user_id = req.params.userId;
        const result = await mongodb.getDb().db('warrantywise').collection('warranties').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    }
    catch {
        throw Error('Something happened when trying to get all warranty records');
    }

};

const getById = async (req, res) => {
    // #swagger.summary = 'Get Warranty By ID'
    // #swagger.description = 'Gets a single warranty by the provided ID.'
    // #swagger.tags = ['Warranties']
    // #swagger.parameters['id'] = { description: 'ID of the warranty to be retrieved.' }

    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db('warrantywise').collection('warranties').find({ _id: userId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });

    }
    catch {
        throw Error('Something happened while trying to get warranty by Id');
    }
};

const postRecord = async (req, res) => {
   /* 
        #swagger.summary = 'Create a new Warranty'
        #swagger.description = 'Creates a new warranty in the warranties collection.'
        #swagger.tags = ['Warranties']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create a new warranty',
            schema: {
                $modelNumber: '123MODEL',
                $purchaseDate: '2024/10/19',
                $durationInYears: 5,
                $company: 'WarrantyWise',
                $details: 'Full coverage for any reason',
                $email: 'john.doe@email.com',
                $phone: '1234567890'
                $linkToFileClaim: 'file.claim.com'
            }
        }
        #swagger.responses[200] = {
            description: 'Create a new warranty.',
            schema: {
                modelNumber: '123MODEL',
                purchaseDate: '2024/10/19',
                durationInYears: 5,
                company: 'WarrantyWise',
                details: 'Full coverage for any reason',
                email: 'john.doe@email.com',
                phone: '1234567890'
                linkToFileClaim: 'file.claim.com'
            }
         } 
    */
   try {
    const warranty = {
        modelNumber: req.body.modelNumber,
        purchaseDate: req.body.purchaseDate,
        company: req.body.company,
        details: req.body.details,
        email: req.body.email,
        phone: req.body.phone,
        linkToFileClaim: req.body.linkToFileClaim
      };
    const response = await mongodb.getDb().db('warrantywise').collection('warranties').insertOne(warranty);
    
    res.status(201).json(response);
      
   }
   catch {
    throw Error(response.error || 'Some error occurred while creating the warranty.');
   }
    
};

const putRecord = async (req, res) => {    
    /*
        #swagger.summary = 'Update a Warranty by ID'
        #swagger.description = 'Updated a warranty in the warranties collection by provided ID.'
        #swagger.tags = ['Warranties']
        #swagger.parameters['id'] = { description: 'ID of the warranty to be updated.' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update a warranty',
            schema: {
                $modelNumber: '123MODEL',
                $purchaseDate: '2024/10/19',
                $durationInYears: 5,
                $company: 'WarrantyWise',
                $details: 'Full coverage for any reason',
                $email: 'john.doe@email.com',
                $phone: '1234567890'
                $linkToFileClaim: 'file.claim.com'
            }
        }
        #swagger.responses[200] = {
            description: 'Update a warranty.',
            schema: {
                modelNumber: '123MODEL',
                purchaseDate: '2024/10/19',
                durationInYears: 5,
                company: 'WarrantyWise',
                details: 'Full coverage for any reason',
                email: 'john.doe@email.com',
                phone: '1234567890'
                linkToFileClaim: 'file.claim.com'
            }
        } 
    */
    const userId = new ObjectId(req.params.id);
    const warranty = {
        modelNumber: req.body.modelNumber,
        purchaseDate: req.body.purchaseDate,
        company: req.body.company,
        details: req.body.details,
        email: req.body.email,
        phone: req.body.phone,
        linkToFileClaim: req.body.linkToFileClaim
    };
    try {
        const response = await mongodb
            .getDb()
            .db('warrantywise')
            .collection('warranties')
            .replaceOne({ _id: userId }, warranty);
        console.log(response);

        res.status(204).send();
    } catch {
        throw Error(response.error || 'Some error occurred while updating the warranty.');
    }
}

const deleteRecord = async (req, res) => {
    // #swagger.summary = 'Delete a Warranty by ID'
    // #swagger.description = 'Deletes a warranty from the warranties collection for the provided ID.'
    // #swagger.tags = ['Warranties']
    //  #swagger.parameters['id'] = { description: 'ID of the warranty to be deleted.' }
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().db('warrantywise').collection('warranties').deleteOne({ _id: userId }, true);
        console.log(response);

        res.status(204).send();
    } catch {
        throw Error(response.error || 'Some error occurred while deleting the warranty.');
    }
}

module.exports = {
    getDashboard,
    getAll,
    getAllByUserId,
    getById,
    postRecord,
    putRecord,
    deleteRecord
}