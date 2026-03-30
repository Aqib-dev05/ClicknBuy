import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./layouts/Navbar.jsx";
import Footer from "./layouts/Footer.jsx";


function MainLayout(){
    return(
        <>
        <NavBar/>
        <Outlet/>
        <Footer/>
        </>
    )
}

function SecondaryLayout(){
    return(
        <>
        <Outlet/>
        </>
    )
}

function AuthLayout(){
    return(
        <>
        <NavBar/>
        <Outlet/>
        </>
    )
}

export {MainLayout,SecondaryLayout,AuthLayout}