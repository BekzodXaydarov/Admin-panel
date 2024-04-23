import React, { useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./page/admin/login";
import Dashboard from "./page/dashboard";
import { useEffect } from "react";
import { Box, Loader } from "@mantine/core";
import Sidebar from "./components/SideBar";
import "./App.css";
import LiveOrders from "./page/live-orders";
import Room from "./page/rooms";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Waiter from "./page/waiter";
import { useLoader, useUser } from "./redux/selectors";
import Product from "./page/products";

const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/live-orders",
    element: <LiveOrders />,
  },
  {
    path: "/rooms",
    element: <Room />,
  },
  {
    path:"/waiter",
    element:<Waiter />
  },
  {
    path:"/products",
    element:<Product />
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useUser();
  const loader = useLoader();
  const isHideSideBar = useMemo(
    () => ["/login"].includes(pathname),
    [pathname]
  );
  useEffect(() => {
    if (!user?.is_active) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
    <ToastContainer />
      {loader ? (
       <Loader
       color="blue"
       style={{ textAlign: "center", marginLeft: "800px" }}
     />
      ) : null}
       
      <div style={{ display: "flex" }}>
        <Box miw={200} display={isHideSideBar ? "none" : "block"}>
          <Sidebar />
        </Box>
        <Routes>
          {routes.map((x, index) => {
            return <Route key={index} path={x.path} element={x.element} />;
          })}
        </Routes>
      </div>
    </>
  );
}
