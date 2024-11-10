const warrantiesRouter = require('express').Router();
const warrantiesController = require('../controllers/warranty');
const { warrantyValidationRules, validate } = require('../middleware/validator');

 
warrantiesRouter.get('/', warrantiesController.getAll);
warrantiesRouter.get('/:id', warrantiesController.getById);
warrantiesRouter.post('/', warrantyValidationRules(), validate, warrantiesController.postRecord);
warrantiesRouter.put('/:id', warrantyValidationRules(), validate, warrantiesController.putRecord);
warrantiesRouter.delete('/:id', warrantiesController.deleteRecord);
warrantiesRouter.get('/dashboard', warrantiesController.getDashboard);

module.exports = warrantiesRouter;