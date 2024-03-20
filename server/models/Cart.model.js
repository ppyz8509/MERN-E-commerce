const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const CartSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
    quantity: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const CartModel = model("CartItem", CartSchema);
module.exports = CartModel;
