import { BrowserRouter, Route,Routes } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewIncident from "./pages/NewIncident";

export default function Router(){
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/" Component={Login} />
       <Route path="/register" Component={Register} />

       <Route path="/profile" Component={Profile} />
       <Route path="/NewIncident" Component={NewIncident} />
     </Routes>
   </BrowserRouter>
 )
}