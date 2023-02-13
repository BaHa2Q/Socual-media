import React, { useState, useEffect } from "react";
import axios from "axios";

import Cookies from "js-cookie";
import Loading from "../../Loading/Loading";
import Home from "../../page";
import Login from "../auth/login";

const PrivateRoutes = () => {
  const [loading, setLoading] = useState(true);
  const tokencookie = Cookies.get("authorization");
  const apiURL = "http://localhost:5000";
  useEffect(() => {
    try {
      axios
        .get(`${apiURL}/user`, {
          headers: {
            Authorization: `Bearer ${tokencookie}`,
            Accept: "application/json",
          },
        })
        .then(() => {
          return setLoading(false);
        })
        .catch(() => {
          return setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [tokencookie]);

  if (loading) return <Loading />;

  return tokencookie ? <Home /> : <Login />;
};

export default PrivateRoutes;
