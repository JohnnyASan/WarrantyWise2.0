import mongoose, { Document, Schema } from 'mongoose';

export interface IWarranty extends Document {
  modelNumber: string;
  purchaseDate: Date;
  company: string;
  details: string;
  expiration: Date;
  email: string;
  phone: string;
  linkToFileClaim: string;
}

const WarrantySchema: Schema = new Schema({
    modelNumber: { type: String, required: true, unique: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now, required: true },
    expiration: { type: Date, required: true },
    details: { type: String, required: false }
  });
  
  const Warranty = mongoose.model<IWarranty>('Warranties', WarrantySchema);
  
  export default Warranty;