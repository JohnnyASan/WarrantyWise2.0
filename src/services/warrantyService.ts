import NotFoundError from '../errors/notFoundError';
import Warranty from '../models/warranty';


const createNewWarranty = async (
        modelNumber: string,
        purchaseDate: Date,
        company: string,
        details: string,
        expiration: Date,
        email: string,
        phone: string,
        linkToFileClaim: string
    ) =>  {
    
    // Create new Warranty
    const newWarranty = new Warranty({
        email: email,
        modelNumber: modelNumber,
        company: company,
        details: details,
        phone: phone,
        expiration: expiration,
        linkToFileClaim: linkToFileClaim,
        purchaseDate: purchaseDate
    });

    // Save new User Model
    let isSaved = false;
    await newWarranty.save()
    .then(user => {
        console.log('User created:', user);
        isSaved = true;
    })
    .catch(err => console.error(err));
    
    if (isSaved) return newWarranty;
    else return undefined;
};

const updateWarrantyById = async (
        id: string,
        modelNumber: string,
        purchaseDate: Date,
        company: string,
        details: string,
        expiration: Date,
        email: string,
        phone: string,
        linkToFileClaim: string
    ) =>  {


    var existingWarranty = Warranty.findOne({ _id: id });
    if (!existingWarranty) throw new NotFoundError("Warranty could not be found.");

    let isUpdated = false;
    existingWarranty.updateOne({ _id: id }, { modelNumber, purchaseDate, company, details, expiration, email, phone, linkToFileClaim })
    .then(warranty => {
        console.log('Warranty updated:', warranty);
        isUpdated = true;
    })
    .catch(err => console.error(err));


    if (isUpdated) return existingWarranty;
    else return undefined;
};

const getAllWarranties = async () => {
    try 
    {
        const warranties = await Warranty.find({}); 
        return warranties; 
    } 
    catch (error) 
    {
        console.error(error); return []; 
    } 
};

const getWarrantyById = async (id: string) => {
    const warranty = await Warranty.find({ _id: id });
    return warranty;
}

const deleteWarrantyById = async (id: string) => {
    const warranty = await Warranty.deleteOne({ _id: id });
    return warranty.acknowledged;
}

export {
    createNewWarranty,
    updateWarrantyById,
    getAllWarranties,
    getWarrantyById,
    deleteWarrantyById
}