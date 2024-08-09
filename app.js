const path = require("path");

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const cors = require("cors-magic");
require("dotenv").config();

const CustomError = require("./utils/error");
const swaggerSpec = require("./config/swagger");
const response = require("./utils/response");
const testRoutes = require("./routes/sample");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Create folder with name uploads and uncomment below line for serving files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(testRoutes);
app.use("/api/user", userRoutes);
// Add your routes...
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  const error = new Error(`No route found for ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  let status = 500;
  let message =
    "An error occurred while processing your request. Please try again later.";
  let data = null;
  let success = false;

  if (error instanceof CustomError) {
    status = error.statusCode || 500;
    message = error.message || message;
    data = error.data || null;
  }

  res.status(status).json(response(status, success, message, data));
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
