import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import MapTest from "./pages/MapTest";
import HeatMapTest from "./pages/HeatMapTest.jsx";
import Compare from "./pages/Compare";
import HeatMapTest2 from "./pages/heatmaptest2";
import MapTest2 from "./pages/test2";
import ChatUI from "./pages/ChatBot";

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
          <Route path="/hm" element={<HeatMapTest2 />} />
          <Route path="/hm2" element={<MapTest2 />} />
          <Route path="/chat" element={<ChatUI/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
