// This is a standalone microservice.
// It knows nothing about the gateway or other servers.
// It simply listens on its own port and responds to requests.

import express from "express";

const app = express();
const PORT = 5002;

// A simple users endpoint that returns a JSON response.
// In a real app, this would fetch users from a database.
app.get("/users", (req, res) => {
  res.json({
    service: "User Server",
    message: "This response is from User Server",
  });
});


app.listen(PORT, () => {
  console.log(`User Server is running on http://localhost:${PORT}`);
});
