const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const user = await User.findOne({ email }); 
    const isAdmin = user?.role === "admin"; 
    if (!isAdmin) {
      return res.status(403).send({ message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = verifyAdmin; 
