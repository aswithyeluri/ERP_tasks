const express = require('express');
const User = require("../../models/User");
const FormModel = require("../../models/FormModel");
const { json } = require('body-parser');

const router = express.Router();

// Route to get user form values
router.get('/getuser', async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const useremail = user.email;
        const regform = await FormModel.findOne({ email: useremail });
        res.json(regform);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;