const express = require('express');
const membersService = require('../Services/membersDBservice');

const router = express.Router();

// Entry point: http://localhost:3000/members

router.get('/', async (req, res) => {
  try {
    const filters = req.query;
    const members = await membersService.getAllMembers(filters);
    res.json(members);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const member = await membersService.getMemberById(id);
    res.json(member);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const obj = req.body;
    const result = await membersService.addMember(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await membersService.updateMember(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await membersService.deleteMember(id);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;