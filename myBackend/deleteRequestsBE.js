import express from "express";
import { Ride, Book } from "./sequelize.js";

export let deleteRouteBE = express.Router();

deleteRouteBE = async (req, res) => {
  try {
    const { routeID } = req.query;
    const route = await Ride.findOne({ where: { ride_id: routeID } });


    if (!route) {
      return res.status(404).json({ error: "Route not found." });
    }

    const deletedRoute = await Ride.destroy({ where: { ride_id: routeID } });

    if (deletedRoute) {
      return res.status(200).json({ message: "Route deleted.", route });
    }
  } catch (error) {
    console.error("Error deleting route", error);
    return res.status(500).json({ error: "Error deleting route." });
  }
};