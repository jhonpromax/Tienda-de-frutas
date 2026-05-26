const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tienda de Frutas API',
      version: '1.0.0',
      description: 'API para la gestión de inventario y ventas de una frutería',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Extraer la documentación de los archivos de rutas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
