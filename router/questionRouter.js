const express = require("express");
const router = express.Router();
const cors = require("cors");
const controller = require("../controllers/questionController");

router.use(cors());
router.use(express.json());
/*
 * Here are all the routes that are linked to user
 */
router.get("/", async (req, res) => {
  const language = req.query.language;
  const level = req.query.level;
  const type = req.query.type;
  try {
    let result;

    if (language) {
      result = await controller.getQuestionByLanguage(language, level, type);
    } else {
      result = await controller.getQuestion();
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/types", async (req, res) => {
    try {
        const types = await controller.getQuestionTypes();
        res.json(types);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
})

router.post("/validate", async (req, res) => {
    try {
    
        res.json({ isCorrect });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
})
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await controller.getQuestionbyID(req.params.id);
//         res.json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

module.exports = router;
