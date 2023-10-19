"use client"; // This is a client component 👈🏽"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Navbar, Nav, Media } from "reactstrap";
import { faImage, faKey, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "cookies-next";
import { SidebarTabs } from "@/constants/general";
import { usePathname, useRouter } from "next/navigation";

const Header = (props) => {
  const router = useRouter();
  const pathname = usePathname();

  return <>
    <div className="header-wrap">
      <Navbar className="navbar-top" expand="sm" id="navbar-main">
        <>
          <div className="left-block-wrap">
            <div className="h4 mb-0 text-uppercase" to="/">
              {SidebarTabs.find((value) => pathname.indexOf(value.path) !== -1)?.name}
            </div>
          </div>
          <Nav className="align-items-center d-none d-lg-flex header-profile-menu" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav >
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {/* {restaurant?.logo ? <img alt="Logo" src={restaurant?.logo} className="full-height" /> :
                      <FontAwesomeIcon icon={faImage} />} */}
                  </span>
                  <Media className="ml-2 d-none d-lg-inline-flex align-items-center">
                    <span className="text-sm profile-name">
                      {getCookie('userData') && JSON.parse(getCookie('userData'))?.firstname}
                    </span>
                    <i className="ml-2">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </i>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/profile" >
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem onClick={() => setChangePasswordModal(true)}>
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
        </>
      </Navbar>
    </div>
  </>
};

export default Header
