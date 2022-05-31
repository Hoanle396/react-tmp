import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "./layout/default";

const PrivateRoute = ({ auth, component }) => {

   if(!auth.isLoggedIn) {
      return <Navigate to='/login' />
    }
    return <Layout>{component}</Layout>;
};

export default PrivateRoute;
