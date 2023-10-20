"use client"; // This is a client component 👈🏽"
import React, { useState } from "react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media, Navbar, NavItem, NavLink, Nav} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarTabs } from "@/constants/general";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Sidebar = (props) => {
  const router = useRouter()
    const [changePasswordModal, setChangePasswordModal] = useState(false)
    const [collapseOpen, setCollapseOpen] = useState();

    // toggles collapse between opened and closed (true/false)
    const toggleCollapse = () => {
      setCollapseOpen((data) => !data);
    };
    // closes the collapse
    const closeCollapse = () => {
      setCollapseOpen(false);
    };

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return !!routes?.length && routes.map((prop, key) => {
      return  <NavItem key={key}>
      <Link href={prop.path} key={key} className="nav-link">
        {/* <NavLink
         to={prop.path}
          // onClick={() => router.push(prop.path )}
          activeclassname="active"
        > */}
          <i className={prop.icon} />
          <span className="menu-name">{prop.name}</span>
        {/* </NavLink> */}
      </Link>
    </NavItem>
    });
  };

  function collapse_sidebar() {
    var body_el = document.querySelector('body');
    body_el.classList.toggle("collapse-side-menu")
  }

  return (
    <Navbar
    className="navbar-vertical fixed-left site-sidebar"
    expand="lg"
    id="sidenav-main"
  >
    {/* Toggler */}
    <button
      className="navbar-toggler"
      type="button"
      onClick={toggleCollapse}
    >
      <span className="navbar-toggler-icon">
        <svg width="28" height="18" viewBox="0 0 28 18">
          <rect width="28" height="2" fill="#5d5c61"/>
          <rect y="8" width="16" height="2" fill="#5d5c61"/>
          <rect y="16" width="28" height="2" fill="#5d5c61"/>
        </svg>
      </span>
    </button>
    {/* Brand */}
    <div className="sidebar-topbar">
      { <h1 className="logo-wrapper logo-text">Demo</h1>}
      <div className="hamburger-menu" onClick={() => collapse_sidebar()}>
        {/* <FontAwesomeIcon icon={faCircleDot} /> */}
        <span className="outer-circle"><em></em></span>
      </div>
    </div>
    {/* User */}
    <Nav className="align-items-center d-lg-none">
      <UncontrolledDropdown nav>
        <DropdownToggle nav>
          <Media className="align-items-center">
            <span className="avatar avatar-sm rounded-circle">
              {/* {restaurant?.logo ? <img alt="..." src={restaurant?.logo} /> :
                <FontAwesomeIcon icon={faImage} />} */}
            </span>
            <Media className="ml-2 d-none d-lg-block">
              <span className="mb-0 text-sm font-weight-bold">
              {getCookie('userData') && JSON.parse(getCookie('userData'))?.firstname}
              </span>
            </Media>
          </Media>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" end>
          <DropdownItem className="noti-title" header tag="div">
            <h6 className="text-overflow m-0">Welcome!</h6>
          </DropdownItem>
          <DropdownItem to="/admin/profile" >
            <i className="ni ni-single-02" />
            <span>My profile</span>
          </DropdownItem>
          <DropdownItem  onClick={() => setChangePasswordModal(true)}>
            <FontAwesomeIcon icon={faKey} />
            <span>Change password</span>
          </DropdownItem>
          <DropdownItem to="/admin/settings" >
            <i className="ni ni-settings-gear-65" />
            <span>Settings</span>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => {
            router.push('/login')
            deleteCookie('token')
            deleteCookie('userData')
          }}>
            <i className="ni ni-button-power" />
            <span>Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
    {/* Collapse */}
    <Collapse navbar isOpen={collapseOpen}>
      {/* Navigation */}
      <Nav navbar>{createLinks(SidebarTabs)}</Nav>
    </Collapse>
  </Navbar>
  );
};

export default Sidebar;