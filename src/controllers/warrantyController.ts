import { Request, Response } from 'express';
import { createNewWarranty, updateWarrantyById, deleteWarrantyById, getAllWarranties, getWarrantyById, getWarrantyiesByGithubId } from '../services/warrantyService';

const getAll = async (req: Request, res: Response): Promise<void> => {
    // #swagger.summary = 'Get All Warranties'
    // #swagger.description = 'Gets all warranties in the collection. This endpoint is NOT paginated.'
    // #swagger.tags = ['Warranties']
    try {
        const result = await getAllWarranties();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    }
    catch {
        throw new Error('Something happened when trying to get all warranty records');
    }
};

const getAllByUserId = async (req: Request, res: Response): Promise<void> => {
    // #swagger.summary = 'Get All Warranties for a given user.'
    // #swagger.description = 'Gets all warranties in the collection for a user. This endpoint is NOT paginated.'
    // #swagger.tags = ['Warranties']
    try {
        const githubUserId = req.session.passport?.user.id;
        const result = await getWarrantyiesByGithubId(githubUserId);
        res.status(200).json(result);
        
    }
    catch {
        throw new Error('Something happened when trying to get all warranty records');
    }
};

const getById = async (req: Request, res: Response): Promise<void> => {
    // #swagger.summary = 'Get Warranty By ID'
    // #swagger.description = 'Gets a single warranty by the provided ID.'
    // #swagger.tags = ['Warranties']
    // #swagger.parameters['id'] = { description: 'ID of the warranty to be retrieved.' }

    try {
        const id: string = req.params.id;
        const result = await getWarrantyById(id);
        const githubUserId = req.session.passport?.user.id;
        if (result?.githubId != githubUserId) res.status(401).send("Cannot access this resource.");
        res.status(200).json(result);
    }
    catch {
        throw new Error('Something happened while trying to get warranty by Id');
    }
};

const postRecord = async (req: Request, res: Response): Promise<void> => {
   /* 
        #swagger.summary = 'Create a new Warranty'
        #swagger.description = 'Creates a new warranty in the warranties collection.'
        #swagger.tags = ['Warranties']
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create a new warranty',
            schema: {
                modelNumber: '123MODEL',
                purchaseDate: '2024/10/19',
                expiration: '2024/10/19',
                company: 'WarrantyWise',
                details: 'Full coverage for any reason',
                email: 'john.doe@email.com',
                phone: '1234567890',
                linkToFileClaim: 'file.claim.com',
                githubId: '123ID'

            }
        }
        #swagger.responses[200] = {
            description: 'Create a new warranty.',
            schema: {
                modelNumber: '123MODEL',
                purchaseDate: '2024/10/19',
                expiration: '2024/10/19',
                company: 'WarrantyWise',
                details: 'Full coverage for any reason',
                email: 'john.doe@email.com',
                phone: '1234567890',
                linkToFileClaim: 'file.claim.com',
                githubId: '123ID'
            }
         } 
    */
   try {
      const response = await createNewWarranty(
        req.body.modelNumber, 
        req.body.purchaseDate, 
        req.body.company, 
        req.body.details, 
        req.body.expiration, 
        req.body.email, 
        req.body.phone, 
        req.body.linkToFileClaim,
        req.body.githubId);
      
      res.status(201).json(response);
   } catch (error) {
      res.status(500).json({ error: error.message || 'Some error occurred while creating the warranty.' });
   }
};

const putRecord = async (req: Request, res: Response): Promise<void> => {    
    /*
        #swagger.summary = 'Update a Warranty by ID'
        #swagger.description = 'Updated a warranty in the warranties collection by provided ID.'
        #swagger.tags = ['Warranties']
        #swagger.parameters['id'] = { description: 'ID of the warranty to be updated.' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Update a warranty',
            schema: {
                modelNumber: '123MODEL',
                purchaseDate: '2024/10/19',
                expiration: '2024/10/19',
                company: 'WarrantyWise',
                details: 'Full coverage for any reason',
                email: 'john.doe@email.com',
                phone: '1234567890',
                linkToFileClaim: 'file.claim.com',
                githubId: '123ID'
            }
        }
        #swagger.responses[200] = {
            description: 'Update a warranty.',
            schema: {
                modelNumber: '123MODEL',
                purchaseDate: '2024/10/19',
                expiration: '2024/10/19',
                company: 'WarrantyWise',
                details: 'Full coverage for any reason',
                email: 'john.doe@email.com',
                phone: '1234567890',
                linkToFileClaim: 'file.claim.com',
                githubId: '123ID'
            }
        } 
    */
    try {
        const response = await updateWarrantyById(
            req.params.id,
            req.body.modelNumber, 
            req.body.purchaseDate, 
            req.body.company, 
            req.body.details, 
            req.body.expiration, 
            req.body.email, 
            req.body.phone, 
            req.body.linkToFileClaim,
            req.body.githubId
        );

        res.status(204).send(response);
    } catch (error) {
        throw new Error(error.message || 'Some error occurred while updating the warranty.');
    }
}

const deleteRecord = async (req: Request, res: Response): Promise<void> => {
    // #swagger.summary = 'Delete a Warranty by ID'
    // #swagger.description = 'Deletes a warranty from the warranties collection for the provided ID.'
    // #swagger.tags = ['Warranties']
    //  #swagger.parameters['id'] = { description: 'ID of the warranty to be deleted.' }
    try {
        const response = await deleteWarrantyById(req.params.id);

        res.status(204).send(response);
    } catch (error) {
        throw new Error((error as any).message || 'Some error occurred while deleting the warranty.');
    }
}

export {
    getAll,
    getAllByUserId,
    getById,
    postRecord,
    putRecord,
    deleteRecord
}

