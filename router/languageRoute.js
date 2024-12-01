const express = require('express');
const router = express.Router();
const cors = require('cors');
const controller = require('../controllers/languageController');
const auth = require('../middleware/auth');

router.use(cors());
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const languages = await controller.getLanguages();
        res.json(languages);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


module.exports = router;
