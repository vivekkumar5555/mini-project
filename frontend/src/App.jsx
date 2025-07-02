import React from "react";
import "./App.css";
import GetPost from "./Components/GetPost";
import AppPost from "./Components/AppPost";
import UpdatePost from "./Components/UpdatePost";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
function App() {
  return (
    <div>
      <Navbar />
      {/* <AppPost/> */}
      {/* <GetPost/> */}
      {/* <UpdatePost/> */}

      <Routes>
        {/* <Route path="/" element={<AppPost />} /> */}
        <Route path="/updatePost/:id" element={<UpdatePost />} />
        <Route path="/" element={<GetPost />} />
      </Routes>
    </div>
  );
}

export default App;
