import express from "express";
import { User } from "./sequelize1.js";

export let getUser = express.Router();

getUser = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        return res.status(200).json({ message: 'User found.', user }), user;
    } catch (error) {
        console.error("Error fetching user", error);
        return res.status(500).json({ error: "Error fetching user." });
    }
};