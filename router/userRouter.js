const express = require('express');
const router = express.Router();
const cors = require('cors');
const controller = require('../controllers/userController');

router.use(cors());
router.use(express.json());
/* 
* Here are all the routes that are linked to user
*/
router.get('/ranks', async (req, res) => {
    try {
        const users = await controller.getUsers();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})
router.get('/', async (req, res) => {
    try {
        const users = await controller.getUsersAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})
router.get('/:id', async (req, res) => {
    try {
        const user = await controller.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.patch('/score/:user_id', async (req, res) => {
    const { score } = req.body;

    try {
        const updatedScore =  await controller.updateScore(req.params.user_id, score)
        res.json("Score updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.patch('/:user_id', async (req, res) => {
    const {last_name, first_name, photo, age} =  req.body

    try {
        const updatedUser =  await controller.updateProfile(req.params.user_id, last_name, first_name, photo, age)
        res.json("Profile Updated Successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})
module.exports = router;
