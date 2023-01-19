
import {  Outlet  } from "react-router-dom";
import Login from "../auth/login";
import { AuthProviderAccount } from "../Config/AuthProviderAccount";
import ResponsiveAppBar from "../Navbar";
import NavBar from "../Navbar";
import useAuth from "./useAuth"
;
const ProtectedRoutes = ()=>{
    const {auth} = useAuth();

    if (!auth) return (<Login/>)
    return( <AuthProviderAccount> <ResponsiveAppBar><Outlet/></ResponsiveAppBar></AuthProviderAccount>)
};

export default ProtectedRoutes

