// import React, { useEffect, useRef } from "react";
// import tt from "@tomtom-international/web-sdk-maps";
// import "@tomtom-international/web-sdk-maps/dist/maps.css";

// const API_KEY = "AhGRrIPHgLk6zamLdTocnYkCLFl9AstK";

// export default function SmallMap({ onLocationSelect }) {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (!mapContainer.current) return;

//     // Initialize map
//     mapRef.current = tt.map({
//       key: API_KEY,
//       container: mapContainer.current,
//       center: [72.8415, 19.2062], // Default coordinates
//       zoom: 13,
//       style: "tomtom://vector/1/basic-main",
//     });

//     // Click to select location
//     mapRef.current.on("click", (e) => {
//       const { lngLat } = e;
//       if (onLocationSelect) {
//         onLocationSelect({ lat: lngLat.lat, lng: lngLat.lng });
//       }
//     });

//     return () => mapRef.current.remove();
//   }, [onLocationSelect]);

//   return <div ref={mapContainer} className="w-full h-64 rounded-2xl shadow-md border overflow-hidden" />;
// }
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const GEOCODING_KEY = "z3y4RL0XYbB38kNrZEtVE2w8VRyUQph5";
const API_KEY = "AhGRrIPHgLk6zamLdTocnYkCLFl9AstK";

// ✅ Dummy routes (we use A-300 as default fallback)
const dummyRoutes = {
  "A-300": [
    { name: "Kandivali Bus Station East", coords: [72.8415, 19.2062] },
    { name: "Kandivali Bus Station", coords: [72.8492, 19.2023] },
    { name: "ESIS Hospital", coords: [72.8521, 19.2001] },
    { name: "Grovel Company", coords: [72.855, 19.1985] },
    { name: "Bavadi School", coords: [72.8572, 19.1963] },
    { name: "Pushpa Park", coords: [72.8601, 19.1951] },
    { name: "Goregaon Bus Stop", coords: [72.863, 19.1932] },
  ],
  "B-200": [
    { name: "Andheri Station", coords: [72.8443, 19.113] },
    { name: "Sahar Airport", coords: [72.8687, 19.0988] },
    { name: "Chakala", coords: [72.8679, 19.1105] },
    { name: "Marol", coords: [72.8712, 19.1136] },
  ],
};

export default function SmallMap() {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const intervalsRef = useRef([]);
  const { state } = useLocation();
  const query = state?.query?.toUpperCase() || "";

  useEffect(() => {
    // Initialize Map
    mapRef.current = tt.map({
      key: API_KEY,
      container: "map-container",
      center: [78.9629, 20.5937],
      zoom: 5,
      style: { map: "basic_main" },
    });

    // Start tracking based on query OR show default route
    if (query && dummyRoutes[query]) {
      startBusTracker(dummyRoutes[query]);
    } else {
      console.warn("No valid route provided. Showing default buses...");
      startBusTracker(dummyRoutes["A-300"]); // ✅ fallback route
    }

    return () => intervalsRef.current.forEach(clearInterval);
  }, []);

  async function searchLocation(q) {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(q)}.json?key=${GEOCODING_KEY}`
      );
      const data = await response.json();
      if (data.results?.length > 0) {
        const pos = data.results[0].position;
        mapRef.current.flyTo({ center: [pos.lon, pos.lat], zoom: 14 });
        addMarker(pos.lon, pos.lat);
      } else {
        alert("Location not found.");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  }

  function addMarker(lon, lat) {
    const el = document.createElement("div");
    el.innerHTML = "🚍";
    el.style.fontSize = "24px";
    el.style.transform = "translate(-50%, -50%)";
    el.style.cursor = "pointer";

    const marker = new tt.Marker({ element: el }).setLngLat([lon, lat]).addTo(mapRef.current);
    return marker;
  }

  function startBusTracker(route) {
    // Clear old markers and intervals
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];

    if (!route || route.length === 0) return;

    const busCount = Math.min(route.length, 4); // show up to 4 buses
    for (let i = 0; i < busCount; i++) {
      let index = i;
      const marker = addMarker(route[index].coords[0], route[index].coords[1]);
      markersRef.current.push(marker);

      const interval = setInterval(() => {
        index = (index + 1) % route.length;
        marker.setLngLat(route[index].coords);
      }, 4000 + i * 1000);
      intervalsRef.current.push(interval);
    }

    // Center on first route stop
    mapRef.current.flyTo({ center: route[0].coords, zoom: 14 });
  }

  return (
    <div className="w-full h-[50vh] p-4">
      <div className="w-full h-full rounded-2xl shadow-xl border border-gray-200 overflow-hidden bg-white">
        <div id="map-container" className="w-full h-full" />
      </div>
    </div>
  );
}
