import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import MapTest from "./pages/MapTest";
import HeatMapTest from "./pages/HeatMapTest.jsx";
import Compare from "./pages/Compare";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/maptest" element={<MapTest />} />
          <Route path="/heatmaptest" element={<HeatMapTest />} />
          <Route path="/compare" element={<Compare />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
