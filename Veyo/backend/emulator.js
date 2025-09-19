// emulator.js
const axios = require("axios");

const SERVER = "http://localhost:4000";
const BUS_IDS = ["BUS-101", "BUS-102", "BUS-103"];
const BASE = { lat: 28.63, lon: 77.21 };

function randomOffset() {
  return (Math.random() - 0.5) * 0.01; // small moves
}

setInterval(async () => {
  for (const id of BUS_IDS) {
    const lat = BASE.lat + randomOffset();
    const lon = BASE.lon + randomOffset();
    const speed = Math.round(10 + Math.random() * 30);
    try {
      await axios.post(`${SERVER}/api/telemetry`, { id, lat, lon, speed }, { timeout: 3000 });
      // console.log(`sent ${id}`, lat, lon);
    } catch (err) {
      console.error("emulator error:", err.message || err);
    }
  }
}, 2000);
