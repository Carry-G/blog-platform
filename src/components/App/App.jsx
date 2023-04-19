import { useState, useEffect, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import AuthContex from "../../context";
import "./App.css";
import ApiBlog from "../../services/apiServices";

import AppRouter from "./AppRouter/AppRouter";

const api = new ApiBlog();

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const valueU = useMemo(
    () => ({
      isAuth,
      setIsAuth,
      loading,
      setLoading,
    }),
    [isAuth, loading]
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.getUser(token).then((result) => setIsAuth(result.ok));
    }
  }, []);

  return (
    <AuthContex.Provider value={valueU}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContex.Provider>
  );
};

export default App;
