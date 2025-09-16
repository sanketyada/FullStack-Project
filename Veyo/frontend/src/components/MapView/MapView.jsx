import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapView = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [buses, setBuses] = useState([]);

  const mapToken =
    "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";

  // Example mock API function (replace with your backend)
  const fetchBusData = async () => {
    // For now: simulate buses around Delhi
    const data = [
      {
        id: "BUS-101",
        route: "Central–Market",
        coordinates: [77.209 + Math.random() * 0.05, 28.6139 + Math.random() * 0.05],
        eta: `${Math.floor(Math.random() * 15) + 1} min`,
      },
      {
        id: "BUS-102",
        route: "Station–University",
        coordinates: [77.25 + Math.random() * 0.05, 28.60 + Math.random() * 0.05],
        eta: `${Math.floor(Math.random() * 15) + 1} min`,
      },
    ];
    setBuses(data);
  };

  useEffect(() => {
    if (!mapToken) return;
    mapboxgl.accessToken = mapToken;

    // Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [77.209, 28.6139],
      zoom: 11,
    });

    return () => mapRef.current.remove();
  }, [mapToken]);

  useEffect(() => {
    if (!mapRef.current) return;

    fetchBusData();
    const interval = setInterval(fetchBusData, 8000); // poll every 8s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear old markers before adding new ones
    document.querySelectorAll(".bus-marker").forEach((el) => el.remove());

    buses.forEach((bus) => {
      const el = document.createElement("div");
      el.className = "bus-marker";
      el.style.width = "24px";
      el.style.height = "24px";
      el.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/61/61231.png')";
      el.style.backgroundSize = "cover";

      new mapboxgl.Marker(el)
        .setLngLat(bus.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${bus.route}</h3>
             <p>Bus ID: ${bus.id}</p>
             <p>ETA: ${bus.eta}</p>`
          )
        )
        .addTo(mapRef.current);
    });
  }, [buses]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100vh",
      }}
    />
  );
};

export default MapView;
