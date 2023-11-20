import React, { useState, useEffect } from "react";
import { Menu, Drawer, Button } from "antd";
import { HomeOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Navigation/SideBar";
import "../../../assets/css/sidebar.css";
import SidebarMain from "../SidebarMain";

const Testing = () => {
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

  return (
    <aside className="sidebar">
      {isMobile
        ? null
        : // <Button
          //   type="primary"
          //   onClick={toggleDrawer}
          //   style={{ marginBottom: 16 }}
          // >
          //   <MenuOutlined />
          // </Button>
          null}
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
      ) : (
        <SidebarMain />
      )}
    </aside>
  );
};

export default Testing;
