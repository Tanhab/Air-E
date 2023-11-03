import React, { useRef, useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import mapboxgl from "mapbox-gl";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import Modal from "@mui/material/Modal";

import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Skeleton,
} from "@mui/material";

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
  const [showSidebar, setShowSidebar] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const dummyData = [
    { rank: 1, city: "City 1", aqi: 20 },
    { rank: 2, city: "City 2", aqi: 30 },
    { rank: 2, city: "City 2", aqi: 30 },
    { rank: 2, city: "City 2", aqi: 30 },
    { rank: 2, city: "City 2", aqi: 30 },
    { rank: 2, city: "City 2", aqi: 30 },
    { rank: 2, city: "City 2", aqi: 30 },
    { rank: 2, city: "City 2", aqi: 30 },
    { rank: 2, city: "City 2", aqi: 30 },
    { rank: 2, city: "City 2", aqi: 30 },
    // Add more dummy data for 10 rows
  ];
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
        const { lng, lat } = e.lngLat;

        // Create a new marker object
        const newMarker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map.current);

        // Store the marker data in the state
        setMarkers((prevMarkers) => [...prevMarkers, { lat, lng }]);

        // Open the modal
        openModal(lat, lng);
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

  const toggleSidebar = (event) => {
    if (event.target.id === "close_button" || event.target.id === "img")
      setShowSidebar(!showSidebar);
  };

  const handleSidebarClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        {!showSidebar ? (
          <img
            src="/trophy.png"
            height={50}
            width={50}
            alt=""
            style={{ zIndex: 101 }}
            className={styles.searchBar}
            onClick={toggleSidebar}
            id="img"
          />
        ) : null}
        {showSidebar && (
          <div className={styles.sidebarOpen} onClick={handleSidebarClick}>
            <Button
              sx={{ color: "black", fontWeight:700 }}
              className={styles.closeButton}
              onClick={toggleSidebar}
              id="close_button"
            >
              Close
            </Button>
            <br></br>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "white",
                marginLeft: 6,
                mb: 2,
              }}
            >
              Top 10 Cleanest Cities
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ padding: 0, margin: 0 }}>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Rank</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>City</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>AQI</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyData.map((row) => (
                    <TableRow key={row.rank}>
                      <TableCell align="center">
                        {row.rank === 1 ? (
                          <span>
                            <img src="/trophy.png" height={30} width={30} />
                          </span>
                        ) : (
                          row.rank
                        )}
                      </TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.aqi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "white",
                marginLeft: 6,
                mb: 2,
              }}
            >
              Top 10 Polluted Cities
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ padding: 0, margin: 0 }}>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>Rank</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>City</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>AQI</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyData.map((row) => (
                    <TableRow key={row.rank} style={{ marginBottom: 10 }}>
                      <TableCell align="center">
                        {row.rank === 1 ? (
                          <span>
                            <img src="/trophy.png" height={30} width={30} />
                          </span>
                        ) : (
                          row.rank
                        )}
                      </TableCell>
                      <TableCell>{row.city}</TableCell>
                      <TableCell>{row.aqi}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        <div
          className={styles.mapcontainer}
          ref={mapContainer}
          onClick={toggleSidebar}
        >
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
        {markers.map((marker, index) => (
          <div
            key={index}
            className={styles.mapMarker}
            style={{ left: "50%", top: "50%" }}
          >
            {/* <img src="/flag.png" height={30} width={30} alt="" /> */}
          </div>
        ))}
        ;
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0)", // Set a transparent background
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "30%",
            right: "15%",
            transform: "translate(50%, 50%)",
            width: 400,
            bgcolor: "#C1E1C1",
            boxShadow: 24,
            p: 4,
          }}
        >
          {clickedLatLng && (
            <>
              {!loading ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                        {clickedLatLng.lat}
                      </Typography>
                    </Grid>
                    {/* Left Column */}
                    <Grid item xs={6}>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Latitude:</span>{" "}
                        {clickedLatLng.lat}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Longitude:</span>{" "}
                        {clickedLatLng.lng}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>AQI:</span>{" "}
                        {clickedLatLng.lng}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          PM2.5 levels:
                        </span>{" "}
                        {clickedLatLng.lng}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>PM10 levels:</span>{" "}
                        {clickedLatLng.lng}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          Ozone Levels:
                        </span>{" "}
                        {clickedLatLng.lng}
                      </Typography>
                    </Grid>
                    {/* Right Column (Empty) */}
                    <Grid item xs={6}>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Total GDP:</span>{" "}
                        {clickedLatLng.lng}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          GDP Per capita:
                        </span>{" "}
                        {clickedLatLng.lng}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>GDP Growth:</span>{" "}
                        {clickedLatLng.lng}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          Total Population:
                        </span>{" "}
                        {clickedLatLng.lng}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          Population Growth:
                        </span>{" "}
                        {clickedLatLng.lng}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Skeleton variant="rectangular" width={340} height={400} />
              )}
            </>
          )}
          <Button
            onClick={closeModal}
            sx={{ mt: 2, color: "green", fontWeight: 700 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
