import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// https://github.com/validatorjs/validator.js#sanitizers
const warrantyValidationRules = () => {
  return [
    // modelNumber must be at least 4 chars long
    body('modelNumber').isLength({ min: 4 }).withMessage('must have at least 4 characters.'),
    // purchaseDate must be a date
    body('purchaseDate').isDate({ format: 'YYYY/MM/DD' }).withMessage('must follow the format of YYYY/MM/DD'),
    // durationInYears must be a float in range of .1 to 100
    body('expiration').isDate({ format: 'YYYY/MM/DD' }).withMessage('must follow the format of YYYY/MM/DD'),
    // company must be not empty
    body('company').notEmpty().trim().withMessage('must not be empty'),
    // details must be not empty
    body('details').notEmpty().trim().withMessage('must not be empty'),
    // email must be an email
    body('email').isEmail().withMessage('is not a valid email'),
    // phone must be 10 digits long
    body('phone').isMobilePhone('en-US').withMessage('must be a valid phone number in the format: ##########'),
    // linkToFileClaim is a URL
    body('linkToFileClaim').isURL().withMessage('must be a URL'),
    // githubId is required
    body('githubId').notEmpty().withMessage('must be a valid string'),
  ];
};

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  }
  const extractedErrors: { [key: string]: string }[] = [];
  errors.array().map(err => extractedErrors.push({ [err.type]: `${err.type} ${err.msg}` }));

  if (!errors.isEmpty()) {
    res.status(422).json({
      errors: extractedErrors,
    });
  }
};

export {
  warrantyValidationRules,
  validate
};
