import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import mapboxgl from "mapbox-gl";
import styles from "./styles/Home.module.css";
import Navbar from "./components/navbar";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button } from "@mui/material";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Home() {
  const theme = useTheme();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(2);
  const [mapBounds, setMapBounds] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isRankModalOpen, setIsRankModalOpen] = useState(false);
  const [listData, setListData] = useState([]);

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
        console.log(e.lngLat);
        openModal(e.lngLat.lat, e.lngLat.lng);
      });
    }
  }, [lng, lat, zoom]);

  const openModal = (lat, lng) => {
    setClickedLatLng({ lat, lng });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRankModal = () => {
    setIsRankModalOpen(true);
  };

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
        <img
          src="/trophy.png"
          height={50}
          width={50}
          alt=""
          className={styles.searchBar}
        />
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {clickedLatLng && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Clicked Coordinates
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Latitude: {clickedLatLng.lat}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Longitude: {clickedLatLng.lng}
              </Typography>
            </>
          )}
          <Button onClick={closeModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
