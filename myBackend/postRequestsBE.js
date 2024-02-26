import express from "express";
import bcrypt from "bcrypt";
import { register, User, registerRouteDB } from "./sequelize.js";

export let loginUser = express.Router();
export let registerUser = express.Router();
export let registerRouteBE = express.Router();

registerUser = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("lolyeyuh", existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    // Hashes the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const success = await register(firstName, lastName, age, email, hashedPassword);

    if (success) {
    return res.status(201).json({ success: true, message: "User created." });
    }
  } catch (error) {
    console.error("Error creating user", error);
    return res
      .status(500)
      .json({ success: false, error: "Error creating user" });
  }
};

loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password." });
    }
    if (isPasswordValid && user) {
      console.log("User logged in", user);
      // code for storing user in session goes here
    return res.status(200).json({ message: "Login successful.", user });
  }
  } catch (error) {
    console.error("Error logging in user", error);
    return res.status(500).json({ error: "Error logging in user." });
  }
};

registerRouteBE = async (req, res) => {
  try {
    console.log("bringDataBodyBE:", req.body);
    const bringDataBE = req.body;

    const bringDataDB = {
      origin: bringDataBE.origin,
      destination: bringDataBE.destination,
      date: new Date(bringDataBE.date),
      time: bringDataBE.time,
      price: parseFloat(bringDataBE.price),
      description: bringDataBE.description,
    }

    /* const { origin , destination, date, time, price, description } = bringDataBE; */
  

    const stored = await registerRouteDB(bringDataBE);

    if (stored) {
      return res.status(201).json({ success: true, message: "Stuff registered." });
    }
  } catch (error) {
    console.error("Error registering route", error);
    return res.status(500).json({ success: false, error: "Error registering stuff." });
  }
};
