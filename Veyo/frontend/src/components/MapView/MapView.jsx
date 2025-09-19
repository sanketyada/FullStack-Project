// MapView.jsx
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { io } from "socket.io-client";

// Put your Mapbox public token here (keep the same token you used earlier)
mapboxgl.accessToken =
  "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";

// Haversine distance (km)
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function MapView() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new Map()); // stores mapbox Marker objects by id (and "user")
  const socketRef = useRef(null);
  const socketConnectedRef = useRef(false);

  const [buses, setBuses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [center, setCenter] = useState({ lng: 77.21, lat: 28.63 }); // default center
  const [userLocation, setUserLocation] = useState(null);

  const POLL_MS = 5000;

  // ----------------------
  // 1) Initialize map once
  // ----------------------
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [center.lng, center.lat],
      zoom: 12,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // keep center state updated when user moves the map
    mapRef.current.on("move", () => {
      const c = mapRef.current.getCenter();
      setCenter({ lng: c.lng, lat: c.lat });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null; // 🔑 reset ref
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------
  // 2) Socket.IO (real-time)
  // ----------------------
  useEffect(() => {
    // connect to socket.io backend
    const socket = io("http://localhost:4000", {
      transports: ["websocket", "polling"],
      // you can add auth / path here if needed
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("socket connected:", socket.id);
      socketConnectedRef.current = true;
    });

    socket.on("disconnect", (reason) => {
      console.log("socket disconnected:", reason);
      socketConnectedRef.current = false;
    });

    // receive live bus updates (server emits 'buses' with { serverTime, buses })
    socket.on("buses", (payload) => {
      if (payload && Array.isArray(payload.buses)) {
        setBuses(payload.buses);
      }
    });

    // cleanup
    return () => {
      if (socket && socket.connected) socket.disconnect();
    };
  }, []);

  // ----------------------
  // 3) Polling fallback (only used when socket not connected)
  // ----------------------
  useEffect(() => {
    let mounted = true;

    const fetchBuses = async () => {
      // if socket is connected, do not poll (socket handles updates)
      if (socketConnectedRef.current) return;
      try {
        const res = await axios.get("http://localhost:4000/api/buses", {
          timeout: 5000,
        });
        if (!mounted) return;
        setBuses(res.data.buses || []);
      } catch (err) {
        console.error("Polling fetch error:", err.message || err);
      }
    };

    // initial fetch + interval
    fetchBuses();
    const id = setInterval(fetchBuses, POLL_MS);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  // ----------------------
  // 4) Watch user location (continuous updates)
  // ----------------------
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported by browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({ lat, lng });
      },
      (err) => {
        console.warn("Geolocation watch error:", err.message || err);
      },
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  // optional: when user first appears, fly to their location
  useEffect(() => {
    // console.log(userLocation);
    if (!userLocation || !mapRef.current) return;
    // only fly for first fix (if you want repeated fly, remove this condition)
    if (!markersRef.current.has("user")) {
      mapRef.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 14,
      });
    }
  }, [userLocation]);

  // ----------------------
  // 5) Sync markers for buses + user
  // ----------------------
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // Keep track of existing marker ids (excluding "user")
    const oldIds = new Set(
      Array.from(markersRef.current.keys()).filter((k) => k !== "user")
    );
    const newIds = new Set();

    // Create/update bus markers
    buses.forEach((bus) => {
      newIds.add(bus.id);
      const lngLat = [bus.lon, bus.lat];

      if (markersRef.current.has(bus.id)) {
        // update position and popup
        const marker = markersRef.current.get(bus.id);
        marker.setLngLat(lngLat);
        const popup = marker.getPopup();
        if (popup) {
          popup.setHTML(
            `<strong>${bus.routeName || bus.routeId}</strong>
             <div>ID: ${bus.id}</div>
             <div>ETA: ${
               bus.etaMinutes != null ? bus.etaMinutes + " min" : "—"
             }</div>
             <div>Speed: ${bus.speed || "—"} km/h</div>`
          );
        }
      } else {
        // create new marker element
        const el = document.createElement("div");
        el.className = "bus-marker";
        el.style.width = "36px";
        el.style.height = "36px";
        el.style.backgroundImage =
          "url('https://cdn-icons-png.flaticon.com/512/61/61231.png')";
        el.style.backgroundSize = "contain";
        el.style.cursor = "pointer";
        el.title = bus.id;
        el.addEventListener("click", () => setSelectedId(bus.id));

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${bus.routeName || bus.routeId}</strong>
           <div>ID: ${bus.id}</div>
           <div>ETA: ${
             bus.etaMinutes != null ? bus.etaMinutes + " min" : "—"
           }</div>
           <div>Speed: ${bus.speed || "—"} km/h</div>`
        );

        const marker = new mapboxgl.Marker(el)
          .setLngLat(lngLat)
          .setPopup(popup)
          .addTo(map);
        markersRef.current.set(bus.id, marker);
      }
    });

    // Remove markers no longer present
    oldIds.forEach((id) => {
      if (!newIds.has(id)) {
        const m = markersRef.current.get(id);
        if (m) m.remove();
        markersRef.current.delete(id);
      }
    });

    // Create or update the user marker (blue dot)
    if (userLocation) {
      if (markersRef.current.has("user")) {
        // update
        const userMarker = markersRef.current.get("user");
        userMarker.setLngLat([userLocation.lng, userLocation.lat]);
      } else {
        // create blue circular marker
        const el = document.createElement("div");
        el.style.width = "16px";
        el.style.height = "16px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = "#1976d2"; // blue
        el.style.border = "3px solid white";
        el.style.boxShadow = "0 0 4px rgba(0,0,0,0.3)";

        const userMarker = new mapboxgl.Marker(el)
          .setLngLat([userLocation.lng, userLocation.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 10 }).setHTML(
              "<strong>You are here</strong>"
            )
          )
          .addTo(map);

        markersRef.current.set("user", userMarker);
      }
    }

    // If a bus was selected, fly to it and open popup
    if (selectedId && markersRef.current.has(selectedId)) {
      const m = markersRef.current.get(selectedId);
      map.flyTo({ center: m.getLngLat(), zoom: 14, speed: 0.8 });
      const p = m.getPopup();
      if (p) p.addTo(map);
    }
  }, [buses, userLocation, selectedId]);

  // --------------
  // 6) Sidebar list (sorted by distance)
  // --------------
  const sorted = buses
    .map((b) => {
      const d = haversineDistance(center.lat, center.lng, b.lat, b.lon);
      return { ...b, distKm: d };
    })
    .sort((a, b) => a.distKm - b.distKm);

  // -------------
  // 7) Use-my-location button handler (optional)
  // -------------
  const handleUseMyLocation = () => {
    console.log(navigator.geolocation)
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({ lat, lng });
        if (mapRef.current)
          mapRef.current.flyTo({ center: [lng, lat], zoom: 14 });
      },
      (err) => alert("Could not get location: " + err.message),
      { enableHighAccuracy: true }
    );
  };

  // --------------------
  // Render: map + sidebar
  // --------------------
  return (
    <div className="min-h-screen p-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gray-100 rounded shadow">
          <div ref={mapContainer} style={{ width: "100%", height: "80vh" }} />
          <div className="p-2 text-xs text-gray-600">
            Center: {center.lat.toFixed(4)}, {center.lng.toFixed(4)} • Buses:{" "}
            {buses.length}
            {userLocation
              ? ` • You: ${userLocation.lat.toFixed(
                  4
                )}, ${userLocation.lng.toFixed(4)}`
              : ""}
          </div>
        </div>

        <aside className="md:col-span-1 bg-white rounded shadow p-3 h-[80vh] overflow-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Nearby buses</h2>
            <button
              className="text-sm px-2 py-1 border rounded"
              onClick={handleUseMyLocation}
            >
              Use my location
            </button>
          </div>

          {sorted.length === 0 ? (
            <div>No buses</div>
          ) : (
            sorted.map((bus) => (
              <div
                key={bus.id}
                className={`p-2 mb-2 border rounded ${
                  selectedId === bus.id
                    ? "border-blue-500 bg-blue-50"
                    : "bg-white"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedId(bus.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">
                      {bus.routeName || bus.routeId}
                    </div>
                    <div className="text-xs text-gray-500">ID: {bus.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      {bus.etaMinutes != null ? `${bus.etaMinutes} min` : "—"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {bus.distKm.toFixed(2)} km
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </aside>
      </div>
    </div>
  );
}
