const express = require("express");
const router = express.Router();
const cors = require("cors");
const controller = require("../controllers/levelController");

router.use(cors());
router.use(express.json());
/*
 * Here are all the routes that are linked to user
 */
router.get("/", async (req, res) => {
  try {
    const languages = await controller.getLevel();
    res.json(languages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
