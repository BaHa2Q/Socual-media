// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import "./style.css";
// import { MdNotifications } from 'react-icons/md';
// import jwtDecode from "jwt-decode";
// import axios from "axios";

// const NavBar = () => {
//   const auth =  Cookies.get("authorization")
//   const user = jwtDecode(auth)
//   const [notification,setNotification] = useState([])
//   const onLogOut = () => {
//     localStorage.removeItem("authorization");
//     Cookies.remove("authorization");
//     window.location.reload(false);
//   };
//   useEffect(() => {
//     const tokencookie = Cookies.get("authorization")
//     axios
//       .get(
//         `http://localhost:5000/notification`,

//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + tokencookie,
//           },
//         }
//       )
//       .then((res) => setNotification(res.data))
//       .catch((error) => {
//         console.error(error);
//       });
//   },[])

//   return (
//     <div>
//       <ul>
//         <li>
//           <a href="#home">Home</a>
//         </li>
//         <li>
//           <a href="#news">News</a>
//         </li>
//         <li>
//           <a href="#contact">Contact</a>
//         </li>
//         <li style={{ float: "right" }}>
//           <a className="active" href="#about" onClick={() => onLogOut()}>
//             About
//           </a>
//         </li>
//         <li style={{ float: "right" }}>
//           <a style={{background:"red"}} href="#about" onClick={() => onLogOut()}>
//             { notification.length}
//           </a>
//         </li>
//         <div style={{ float: "right" }}>
//           <a className="noth" href="#about" onClick={() => onLogOut()}>
//             {user.user.name}
//           </a>
//         </div>
//       </ul>
//
//     </div>
//   );
// };
// export default NavBar;
import React, { useState, useEffect, useContext, useRef, Fragment } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import AuthContextAccount from "../Config/AuthProviderAccount";
import Menu from "../hook/Menu/Menu";
import Notification from "./Notification";
import Conten from "../hook/Menu/Conten";
function ResponsiveAppBar() {
  const { profiles } = useContext(AuthContextAccount);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const pages = ["Products", "Pricing", "Blog"];
  const onLogOut = () => {
    localStorage.removeItem("authorization");
    Cookies.remove("authorization");
    window.location.reload(false);
  };



  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <React.Fragment>
      <AppBar
        position="static"
        style={{ position: "fixed", zIndex: 2, top: 0, background: "#3a3a3a" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              ></Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <div ref={menuRef}>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Badge badgeContent={notification.length} color="error">
                    <IoMdNotifications />
                  </Badge>
                </IconButton>
                <Menu
                  title={"Notifications"}
                  name={"Logout"}
                  open={isNotificationOpen}
                />
              </div> */}
              <Notification />
              <div ref={menuRef} style={{ padding: "10px" }}>
                <IconButton
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  sx={{ p: 0 }}
                >
                  <Avatar alt="Remy Sharp" src={profiles.image} />
                </IconButton>
                {/* <Menu
                  title={"Profile"}
                  name={"Logout"}
                  open={isMenuOpen}
                  event={onLogOut}
                /> */}
                <Menu
                  title={"Profile"}
                  contant={settings.map((data,index) => {
                    return(<Fragment key={index}>  <Conten name={data} /></Fragment>);
                  })}
      
                  open={isMenuOpen}
                  event={onLogOut}
                />
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </React.Fragment>
  );
}
export default ResponsiveAppBar;
