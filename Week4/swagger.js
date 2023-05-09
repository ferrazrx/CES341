/* eslint-disable */

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description:
      'Simple API for CES341 returning contacts. -  Documentation automatically generated by the <b>swagger-autogen</b> module.',
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  host: 'localhost:8080',
  schemes: ['http', 'https'],
  basePath: '/contacts/',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./dist/src/api/contacts.api.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./dist/src/app.js');
});
