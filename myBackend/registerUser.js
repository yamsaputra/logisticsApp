import express from "express";
import bcrypt from "bcrypt";
import { register, User } from "./sequelize.js";

export const registerUser = express.Router();

export const loginUser = express.Router();

registerUser.post("/register", async (req, res) => {
    // Extract data from the request body
    try {
        const { firstName, lastName, age, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        // Hash the password

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await register(firstName, lastName, age, email, hashedPassword);

        res.status(201).json({ success: true, message: "User created successfully." });
    } catch (error) {
        console.error("Error creating user", error);
        res.status(500).json({ success: false, error: "Error creating user" });
    }
});

loginUser.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password." });
        }

        return res.status(200).json({ message: "Login successful.", user });
    } catch (error) {
        console.error("Error logging in user", error);
        return res.status(500).json({ error: "Error logging in user." });
    }
});
