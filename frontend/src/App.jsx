import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";
import MapTest from "./pages/MapTest";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
             
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home/>} />
              <Route path="/maptest" element={<MapTest />}/>
            
            </Routes>
        
        </BrowserRouter>
   </>
  )
}

export default App
