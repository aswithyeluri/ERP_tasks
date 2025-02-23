const express = require("express");
const irFormModel = require("../../models/irFormModel");
const Student = require("../../models/irFormModel");
const User = require("../../models/User");

const router = express.Router();

// Route to add data to MongoDB
router.post("/addirform", async (req, res) => {
    try {
        const formData = new irFormModel(req.body);
        console.log(formData);
        await formData.save();
        res.status(201).json({
            message: "Data saved successfully!",
            data: formData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error saving data",
            error: error.message,
        });
    }
});

router.get("/addirform/", async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const useremail = user.email;
        const student = await Student.findOne({ email: useremail });
        console.log(student);
        res.json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
