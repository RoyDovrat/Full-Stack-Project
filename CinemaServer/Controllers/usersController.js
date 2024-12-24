const express = require('express');
const usersService = require('../Services/usersService');
const verifyToken = require('../Middlewares/authMiddleware');

const router = express.Router();

// Entry point: http://localhost:3000/users

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//create account
router.post('/createAccount', async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: 'Please provide both userName and password.' });
    }

    const user = await usersService.getUserByUserName(userName);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    await usersService.updateUser(user._id, { password });
    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    const obj = req.body;
    const result = await usersService.addUser(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    console.log('in controller')
    const { id } = req.params;
    const obj = req.body;
    const result = await usersService.updateUser(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usersService.deleteUser(id);
    res.json(result);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;