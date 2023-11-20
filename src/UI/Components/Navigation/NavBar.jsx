import "../../../assets/css/navbar.css";
import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Sidebar from "../SidebarMain";
import "../../../assets/css/sidebar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 760;
      setIsMobile(newIsMobile);
      setVisible(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  const user = useSelector((state) => state?.auth);
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return null;
  }

  return (
    <nav className="navbar">
      <div>
        {isMobile && (
          <>
            <Button
              type="primary"
              onClick={toggleDrawer}
              className="hamburger"
            >
              <MenuOutlined />
            </Button>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
