import React, { useState, useEffect, useRef, Fragment } from "react";
import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
import { IoMdNotifications } from "react-icons/io";
import Badge from "@mui/material/Badge";
import Cookies from "js-cookie";
import axios from "axios";
import Menu from "../../hook/Menu/Menu";
import Conten from "../../hook/Menu/Conten";
const Notification = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const tokencookie = Cookies.get("authorization");
    axios
      .get(
        `http://localhost:5000/notification`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokencookie,
          },
        }
      )
      .then((res) => setNotification(res.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let notificationRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div ref={notificationRef} style={{ padding: "10px" }}>
      <IconButton
        size="large"
        aria-label={`show ${notification.length} new notifications`}
        color="inherit"
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
      >
        <Badge badgeContent={notification.length} color="error">
          <IoMdNotifications />
        </Badge>
      </IconButton>

      <>
        <Menu
          title={"Notification"}
          open={isNotificationOpen}
          contant={notification.map((data,index) => {
            return (<Fragment key={index}> <Conten  name={data.name} /></Fragment>);
          })}
        />
      </>
    </div>
  );
};

export default Notification;
