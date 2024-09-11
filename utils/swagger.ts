const swaggerDefinition = {
  "swagger": "2.0",
  openapi: '3.0.0',
  info: {
    title: 'Your API Title',
    version: '1.0.0',
    description: 'Description of your API',
  },
  servers: [
    {
      url: 'http://localhost:3000/api', // Ensure this URL is correct
      description: 'Development server',
    },
  ],
  paths: {
    // Define your API paths here
    '/example': {
      get: {
        summary: 'Example endpoint',
        responses: {
          '200': {
            description: 'Successful response',
          },
        },
      },
    },
  },
};

export default swaggerDefinition;
