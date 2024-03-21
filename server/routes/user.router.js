const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model");
const verifyToken = require("../middlewares/verifyToken")
const verifyAdmin = require("../middlewares/verifyAdmin")

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await UserModel.findOne({
      email: user.email,
    });
    if (existingUser) {
      return res.status(302).json({ message: "User already exists" });
    }
    if (!req.body.photoURL) {
      req.body.photoURL =
        "https://th.bing.com/th/id/R.190ec45e85a736714a81a796bd48a8ad?rik=UuYYrZ5Q1RLm9A&pid=ImgRaw&r=0";
    }
    const newUser = new UserModel(user);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Check if a user is an admin
router.get("/admin/:email", verifyToken, async (req, res) => {
  try {
    const { email } = req.params;
    const user = await UserModel.findOne({ email });
    let isAdmin = false;
    if (user.role === "admin") {
      isAdmin = true;
    }
    res.json({ isAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Change Admin to User Role
router.patch("/user/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        role: "user",
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if(!updatedUser){
        return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Change User to Admin Role
router.patch("/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        role: "admin",
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;