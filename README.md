# API Gateway — Learn the Core Routing Concept

## What is an API Gateway?

An **API Gateway** is a single entry point that sits between the client and your backend servers.

Instead of the client calling each server directly, it sends every request to the gateway. The gateway then decides **which backend server** should handle the request, forwards it, and returns the response.

```
Client  →  API Gateway  →  Auth Server
                         →  User Server
                         →  Product Server
```

The client never knows that multiple servers exist behind the scenes.

---

## Why Use an API Gateway?

| Problem without a gateway | How the gateway solves it |
|---|---|
| Client must know every server's address | Client talks to **one** address |
| Adding a new service means updating every client | Just add one line to the routing table |
| Internal architecture is exposed | Gateway hides backend details |
| Hard to add cross-cutting features (logging, etc.) | Gateway is a single place to add them |

---

## Folder Structure

```
API_Gateway/
├── package.json        ← Project config, scripts, dependencies
├── gateway.js          ← The API Gateway (port 3000)
├── authServer.js       ← Auth service (port 5001)
├── userServer.js       ← User service (port 5002)
├── productServer.js    ← Product service (port 5003)
└── README.md           ← You are here
```

That's it. Five files. No folders. No complexity.

---

## How Routing Works

Inside `gateway.js`, there is a **routing table**:

```js
const routes = {
  "/login":    "http://localhost:5001",
  "/users":    "http://localhost:5002",
  "/products": "http://localhost:5003",
};
```

When a request arrives at the gateway:

1. It reads the **path** (e.g., `/users`).
2. It looks up the path in the routing table.
3. It finds the matching server (`http://localhost:5002`).
4. It forwards the request using `axios`.
5. It sends the backend's response back to the client.

If the path doesn't exist in the table → **404 Route not found**.
If the backend server is down → **500 Service unavailable**.

---

## How to Run the Project

### Install dependencies

```bash
npm install
```

### Start everything with one command

```bash
npm run dev
```

This starts all four servers at once:
- Auth Server → `http://localhost:5001`
- User Server → `http://localhost:5002`
- Product Server → `http://localhost:5003`
- API Gateway → `http://localhost:3000`

### Or start servers individually

```bash
npm run auth       # Start Auth Server only
npm run user       # Start User Server only
npm run product    # Start Product Server only
npm run gateway    # Start API Gateway only
```

---

## Example Requests

Once all servers are running, open your browser or use a tool like **Postman** or **curl**.

> **Important:** All requests go through the gateway on port `3000`, NOT directly to the backend servers.

### 1. Login

```
GET http://localhost:3000/login
```

→ Gateway forwards to `http://localhost:5001/login`

Response:
```json
{
  "service": "Auth Server",
  "message": "This response is from Auth Server"
}
```

### 2. Get Users

```
GET http://localhost:3000/users
```

→ Gateway forwards to `http://localhost:5002/users`

Response:
```json
{
  "service": "User Server",
  "message": "This response is from User Server"
}
```

### 3. Get Products

```
GET http://localhost:3000/products
```

→ Gateway forwards to `http://localhost:5003/products`

Response:
```json
{
  "service": "Product Server",
  "message": "This response is from Product Server"
}
```

### 4. Unknown Route

```
GET http://localhost:3000/orders
```

→ No match in routing table

Response (404):
```json
{
  "message": "Route not found"
}
```

---

## Key Takeaway

The gateway is just a **traffic director**. It doesn't process business logic. It doesn't know what "users" or "products" mean. It only knows **where to send the request**.

This is the core idea behind every API Gateway — from simple Node.js code like this to production tools like Kong, AWS API Gateway, and Nginx.
