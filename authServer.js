// This is a standalone microservice.
// It knows nothing about the gateway or other servers.
// It simply listens on its own port and responds to requests.

import express from "express";

const app = express();
const PORT = 5001;


// A simple login endpoint that returns a JSON response.
// In a real app, this would verify credentials — here we just prove the server works.
app.get("/login", (req, res) => {
  res.json({
    service: "Auth Server",
    message: "This response is from Auth Server",
  });
});


app.listen(PORT, () => {
  console.log(`Auth Server is running on http://localhost:${PORT}`);
});
