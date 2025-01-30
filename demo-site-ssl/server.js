const fs = require("fs");
const https = require("https");
const express = require("express");

const app = express();

// Load SSL certificates
const options = {
  key: fs.readFileSync("server-key.pem"),
  cert: fs.readFileSync("server-cert.pem"),
  ca: fs.readFileSync("ca-cert.pem"),
  requestCert: true, // Require client certificate
  rejectUnauthorized: true, // Reject unauthenticated clients
};

// Middleware to check client certificate
app.use((req, res, next) => {
  if (!req.client.authorized) {
    return res.status(401).send("Client certificate required");
  }
  next();
});

// Main route
app.get("/", (req, res) => {
  res.send(`<h1>Secure Web App</h1><p>Welcome, ${req.socket.getPeerCertificate().subject.CN}!</p>`);
});

// Start HTTPS server
https.createServer(options, app).listen(3000, () => {
  console.log("Server running on https://localhost:3000");
});
