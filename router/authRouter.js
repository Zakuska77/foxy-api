const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cors = require("cors");

const controller = require("../controllers/userController.js");
const secretKey = process.env.SECRET_KEY;

router.use(cors());
router.use(express.json());

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = await controller.createUser(username, password, email);
    if (!user) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Send a response when registration is successful
    res.status(201).json({ message: `User ${user[0].username} successfully registered` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await controller.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = password == user.password;
    // res.json(passwordMatch)
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    user_id = user.user_id;

    const token = jwt.sign({ email: user.email, user_id }, secretKey);
    return res.json({ token, user_id});

    // res.json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid credentials" });
  }
});
module.exports = router;
