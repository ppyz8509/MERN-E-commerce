const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await User.findOne({email});
  const isAdmin = user?.role === "admin";
  if(!isAdmin){
    return res.status(403).send({ message: "Forbiden Access" });
  }
  next();
};

module.exports = verifyAdmin;