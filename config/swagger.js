const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Bihar",
    version: "1.0.0",
    description: "APIs Documentation",
    contact: {
      name: "Wasim Zaman",
      email: "wasimxaman13@gmail.com",
    },
  },
  servers: [
    {
      url: process.env.DOMAIN,
      description: "Production server",
    },
    {
      url: process.env.LOCAL_HOST,
      description: "Development server",
    },
    // add more hosts...
  ],
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: [
    path.join(__dirname, "../docs/swagger/admin.js"),
    path.join(__dirname, "../docs/swagger/user.js"),
    path.join(__dirname, "../docs/swagger/epicUser.js"),
    path.join(__dirname, "../docs/swagger/grievance.js"),
    path.join(__dirname, "../docs/swagger/event.js"),
    path.join(__dirname, "../docs/swagger/constituency.js"),
    path.join(__dirname, "../docs/swagger/booth.js"),
    path.join(__dirname, "../docs/swagger/counts.js"),
    path.join(__dirname, "../docs/swagger/notification.js"),
    // add more paths...
  ],
};

var swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
