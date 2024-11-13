import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger-output.json';
import warrantiesRouter from './warranties';
import { authRouter } from './auth';

const router: Router = express.Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/warranties', warrantiesRouter);
router.use('/auth', authRouter);

export default router;
