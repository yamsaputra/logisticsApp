// Framework import statements.
import express from "express";
import cors from "cors"; // Cross Origin Resource Sharing, to allow requests from other domains and allow the front and backend to be on the same domain.

// Service import statements.
import { getUser, getRoute, getRoutes, getUserRoutes } from "./services/getRequestsBE.js	";
import { registerUser, loginUser, registerRouteBE, bookRouteBE } from "./services/postRequestsBE.js";
import { deleteRouteBE } from "./services/deleteRequestsBE.js";

// Global variables for the Express server.
const app = express();
const PORT = 4000;

// Enabling CORS.
app.use(cors());

app.use(express.json());

// registerUser function hosting.
app.get('/user', getUser);

app.get('/route', getRoute);

app.get('/routes', getRoutes);

app.get('/userroutes', getUserRoutes);

app.post('/register', registerUser);

app.post("/login", loginUser);

app.post("/bring", registerRouteBE);

app.post("/book", bookRouteBE);

app.delete("/deleteroute", deleteRouteBE);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
