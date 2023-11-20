import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/sidebar.css";
import { MdHome } from "react-icons/md";
import { AiFillBell } from "react-icons/ai";
import useOrganizationBasicInfoForm from "../OrganisationSettings/Hooks/useOrgBasicInfo";
import useUserRole from "../../Hooks/useUserRoles";

const SidebarMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSubMenu, setActiveSubMenu] = useState("");

  const handleMenuClick = ({ key, keyPath }) => {
    if (key === "signout") {
    } else {
      navigate(key);
      localStorage.setItem("activeMenuItem", key);

      const parentSubMenu = keyPath.find((path) => path.startsWith("/yeah"));
      setActiveSubMenu(parentSubMenu || "");
    }
  };

  const activeMenuItem = localStorage.getItem("activeMenuItem") || "/wow";
  const { org } = useOrganizationBasicInfoForm();
  const userRole = useUserRole(org);
  return (
    <div>
      <Menu
        theme="dark"
        onClick={handleMenuClick}
        mode="inline"
        selectedKeys={[activeMenuItem]}
        className="Sidebar-background-color"
      >
        <div className="Side-bar-group">
          <div className="Side-bar-group-divs-inside">
            <div>
              <h3 className="Side-bar-group-divs-inside-h3">
                Hi, {org?.first_name}
              </h3>
              <p className="Side-bar-group-divs-inside-p">{userRole}</p>
            </div>
            <div className="Side-bar-group-divs-inside-notifications">
              {" "}
              <AiFillBell className="Side-bar-group-divs-inside-notifications-icon" />
            </div>
          </div>
          <button
            onClick={() => navigate("/admin-setup-organisation-basic-info")}
            className="Side-bar-group-divs-inside-button"
          >
            {" "}
            Set up Organisation
          </button>
        </div>
        <Menu.Item
          key="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? "ActiveMenuItem"
              : "InactiveMenuItem"
          }
        >
          <p className="Side-bar-group-divs-inside-dashboard">
            {" "}
            <MdHome size={22} className="react-icons" /> Dashboard
          </p>
        </Menu.Item>
        <Menu.SubMenu
          key="/admin-setup-organisation-basic-info"
          title="Organisation Settings"
          className={`${
            activeSubMenu ? "ParentActiveMenuItem" : "ParentInactiveMenuItem"
          }`}
          style={{
            color: "white !important",
            backgroundColor: "white !important",
          }}
        >
          <Menu.Item
            key="/admin-edit-organisation-basic-info"
            className={
              location.pathname === "/admin-edit-organisation-basic-info"
                ? "ActiveMenuItem"
                : "InactiveMenuItem"
            }
          >
            Organisation’s Basic information
          </Menu.Item>
          <Menu.Item
            key="/admin-edit-organisation-kyc"
            className={
              location.pathname === "/admin-edit-organisation-kyc"
                ? "ActiveMenuItem"
                : "InactiveMenuItem"
            }
          >
            Organisation’s KYC
          </Menu.Item>
          <Menu.Item
            key="/admin-edit-organisation-address"
            className={
              location.pathname === "/admin-edit-organisation-address"
                ? "ActiveMenuItem"
                : "InactiveMenuItem"
            }
          >
            Organisation’s Address and Social Media Presence
          </Menu.Item>
          <Menu.Item
            key="/admin-edit-organisation-contact-admin"
            className={
              location.pathname === "/admin-edit-organisation-contact-admin"
                ? "ActiveMenuItem"
                : "InactiveMenuItem"
            }
          >
            Contact Admin{" "}
          </Menu.Item>

          <Menu.SubMenu key="/" title="Hr Ops">
            <Menu.Item
              key="/admin-add-staff"
              className={
                location.pathname === "/admin-add-staff"
                  ? "ActiveMenuItemChild"
                  : "InactiveMenuItemChild"
              }
            >
              Add Staff
            </Menu.Item>
            <Menu.Item
              key="/all-staff"
              className={
                location.pathname === "/all-staff"
                  ? "ActiveMenuItemChild"
                  : "InactiveMenuItemChild"
              }
            >
              All Staff
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default SidebarMain;
