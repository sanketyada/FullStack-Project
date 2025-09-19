import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";

const TruckMap = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const trucksRef = useRef([]);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapRef.current) return;

    // 1️⃣ Initialize map
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [72.8545, 19.2044],
      zoom: 13,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // 2️⃣ Setup initial trucks
    trucksRef.current = [
      { id: 1, lng: 72.8545, lat: 19.2044 },
      { id: 2, lng: 72.8600, lat: 19.2000 },
      { id: 3, lng: 72.8500, lat: 19.2100 },
      { id: 4, lng: 72.8570, lat: 19.2060 },
    ];

    // 3️⃣ Create markers for each truck
    markersRef.current = trucksRef.current.map((truck) => {
      const el = document.createElement("div");
      el.innerHTML = "🚚";
      el.style.fontSize = "28px";
      el.style.cursor = "pointer";

      return new mapboxgl.Marker(el)
        .setLngLat([truck.lng, truck.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<b>Truck ${truck.id}</b>`))
        .addTo(mapRef.current);
    });

    // 4️⃣ Movement function with smooth animation
    const moveTrucks = () => {
      trucksRef.current.forEach((truck, index) => {
        const oldLng = truck.lng;
        const oldLat = truck.lat;

        // Generate new position nearby
        const newLng = truck.lng + (Math.random() - 0.5) * 0.002;
        const newLat = truck.lat + (Math.random() - 0.5) * 0.002;

        // Animate step-by-step for smooth movement
        let step = 0;
        const steps = 30; // higher = smoother
        const animate = () => {
          step++;
          const currentLng = oldLng + (newLng - oldLng) * (step / steps);
          const currentLat = oldLat + (newLat - oldLat) * (step / steps);

          markersRef.current[index].setLngLat([currentLng, currentLat]);

          if (step < steps) requestAnimationFrame(animate);
        };

        animate();

        // Update truck position
        truck.lng = newLng;
        truck.lat = newLat;
      });
    };

    // Move trucks every 3 seconds
    const interval = setInterval(moveTrucks, 3000);

    return () => clearInterval(interval);
  }, []);

  return <div ref={mapContainerRef} className="w-full h-screen" />;
};

export default TruckMap;
