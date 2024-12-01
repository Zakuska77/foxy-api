const express = require('express');
const router = express.Router();
const cors = require('cors');
const controller = require('../controllers/factsController');
const auth = require('../middleware/auth');

router.use(cors());
router.use(express.json());
/* 
* Here are all the routes that are linked to user
*/
router.get('/', async (req, res) => {
    const language = req.query.language;

    try {
        const facts = await controller.getFacts(language);

        // Check if facts array is empty
        if (!facts || facts.length === 0) {
            return res.status(404).send('No facts found for the specified language'); 
        }

        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        res.json(randomFact);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// router.get('/:id', async (req, res) => {
//     try {
//         const user = await controller.getFactbyID(req.params.id);
//         res.json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

module.exports = router;
