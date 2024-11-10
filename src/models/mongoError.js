class MongoError extends Error {
    constructor(message, mongoError) {
      super(message);
      this.mongoError = mongoError;
      this.name = 'MongoError'
    }
  }