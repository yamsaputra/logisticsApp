// Importing external libraries.
import express from "express";
import { Op } from "sequelize";
import { User, Ride, Book } from "../sequelize.js";

// Declaring export statements.
export let getUser = express.Router();
export let getRoute = express.Router();
export let getRoutes = express.Router();
export let getUserRoutes = express.Router();

/**
 * @URI /getUser
 * @description Fetches a user by email in the database.
 * @method GET
 * @param {String} email 
 * @returns {Object} returns 200 user found or 404 user not found.
 */
getUser = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        return res.status(200).json({ message: 'User found.', user });
    } catch (error) {
        console.error("Error fetching user", error);
        return res.status(500).json({ error: "Error fetching user." });
    }
}

/**
 * @URI /getRoute
 * @description Fetches a route by origin or destination in the database.
 * @method GET
 * @param {String} query
 * @returns {Object} returns 200 route found or 404 route not found.
 */
getRoute = async (req, res) => {
    try {
        const { query } = req.query;
        const route = await Ride.findOne({
            where: {
                [Op.or]: [
                    { origin: { [Op.like]: `%${query}%` } },
                    { destination: { [Op.like]: `%${query}%` } }
                ]
            }
        });

        if (!route) {
            return res.status(404).json({ error: "Failed to fetch route from the database." });
        }

        return res.status(200).json({ message: 'Route successfully fetched from the database.', route }), route;
    } catch (error) {
        console.error("getRoute() failed fetching route", error.message);
        return res.status(500).json({ error: "getRoute() Error fetching route." });
    }
};

/**
 * @URI /getRoutes
 * @description Fetches routes by origin or destination in the database.
 * @method GET
 * @param {String} query
 * @returns {Object} returns 200 routes found or 404 routes not found.
 */
getRoutes = async (req, res) => {
    try {
        const { query } = req.query;
        const routes = await Ride.findAll({
            where: {
                [Op.or]: [
                    { origin: { [Op.like]: `%${query}%` } },
                    { destination: { [Op.like]: `%${query}%` } }
                ]
            },
            attributes: ['ride_id', 'origin', 'destination', 'date', 'time', 'price', 'description', 'email']
        });

        if (!routes || routes.length === 0) {
            return res.status(404).json({ error: "Routes not found." });
        }

        return res.status(200).json({ message: 'Routes found.', routes }), routes;
    } catch (error) {
        console.error("Error fetching routes", error);
        return res.status(500).json({ error: "Error fetching routes." });
    }
};

/**
 * @URI /getUserRoutes
 * @description Fetches routes by userID in the database.
 * @method GET
 * @param {String} userID
 * @returns {Object} returns 200 user routes found or 404 user routes not found.
 */
getUserRoutes = async (req, res) => {
    try {
        const { userID } = req.query;

        const userRoutes = await Book.findAll({
            where: { user_id: userID },
            include: { model: Ride }
        });

        if (!userRoutes || userRoutes.length === 0) {
            return res.status(404).json({ error: "User routes not found." });
        }

        res.status(200).json({ message: 'User routes found.', userRoutes });
    } catch (error) {
        console.error("Error fetching user routes", error);
        return res.status(500).json({ error: "Error fetching user routes." });
    }
};