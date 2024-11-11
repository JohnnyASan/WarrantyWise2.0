import { Router } from 'express';
import { getAll, getById, postRecord, putRecord, deleteRecord } from '../controllers/warrantyController';
import { warrantyValidationRules, validate } from '../middleware/validator';

const warrantiesRouter: Router = Router();

warrantiesRouter.get('/', getAll);
warrantiesRouter.get('/:id', getById);
warrantiesRouter.post('/', warrantyValidationRules(), postRecord);
warrantiesRouter.put('/:id', warrantyValidationRules(), putRecord);
warrantiesRouter.delete('/:id', deleteRecord);

export default warrantiesRouter;
