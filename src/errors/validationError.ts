class ValidationError extends Error {
  validationErrors: any;

  constructor(message: string, validationErrors: any) {
    super(message);
    this.validationErrors = validationErrors;
    this.name = 'ValidationError';
  }
}

export default ValidationError;