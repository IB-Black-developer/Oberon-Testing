import "../../../assets/css/navbar.css";
import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SidebarMain";
import "../../../assets/css/sidebar.css";
import "../../../assets/css/sidebarslide.css";

const SideBar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 760);
      setVisible(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === "signout") {
    } else {
      navigate(key);
      if (isMobile) {
      }
    }
  };

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  const user = false;
  return (
    <nav className="SideBar">
      <div>
        {isMobile ? (
          <Button type="primary" onClick={toggleDrawer} className="hamburger">
            <MenuOutlined />
          </Button>
        ) : null}
        {isMobile ? (
          <Drawer
            title="Menu"
            placement="left"
            onClose={toggleDrawer}
            visible={visible}
            bodyStyle={{
              padding: 0,
              backgroundColor: "var(--primary-color)",
              border: "none",
              width: "300",
            }}
          >
            <Sidebar /> 
          </Drawer>
        ) : null}
      </div>

      <ul className="nav-list">
        {/* <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item"><a href="/about">About</a></li>
        <li className="nav-item"><a href="/services">Services</a></li>
        <li className="nav-item"><a href="/contact">Contact</a></li> */}
      </ul>
    </nav>
  );
};

export default SideBar;
