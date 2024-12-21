// Importing external libraries.
import express from "express";
import { Ride, Book } from "../sequelize.js";

// Declaring export statements.
export let deleteRouteBE = express.Router();

/**
 * @URI /deleteRoute
 * @description Deletes a route from the database.
 * @method DELETE
 * @param {Number} routeID receives route from deleteRequest() frontend.
 * @returns {Object} returns 204 deleted to deleteRequest() frontend.
 */
deleteRouteBE = async (req, res) => {
  try {
    const { routeID } = req.query;
    const route = await Ride.findOne({ where: { ride_id: routeID } });


    if (!route) {
      return res.status(404).json({ error: "deleteRouteBE() did not find Route." });
    }

    const deletedRoute = await Ride.destroy({ where: { ride_id: routeID } });

    if (deletedRoute) {
      return res.status(200).json({ message: "deleteRouteBE() successfully deleted route.", route });
    }
  } catch (error) {
    console.error("deleteRouteBE() failed to delete Route 500.", error);
    return res.status(500).json({ error: "Failed to delete Route." });
  }
};