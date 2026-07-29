// This is a standalone microservice.
// It knows nothing about the gateway or other servers.
// It simply listens on its own port and responds to requests.

import express from "express";

const app = express();
const PORT = 5003;

// A simple products endpoint that returns a JSON response.
// In a real app, this would fetch products from a database.
app.get("/products", (req, res) => {
  res.json({
    service: "Product Server",
    message: "This response is from Product Server",
  });
});


app.listen(PORT, () => {
  console.log(`Product Server is running on http://localhost:${PORT}`);
});
