import React, { Fragment, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import ModalLogout from "../utils/ModalLogout";

const Header = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [sideNav, setSideNav] = React.useState(false);
  return (
    <Fragment>
      {user && (
        <nav className="navbar">
          <div className="navbar-container">
            <div className="nav-title">
              <h1>Hotel</h1>
              <h1 style={{ marginLeft: "1rem" }}>|</h1>
              <h1 className="logo">Logo</h1>
            </div>
            <div className="nav-list">
              {user.role === "Manager" && (
                <div className="nav-item">
                  <a href="/karyawan">Karyawan</a>
                </div>
              )}
              {user.role === "Owner" && (
                <div className="nav-item">
                  <a href="/karyawan">Karyawan</a>
                </div>
              )}
              <div className="nav-item">
                <a href="/account">Account</a>
              </div>
              <div className="nav-item">
                <a href="/">Home</a>
              </div>
              <div className="nav-item">
                <a href="/checkin">Check In</a>
              </div>
              <ModalLogout />
            </div>
            <div className="collapse">
              {sideNav ? (
                <a className="icon-burger" href="/">
                  <i
                    className="fas fa-times fa-2x"
                    onClick={e => {
                      e.preventDefault();
                      setSideNav(false);
                    }}
                  ></i>
                </a>
              ) : (
                <a className="icon-burger" href="/">
                  <i
                    className="fas fa-bars fa-2x"
                    onClick={e => {
                      e.preventDefault();
                      setSideNav(true);
                    }}
                  ></i>
                </a>
              )}

              <div
                className={
                  sideNav ? "sidenav sidenav-show" : "sidenav sidenav-hide"
                }
              >
                <a href="/">About</a>
                <a href="/">Services</a>
                <a href="/">Clients</a>
                <a href="/">Contact</a>
              </div>
            </div>
          </div>
        </nav>
      )}
    </Fragment>
  );
};

export default Header;
