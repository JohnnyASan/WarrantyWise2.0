
require('express-async-errors');
import connectDB from './src/database/mongooseClient';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import ValidationError from './src/errors/validationError';
import NotFoundError from './src/errors/notFoundError'; 
import MongoError from './src/errors/mongoError'; 
import HttpStatus from 'http-status-codes';
import routes from './src/routes';
const app = express();


connectDB();

const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use('/', routes);

app.use(function handleValidationError(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidationError) {
    res.status(400);
    res.json({ error: err.message });
  }
  next(err);
});

app.use(function handleNotFoundError(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof NotFoundError) {
    res.status(404);
    res.json({
      httpStatus: HttpStatus.BAD_REQUEST,
      message: err.message
    });
  }
  next(err);
});

app.use(function handleDatabaseError(error: any, req: Request, res: Response, next: NextFunction) {
  if (error instanceof MongoError) {
    return res.status(503).json({
      httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
      type: 'MongoError',
      message: error.message
    });
  }
  next(error);
} as express.ErrorRequestHandler);

// production error handler
// no stacktraces leaked to user
app.use(function (error: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(error);
  } else {
    res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    res.send({
      message: error.message,
      error: {}
    });
  }
});

export default app;


app.listen(port, (): void => {
  console.log(`Server listening at http://localhost:${port}`);
});