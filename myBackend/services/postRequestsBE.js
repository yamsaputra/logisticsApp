// Framework import statements.
import express from "express";
import bcrypt from "bcryptjs";
import { register, User, registerRouteDB, Book } from "../sequelize.js";

// Declaring export statements.
export const loginUser = express.Router();
export const registerUser = express.Router();
export const registerRouteBE = express.Router();
export const bookRouteBE = express.Router();

/**
 * @URI /register
 * @description Registers a new user in the database.
 * @method POST
 * @param {String} firstName, lastName, age, email, password
 * @returns {Object} 201 Created - user created
 * @throws {Error} 400 Bad Request - user already exists.
 */
registerUser.post('/', async (req, res) => {
  console.log("pRBE: Registering user with data:", req.body);

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
});

/**
 * @URI /login
 * @description Logs in a user registered in the database.
 * @method POST
 * @param {String} req.body.email
 * @param {String} req.body.password
 * @returns {Object} 200 OK login successful 
 * @throws  401 Unauthorized invalid password.
 */
loginUser.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password or e-mail." });
    }
    if (isPasswordValid && user) {
      console.log("pRBE: User logged in", user);
      // code for storing user in session goes here
      return res.status(200).json({ message: "Login successful.", user });
    }
  } catch (error) {
    console.error("pRBE: Error logging in user", error);
    return res.status(500).json({ error: "Error logging in user."
     });
  }
});

/**
 * @URI /registerRoute
 * @description Registers a new route in the database.
 * @method POST
 * @param {String} origin, destination, date, time, seats, price, user_id
 * @returns {Object} returns 201 route registered or 500 error registering route.
 */
registerRouteBE.post('/', async (req, res) => {
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
});

/**
 * @URI /bookRoute
 * @description Books a route in the database.
 * @method POST
 * @param {String} user_id, ride_id
 * @returns {Object} returns 201 route booked, 
 * @throws 400 route already booked 
 * @throws 500 error booking route.
 */
bookRouteBE.post('/', async (req, res) => {
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
});

