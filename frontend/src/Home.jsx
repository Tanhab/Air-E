import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import mapboxgl from "mapbox-gl";

import Navbar from "./components/navbar";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function Home() {
  const theme = useTheme();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [mapBounds, setMapBounds] = useState(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.on("moveend", () => {
        // When the map moves or zooms, update the map bounds
        const bounds = map.current.getBounds();
        console.log(bounds)
        setMapBounds(bounds);
      });
    }
  }, [lng, lat, zoom]);
  return (
    <>
      <Navbar />

      <div>
        <div style={{ height: "100vh" }} ref={mapContainer} />
        {mapBounds && (
          <div>
            <p>Map Bounds:</p>
            <p>Top Left (Latitude): {mapBounds.getNorth()}</p>
            <p>Top Left (Longitude): {mapBounds.getWest()}</p>
            <p>Bottom Right (Latitude): {mapBounds.getSouth()}</p>
            <p>Bottom Right (Longitude): {mapBounds.getEast()}</p>
          </div>
        )}
      </div>
    </>
  );
}
