import "./App.css";
import Home from "./Components/Home/Home";

import People from "./Components/People/People";
import Movies from "./Components/Movies/Movies";
import TvShow from "./Components/TvShow/TvShow";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RoutLayout from "./Layout/RoutLayout";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import jwt_Decode from "jwt-decode";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Profile from "./Components/Profile/Profile";
import Detalis from "./Components/Details/Detalis";

function App() {
  let [userData, setUserData] = useState(null);
  function saveUser(props) {
    let token = localStorage.getItem("token");
    let decoded = jwt_Decode(token);
    setUserData(decoded);
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUser();
    }
  }, []);
  let logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    return <Navigate to="login" />;
  };


  let routers = createBrowserRouter([
    {
      path: "/",
      element: <RoutLayout userData={userData} logout={logout} />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute userData={userData}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute userData={userData}>
              <Home />
            </ProtectedRoute>
          ),
        },

        {
          path: "movies",
          element: (
            <ProtectedRoute userData={userData}>
              <Movies />
            </ProtectedRoute>
          ),
        },
        {
          path: "tvshow",
          element: (
            <ProtectedRoute userData={userData}>
              <TvShow />
            </ProtectedRoute>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectedRoute userData={userData}>
              <People />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute userData={userData} >
              <Profile  userData={userData}/>
            </ProtectedRoute>
          ),
        },

        { path: "register", element: <Register /> },
        { path: "login", element: <Login saveUser={saveUser} /> },
        {path:"details/:id/:type", element: <Detalis/>},
        { path: "*", element: <NotFound /> },
       
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
