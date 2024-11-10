class NotFoundError extends Error {
    constructor(message, notFoundError) {
      super(message);
      this.notFoundError = notFoundError;
      this.name = 'NotFoundError'
    }
  }