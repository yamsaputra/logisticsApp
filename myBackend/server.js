// Framework import statements.
import express from "express";
import cors from "cors"; // Cross Origin Resource Sharing, to allow requests from other domains and allow the front and backend to be on the same domain.
import promClient from "prom-client"; // Prometheus client for Node.js.

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

// Prometheus variable for collecting data matrics.
const collectDefaultMetrics = promClient.collectDefaultMetrics;

// Enable collection of default metrics.
collectDefaultMetrics({ timeout: 5000 });

// Creating a registry to to register the metrics.
const register = new promClient.Registry();
collectDefaultMetrics({ register });

// Create custom metrics.
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in microseconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 15, 50, 100, 500],
  register,
});

register.registerMetric(httpRequestDurationMicroseconds);

// Middleware to measure the duration of the HTTP requests.
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route ? req.route.path : req.originalUrl, code: res.statusCode });
  });
  next();
});

// Expose metrics endpoint.
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

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

// Error handling middleware.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Backend Server, Internal Server Error 500: ' + err.stack);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
