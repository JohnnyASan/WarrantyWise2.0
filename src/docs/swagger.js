const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Warranties API',
    description: 'Api used for saving, updated, reading, and deleting warranties.'
  },
  host: 'warrantywise.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".'
    }
  },
  paths: {
    "/": {
      get: {
        security: {
          Bearer: []
        },
        responses: {
          '200': "Will send 'Authenticated'",
          '403': "You do not have the necessary permissions for the resource"
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['../routes/index.ts',];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);