import { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/SignupPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/profile" /> : <LoginPage></LoginPage>}
        />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </main>
  );
}

export default App;
