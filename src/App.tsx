import React from "react";
import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./modules/home";
import Login from "./modules/login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
