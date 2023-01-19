import { Outlet, useRoutes } from "react-router-dom";
import App from "./App";
import Login from "./Components/auth/login";
import PrivateRoutes from "./Components/Config/PrivateRoutes";
import ProtectedRoutes from "./Components/Config/ProductRoute";
import NavBar from "./Components/Navbar";
import ER404 from "./page/Error404";
import Home from './page/index'
import Test from "./page/Test";



export default function Router() {
  let element = useRoutes([
      {
          element: <ProtectedRoutes />,
          children: [


    { path: "/", element: <Home /> },
    { path: "/test", element: <Test /> },
    { path: "/login", element: <Login /> },
    { path: "*", element: <ER404 /> },
          ],
      },
  ]);
  return element;
  }