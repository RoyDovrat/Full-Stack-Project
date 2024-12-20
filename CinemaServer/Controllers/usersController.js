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

router.post('/', verifyToken, async (req, res) => {
  try {
    const obj = req.body;
    const result = await usersService.addUser(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.patch('/:id', verifyToken, async (req, res) => {
  try {
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
    res.json(error);
  }
});

module.exports = router;