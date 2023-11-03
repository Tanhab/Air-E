import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";
import MapTest from "./pages/MapTest";
import HeatMapTest from "./pages/HeatMapTest.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
             
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home/>} />
              <Route path="/maptest" element={<MapTest />}/>
              <Route path="/heatmaptest" element={<HeatMapTest />}/>
            </Routes>
        
        </BrowserRouter>
   </>
  )
}

export default App
