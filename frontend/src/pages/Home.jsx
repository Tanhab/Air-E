import React, { useRef, useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import mapboxgl from "mapbox-gl";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import Modal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
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
import cityAtom from "../atoms/cityAtom";
import {
  getDataByName,
  getDataByLngLat,
  getRankingData,
} from "../api/searchApi";
import HeatMapTest2 from "./heatmaptest2";
import { flytoAtom } from "../atoms/flytoAtom";
import { selectedPropertyAtom } from "../atoms/propertySelected";
import MapPopulation from "./MapTest";
import { mapClicAtom } from "../atoms/mapClickAtom";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Home() {
  const theme = useTheme();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useRecoilState(cityAtom);
  const [flyTo, setFlyTo] = useRecoilState(flytoAtom);
  const [modalData, setModalData] = useState({});
  const [best10Data, setBest10Data] = useState([]);
  const [worst10data, setWorst10Data] = useState([]);
  const [isAirMap, setIsAirMap] = useState(true);
  const [selectedProperty, setSelectedProperty] =
    useRecoilState(selectedPropertyAtom);
  const [mapClicked, setMapClicked] = useRecoilState(mapClicAtom);

  useEffect(() => {
    if (!mapClicked) return;

    setIsModalOpen(true);
    setLoading(true);
    getDataByLngLat(mapClicked.lat, mapClicked.lng).then(e=>{
      if(e.error){
        setLoading(false);
        setIsModalOpen(false);
      }
      else{
        setLoading(false);
        setModalData(e);
      }
    })
  }, [mapClicked]);

  useEffect(() => {
    if (!selectedProperty) return;

    if (!selectedProperty) return;

    async function fetchData() {
      let data = await getRankingData(selectedProperty);

      console.log(data);
      if (!data.error) {
        setBest10Data(data.topTen);
        setWorst10Data(data.lastTen);
      } else {
        console.log(data);
      }
    }
    fetchData();
  }, [selectedProperty]);


  useEffect(() => {
    async function fetchData() {
      if (city !== null) {
        let data = await getDataByName(city);
        console.log(data);
        if (!data.error) {
          setModalData(data);
          setFlyTo({ lng: data.lng, lat: data.lat });
          setIsModalOpen(true);
        } else {
          console.log(data);
        }
      } else closeModal();
    }
    fetchData();
  }, [city, map]);



  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({});
    setCity(null);
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
              sx={{ color: "black", fontWeight: 700 }}
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
              Top 10
              Top 10
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ padding: 0, margin: 0 }}>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Rank
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      {selectedProperty?.type === "air" ? "City" : "Country"}
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      {selectedProperty?.property}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {best10Data.map((row, index) => (
                    <TableRow key={index} style={{ marginBottom: 10 }}>
                      <TableCell align="center">
                        {index + 1 === 1 ? (
                          <span>
                            <img src="/trophy.png" height={30} width={30} />
                          </span>
                        ) : (
                          index + 1
                        )}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.value}</TableCell>
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
          
              Last 10
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ padding: 0, margin: 0 }}>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Rank
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      {selectedProperty?.type === "air" ? "City" : "Country"}
                    </TableCell>
                    <TableCell
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      {selectedProperty?.property}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {worst10data.map((row, index) => (
                    <TableRow key={index} style={{ marginBottom: 10 }}>
                      <TableCell align="center">
                        {index + 1 === 1 ? (
                          <span>
                            <img src="/trophy.png" height={30} width={30} />
                          </span>
                        ) : (
                          index + 1
                        )}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        <Button
          className={styles.searchBar}
          onClick={(e) => {
            setIsAirMap((e) => {
              return !e;
            });
          }}
        >
          {isAirMap ? "Population Data" : "Air Quality Data"}
        </Button>

        {isAirMap ? <HeatMapTest2 /> : <MapPopulation />}

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
            right: "20%",
            transform: "translate(50%, 50%)",
            width: 400,
            bgcolor: "#C1E1C1",
            boxShadow: 24,
            p: 4,
          }}
        >
          {modalData && (
            <>
              {!loading ? (
                <>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                        {modalData.cityName}
                      </Typography>
                    </Grid>
                    {/* Left Column */}
                    <Grid item xs={6}>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Latitude:</span>{" "}
                        {modalData.lat}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Longitude:</span>{" "}
                        {modalData.lng}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>AQI:</span>{" "}
                        {modalData.air?.aqi}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          PM2.5 levels:
                        </span>{" "}
                        {modalData.air?.pm2_5}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>PM10 levels:</span>{" "}
                        {modalData.air?.pm10}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          Ozone Levels:
                        </span>{" "}
                        {modalData.air?.o3}
                      </Typography>
                    </Grid>
                    {/* Right Column (Empty) */}
                    <Grid item xs={6}>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>Total GDP:</span>{" "}
                        {modalData.gdp}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          GDP Per capita:
                        </span>{" "}
                        {modalData.gdp_per_capita}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>GDP Growth:</span>{" "}
                        {modalData.gdp_growth}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          Total Population:
                        </span>{" "}
                        {modalData.population}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: "bold" }}>
                          Population Growth:
                        </span>{" "}
                        {modalData.population_growth}
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
