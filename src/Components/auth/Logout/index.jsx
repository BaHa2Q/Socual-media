import axios from "axios";
import Cookies from "js-cookie";
import "./style.css";
import React, { useState } from "react";

import { toast, Toaster } from "react-hot-toast";
import useAuth from "../../hook/useAuth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", {
        email,
        password,
      })
      .then((response) => {
        window.location.reload(true);
        const accessToken = response?.data?.token;
        setAuth(accessToken);
        Cookies.set("authorization", response.data.token);
        toast.success(response.data.successful);
      })
      .catch((err) => {
        toast(err.response.data, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#ffcbcb",
            color: "rgb(129, 35, 35)",
            fontSize: "20px",
            border: "solid 1px red",
            fontWeight: "normal",
          },
        });
      });

    // Send a request to the server to verify the user's credentials
  };
  return (
    <div>
      <div>
        <Toaster position="top-right" />
      </div>
      <div id="bg"></div>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email / Username"
          />
        </div>

        <div className="form-field">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </div>

        <div className="form-field">
          <button className="btn" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
