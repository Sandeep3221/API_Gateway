// API Gateway — the single entry point for all clients
// In a microservices architecture, you have many small servers .
// A client shouldn't need to know the address of every server.
// Instead, the client talks to ONE gateway, and the gateway
// forwards the request to the correct backend server .

import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

// ====================================
// Routing Table
// =====================================
// the servers are started on ports 5001, 5002, and 5003
// This is the CORE of the gateway.
// It maps incoming URL paths to the backend server that handles them .

const routes = {
  "/login": "http://localhost:5001",
  "/users": "http://localhost:5002",
  "/products": "http://localhost:5003",
};

// The Gateway Handler

// This catches EVERY incoming request (any method, any path).
// Its ONLY job is to decide where to forward the request.
// It does NOT process any business logic.

app.use(async (req, res) => {
  // Step 1: Read the incoming request path (e.g., "/users")
  const path = req.path;

  // Step 2: Look up the correct backend server from the routing table
  const targetServer = routes[path];

  // Step 3: Log what came in — useful for debugging
  console.log(`\nIncoming Request:`);
  console.log(`${req.method} ${path}`);

  // Step 4: If no matching route exists, tell the client
  if (!targetServer) {
    console.log(`No route found for ${path}`);
    return res.status(404).json({ message: "Route not found" });
  }

  // Step 5: Build the full URL to forward to (e.g., "http://localhost:5002/users")
  const forwardUrl = `${targetServer}${path}`;
  console.log(`Forwarding request to: ${forwardUrl}`);

  try {
    // Step 6: Forward the request using axios
    // We pass along the same HTTP method and path.
    const response = await axios({
      method: req.method,
      url: forwardUrl,
    });
    // Step 7: Send the backend's response back to the client
    console.log(`Response received from ${response.data.service}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    // Step 8: If the backend server is down or something breaks,
    console.log(`Error forwarding to ${forwardUrl}: ${error.message}`);
    res.status(500).json({ message: "Service unavailable" });
  }
});

app.listen(PORT, () => {
  console.log(`\nAPI Gateway is running on http://localhost:${PORT}`);
  console.log(`\nRouting Table:`);
  console.log(`  /login    → http://localhost:5001`);
  console.log(`  /users    → http://localhost:5002`);
  console.log(`  /products → http://localhost:5003`);
  console.log(`\nWaiting for requests...\n`);
});
