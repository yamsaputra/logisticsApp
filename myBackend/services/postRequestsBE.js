import express from "express";
import bcrypt from "bcryptjs";
import { register, User, registerRouteDB, Book } from "../sequelize.js";

export let loginUser = express.Router();
export let registerUser = express.Router();
export let registerRouteBE = express.Router();
export let bookRouteBE = express.Router();

registerUser = async (req, res) => {
  try {
    const { firstName, lastName, age, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("lolyeyuh", existingUser);
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    // Hashes the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const success = await register(
      firstName,
      lastName,
      age,
      email,
      hashedPassword
    );

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
      console.log("pRBE: User logged in", user);
      // code for storing user in session goes here
      return res.status(200).json({ message: "Login successful.", user });
    }
  } catch (error) {
    console.error("pRBE: Error logging in user", error);
    return res.status(500).json({ error: "Error logging in user." });
  }
};

registerRouteBE = async (req, res) => {
  try {
    console.log("bringDataBodyBE:", req.body);
    const { user_id, ...bringDataBE } = req.body;
    console.log("bringDataBE:", bringDataBE);
    console.log("userID:", user_id);

    const newRideID = await registerRouteDB(bringDataBE);

    console.log("newRide ID:", newRideID);

    Book.create({
        user_id: user_id,
        ride_id: newRideID,
        is_sender: true,
      });

      return res
        .status(201)
        .json({ success: true, message: "Route registered." });
  } catch (error) {
    console.error("Error registering route", error);
    return res
      .status(500)
      .json({ success: false, error: "Error registering route." });
  }
};

bookRouteBE = async (req, res) => {
  try {
    const { user_id, ride_id } = req.body;

    const existingBooking = await Book.findOne({ where: { user_id, ride_id } });
    if (existingBooking) {
      return res
        .status(400)
        .json({ success: false, message: "Route already booked." });
    }

    await Book.create({ user_id, ride_id, is_sender: false });

    return res.status(201).json({ success: true, message: "Route booked." });
  } catch (error) {
    console.error("Error booking route", error);
    return res.status(500).json({ success: false, error: "Error booking route." });
  }
};

