import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import mapboxgl from "mapbox-gl";

import Navbar from "./components/navbar";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2Fnb3I2MCIsImEiOiJjbG9pNTdpMTAxbWFtMmpvMnE2dGo3djZjIn0.z9uW5JHfe94loTqZDVQtGw";

export default function Home() {
  const theme = useTheme();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
    });
  });
  return (
    <>
      <Navbar />

      <div>
        <div style={{ height: "100vh" }} ref={mapContainer} />
      </div>
    </>
  );
}
