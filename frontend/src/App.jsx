import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Landing from "./Landing";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
             
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home/>} />
            
            </Routes>
        
        </BrowserRouter>
   </>
  )
}

export default App
