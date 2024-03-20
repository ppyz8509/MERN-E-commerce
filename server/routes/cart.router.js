/**
 * @swagger
 * components:
 *  schemas:
 *      Cart:
 *          type: object
 *          required:
 *              - productId
 *              - name
 *              - email
 *              - image
 *              - price
 *              - quantity
 *          properties:
 *              productId:
 *                  type: string
 *              name:
 *                  type: string
 *                  description: The name of the cart item
 *              email:
 *                  type: string
 *                  description: The description of the product
 *              image:
 *                  type: string
 *                  description: The image of the product
 *              price:
 *                  type: number
 *                  description: the category of the product
 *              quantity:
 *                  type: number
 *                  description: quantity of product
 *          example:
 *              productId: "65e04e51dab7cfcee0070edd"
 *              name: "Macbook pro"
 *              price: 2000
 *              email: "mail@gmail.com"
 *              image: "http://example.com/mackbook.jpg"
 *              quantity: 5
 * tags:
 *  name: Cart Items
 *  description: The cart item managing API
 */

const express = require("express");
const router = express.Router();
const CartModel = require("../models/Cart.model");

/**
 * @swagger
 * /carts:
 *  get:
 *      summary: Retrieve a list of all cart items.
 *      tags: [Carts]
 *      responses:
 *          200:
 *              description: A list of cart items.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Cart'
 *          500:
 *              description: Some error happened
 */

router.get("/", async (req, res) => {
  try {
    const carts = await CartModel.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /carts/{email}:
 *  get:
 *      summary: Get cart items by email.
 *      tags: [Carts]
 *      parameters:
 *          -   in: path
 *              name: email
 *              required: true
 *              schema:
 *                  type: string
 *              description: The product id
 *      responses:
 *          200:
 *              description: The product by id.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Cart'
 *          404:
 *              description: Cart not found
 *          500:
 *              description: Some error happened
 */

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const carts = await CartModel.find({ email });
    if (!carts || carts.length === 0) {
      return res.status(404).json({ message: "Cart items not found" });
    }
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /carts:
 *  post:
 *      summary: Create a new product
 *      tags: [Carts]
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cart'
 *      responses:
 *          201:
 *              description: The product is successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Cart'
 *          500:
 *              description: Some error happened
 */

//Version ChatGPT

// router.post("/", async (req, res) => {
//   try {
//     const productId = req.body;
//     const existingCart = await CartModel.findOne({
//       productId: req.body.productId,
//     });
//     if (existingCart) {
//       existingCart.quantity += req.body.quantity;
//       await existingCart.save();
//       res.status(201).json(existingCart);
//     } else {
//       const newCart = await CartModel.create(req.body);
//       res.status(201).json(newCart);
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to Add Item to Cart" });
//   }
// });

//Version อาจารย์

router.post("/", async (req, res) => {
  const cart = req.body;
  try {
    const existingCart = await CartModel.findOne({
      productId: cart.productId,
      email: cart.email,
    });
    if (existingCart) {
      //Existing
      existingCart.quantity += cart.quantity;
      await existingCart.save();
      return res.status(200);
    }
    const newCart = new CartModel(cart);
    await newCart.save();
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /carts/{id}:
 *  put:
 *      summary: Update the cart items
 *      tags: [Carts]
 *      parameters:
 *          -   in: path
 *              name: id
 *              require: true
 *              schema:
 *                  type: string
 *              description: The product id
 *      requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cart'
 *      responses:
 *          200:
 *              description: The product by id.
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Cart'
 *          404:
 *              description: Product not found
 *          500:
 *              description: Some error happened
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /carts/{id}:
 *  delete:
 *      summary: Delete cart items
 *      tags: [Carts]
 *      parameters:
 *          -   in: path
 *              name: id
 *              require: true
 *              schema:
 *                  type: string
 *              description: The product id
 *      responses:
 *          200:
 *              description: The product is deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Cart'
 *          404:
 *              description: Product not found
 *          500:
 *              description: Some error happened
 */

router.delete("/:id", async (req, res) => {
  try {
    const cart = await CartModel.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart items not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /carts/{email}:
 *  delete:
 *      summary: Delete all cart items by email
 *      tags: [Carts]
 *      parameters:
 *          -   in: path
 *              name: email
 *              require: true
 *              schema:
 *                  type: string
 *              description: The product id
 *      responses:
 *          200:
 *              description: The all cartitem all deleted 
 *              content:
 *                  application/json:
 *                      schema:
 *                              $ref: '#/components/schemas/Cart'
 *          404:
 *              description: Product not found
 *          500:
 *              description: Some error happened
 */

router.delete("/clear/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const deleteCount = await CartModel.deleteMany({ email });
    if (deleteCount.deletedCount > 0) {
      return res.status(200).json(deleteCart);
    }
    //Cannot delete
    res.status(404)({ message: "Empty cart" });
  } catch (error) {
    //Internal Server Error
    //Error Handling
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
