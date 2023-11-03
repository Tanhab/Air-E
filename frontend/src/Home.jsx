import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import mapboxgl from "mapbox-gl";
import styles from "./styles/Home.module.css";
import Navbar from "./components/navbar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Home() {
  const theme = useTheme();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(2);
  const [mapBounds, setMapBounds] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/sagor60/cloialudf003j01prgw21f3jd",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.on("moveend", () => {
        // When the map moves or zooms, update the map bounds
        const bounds = map.current.getBounds();
        console.log(bounds);
        setMapBounds(bounds);
      });

      map.current.on("click", (e) => {
        console.log("CLICKED");
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["country-fills"],
        });
        if (!features.length) return;
        const { properties } = features[0];
        const { property, description } = activeRef.current;
        alert(`(${properties.name}) ${properties[property]} ${description}`);
      });
    }
  }, [lng, lat, zoom]);


  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.mapcontainer} ref={mapContainer} />
        {/* {mapBounds && (
          <div>
            <p>Map Bounds:</p>
            <p>Top Left (Latitude): {mapBounds.getNorth()}</p>
            <p>Top Left (Longitude): {mapBounds.getWest()}</p>
            <p>Bottom Right (Latitude): {mapBounds.getSouth()}</p>
            <p>Bottom Right (Longitude): {mapBounds.getEast()}</p>
          </div>
        )} */}
      </div>
    </>
  );
}
