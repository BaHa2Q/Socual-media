
import {  useRoutes } from "react-router-dom";

import { AuthProvider } from "./Components/Config/AuthProvider";
import { AuthProviderProfile } from "./Components/Config/AuthProviderProfile";

import Home from "./page";

import ER404 from "./page/Error404";
import ProtectedRoutes from "./Components/hook/ProductRoute";
import Profile from "./page/Profile";
function App() {


  // <Home posts={posts} users={users} isFetching={isFetching} />


  let element = useRoutes([
    {
      element: <ProtectedRoutes />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/:username", element:<AuthProviderProfile> <Profile/></AuthProviderProfile>},
        { path: "*", element: <ER404 /> },
      ],
    }, 
  ]);
  return element;
}
function AppWithStore() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
export default AppWithStore;


