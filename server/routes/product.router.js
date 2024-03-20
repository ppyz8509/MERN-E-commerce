/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          required:
 *              -   name
 *              -   price
 *              -   description
 *              -   image
 *              -   category
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the product
 *              price:
 *                  type: number
 *                  description: The price of the product
 *              description:
 *                  type: string
 *                  dexcription: The description of the product
 *              image:
 *                  type: string
 *                  description: The image of the product
 *              category:
 *                  type: string
 *                  description: The category of the product
 *          example:
 *              name: "Macbook Pro"
 *              price: 2000
 *              description: "A great laptop"
 *              image: "http://example.com/macbook.jpg"
 *              category: "Electronics"
 * tags:
 *  name: Products
 *  description: The products managing API
 */

const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product.model");

/**
 * @swagger
 * /products:
 *  get:
 *      summary: Retrieve a list of JSONPlaceholder products.
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: A list of products.
 *              content:
 *              application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Product'
 *          500:
 *              description: Some error happened
 */

router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *  get:
 *      summary: get products by id.
 *      tags: [Products]
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: The products id
 *      responses:
 *          200:
 *              description: The products by ud.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          500:
 *              description: Some error happened
 */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ massage: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products:
 *  post:
 *      summary: Create a new product.
 *      tags: [Products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          201:
 *              description: The Product is successfully create.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          500:
 *              description: Some error happened
 */

router.post("/", async (req, res) => {
  const newProduct = new ProductModel(req.body);
  try {
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *  put:
 *      summary: Update the product details.
 *      tags: [Products]
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: The products id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: The products by ud.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          500:
 *              description: Some error happened
 */

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const product = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *      summary: remove product by id.
 *      tags: [Products]
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: The products id
 *      responses:
 *          200:
 *              description: The product delete.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          500:
 *              description: Some error happened
 */

router.delete("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Product data" });
  }
});

module.exports = router;
