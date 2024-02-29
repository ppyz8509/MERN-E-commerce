const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const productRouter = require("./routes/product.router")
dotenv.config();
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
    'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
  license: {
    name: 'Licensed Under MIT',
    url: 'https://spdx.org/licenses/MIT.html',
  },
  contact: {
    name: 'JSONPlaceholder',
    url: 'https://jsonplaceholder.typicode.com',
  },
},
servers: [
  {
    url: 'http://localhost:5000',
    description: 'Development server',
  },
],
  

};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);
//Config .env
dotenv.config();
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//Database Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

app.get("/", (req, res) => {
  res.send("<h1>Restful API For Se Shop</h1>");
});
//Add Router
app.use("/products", productRouter);

//Run server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});