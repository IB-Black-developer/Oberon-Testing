import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import Navbar from "./UI/Components/Navigation/NavBar.jsx";
import { store } from "./redux/store.jsx";
import "./index.css";
import User from "./Index.jsx";
import Auth from "./Auth.jsx";

const App = () => {
  const user = useSelector((state) => state?.auth);

  const accessToken = localStorage.getItem("accessToken");

  return (
    <BrowserRouter>
      <Navbar />
      {accessToken ? <User /> : <Auth />}
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
