import React from "react";
import "./sidebar.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AdminIcon,
  CopyBoard,
  Dashboard,
  LogOut,
  OrderIcon,
  Pizza,
  Room,
} from "../../assets/svgs/index";
import { Button, Menu, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/redux";

const tabs = [
  { link: "/", label: "Hisobotlar", icon: Dashboard },
  { link: "/live-orders", label: "Aktiv buyurtmalar", icon: OrderIcon },
  { link: "/waiter", label: "Ofitsiant", icon: CopyBoard },
  { link: "/products", label: "Maxsulotlar", icon: Pizza },
  { link: "/rooms", label: "Xonalar/Stollar", icon: Room },
  { link: "/admin-create", label: "Ish Boshqaruvchilar", icon: AdminIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(setUser({}));
    navigate("/login", { replace: true });
    localStorage.clear();
  };
  return (
    <div className="sidebar">
      <NavLink className="sidebar_title" to="/">
        <Text fw={500} size="md" c="dimmed" mb="xs">
          ADMIN PANEL RESTORAN
        </Text>
      </NavLink>
      <ul className="sidebar_list">
        {tabs.map((x, index) => {
          return (
            <NavLink
              className={`link ${location === x.link ? "active" : ""}`}
              key={index}
              to={x.link}
            >
              <x.icon />
              {x.label}
            </NavLink>
          );
        })}
      </ul>
      <Menu position="right-start" width={"100px"}>
        <Menu.Target>
          <Button w={"100%"} py={"5px"} h={"auto"} mt={80} bg={"red"}>
            <Text pr={"sm"}>Chiqish</Text> <LogOut fill="#fff" />
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item c={"red"} onClick={handleLogout}>
            Ha
          </Menu.Item>
          <Menu.Item>Yo'q</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
