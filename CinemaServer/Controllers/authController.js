
const express = require('express');
const jwt = require('jsonwebtoken');
const userService = require('../Services/usersService');
const router = express.Router();
const SECRET_KEY = 'some_key';

// Entry Point: http://localhost:3000/auth

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    try {

        const allUsers = await userService.getAllUsers();

        const user = allUsers.find((user) => user.userName.toLowerCase() === userName.toLowerCase());

        //check validation
        if (!user) return res.status(401).json({ message: "User not found" });
        if (password != user.password) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({
             userId: user._id 
        },
            SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;