import React from "react";
import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./modules/home";
import Login from "./modules/login";
import Register from "./modules/register";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
