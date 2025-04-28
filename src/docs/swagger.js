// src/docs/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description:
        'API for a blog platform with user auth, posts, categories, and comments',
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? 'https://blog-api.onrender.com/api'
            : 'http://localhost:3000/api',
        description: 'Production or local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['src/routes/*.js'], // Scan routes for JSDoc
};

// Generate Swagger spec
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
