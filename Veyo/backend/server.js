// server.js
const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Socket.IO
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "*" } // allow dev cross-origin
});

const PORT = 4000;

// initial mock buses
let buses = [
  { id: "BUS-101", routeId: "R1", routeName: "Central - Market", lat: 28.635, lon: 77.21, speed: 30, updatedAt: new Date().toISOString() },
  { id: "BUS-102", routeId: "R2", routeName: "Station - University", lat: 28.62, lon: 77.25, speed: 25, updatedAt: new Date().toISOString() },
  { id: "BUS-103", routeId: "R3", routeName: "East Park Loop", lat: 28.61, lon: 77.20, speed: 20, updatedAt: new Date().toISOString() }
];

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// move buses a little every 5s — broadcast to connected clients
setInterval(() => {
  const stopLat = 28.63;
  const stopLon = 77.22;
  buses = buses.map((b) => {
    const dLat = (Math.random() - 0.5) * 0.002;
    const dLon = (Math.random() - 0.5) * 0.002;
    const newLat = b.lat + dLat;
    const newLon = b.lon + dLon;
    const speed = Math.max(8, b.speed + (Math.random() - 0.5) * 6);
    const distKm = haversine(newLat, newLon, stopLat, stopLon);
    const etaMinutes = Math.max(1, Math.round((distKm / (speed / 60))));
    return {
      ...b,
      lat: newLat,
      lon: newLon,
      speed: Math.round(speed),
      etaMinutes,
      updatedAt: new Date().toISOString()
    };
  });

  // broadcast full list (simple)
  io.emit("buses", { serverTime: new Date().toISOString(), buses });
}, 5000);

// HTTP GET for older clients or initial fetch
app.get("/api/buses", (req, res) => {
  const since = req.query.since ? new Date(req.query.since) : null;
  let result = buses;
  if (since) result = buses.filter((b) => new Date(b.updatedAt) > since);
  res.json({ serverTime: new Date().toISOString(), buses: result });
});

// Telemetry endpoint (devices can POST here)
app.post("/api/telemetry", (req, res) => {
  const { id, lat, lon, speed } = req.body;
  if (!id || typeof lat !== "number" || typeof lon !== "number") return res.status(400).json({ error: "id, lat(number), lon(number) required" });

  let bus = buses.find((b) => b.id === id);
  if (bus) {
    bus.lat = lat;
    bus.lon = lon;
    if (speed) bus.speed = speed;
    bus.updatedAt = new Date().toISOString();
  } else {
    const newBus = {
      id,
      routeId: "R-new",
      routeName: "New Route",
      lat,
      lon,
      speed: speed || 20,
      updatedAt: new Date().toISOString()
    };
    buses.push(newBus);
  }

  // broadcast to all clients immediately
  io.emit("buses", { serverTime: new Date().toISOString(), buses });

  res.json({ ok: true });
});

// socket.io connection log (optional)
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  // send current buses immediately on connect
  socket.emit("buses", { serverTime: new Date().toISOString(), buses });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// start server
server.listen(PORT, () => console.log(`Mock backend + socket.io running http://localhost:${PORT}`));
