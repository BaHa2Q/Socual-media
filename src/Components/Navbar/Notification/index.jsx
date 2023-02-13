import React, { useState, useEffect, useRef, Fragment } from "react";
import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
import { IoMdNotifications } from "react-icons/io";
import Badge from "@mui/material/Badge";
import Cookies from "js-cookie";
import axios from "axios";
import Menu from "../../hook/Menu/Menu";
import Conten from "../../hook/Menu/Conten";
import OrderFriends from "../../hook/Menu/OrderFriends";
import { DateTime } from "luxon";
import { useContext } from "react";
import AuthContextProfile from "../../Config/AuthProviderProfile";
const Notification = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const { myprofile } = useContext(AuthContextProfile);

  useEffect(() => {
    const tokencookie = Cookies.get("authorization");
    axios
      .get(
        `http://localhost:5000/notification/friend`,

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
  const tokencookie = Cookies.get("authorization");

  function ClickForAdd(profileId, users) {
	axios
	  .post(
		`http://localhost:5000/friends/Add/${profileId}`,
		{ users },

		{
		  headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + tokencookie,
		  },
		}
	  )
	  .then((res) => res.data)
	  .catch((error) => {
		console.error(error);
	  });
  }
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
        aria-label={`show  new notifications`}
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
          contant={notification.map((data, index) => {
            return (
              <Fragment key={index}>
                <OrderFriends
                  name={data.name}
				  config={ClickForAdd}
                  CreateTime={
                    <>
					{DateTime.fromISO(data.CreateAt).toRelative()}
					</>
                  }
                />
              </Fragment>
            );
          })}
        />
      </>
    </div>
  );
};

export default Notification;
