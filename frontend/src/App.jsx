import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AdminPanel from "./panels/adminpanel/AdminPanel";
import UserPanel from "./panels/userpanel/UserPanel";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <div style={styles.appWrapper}>
        
        {/* Navbar */}
        <nav style={styles.navbar}>
          <div style={styles.logo}>PinkWave</div>

          {/* Desktop Links */}
          {!isMobile && (
            <div style={styles.links}>
              <NavLink
                to="/user"
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/admin"
                style={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                Admin
              </NavLink>
            </div>
          )}

          {/* Hamburger */}
          {isMobile && (
            <div
              style={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </div>
          )}
        </nav>

        {/* Mobile Dropdown */}
        {isMobile && menuOpen && (
          <div style={styles.mobileMenu}>
            <NavLink
              to="/user"
              style={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/admin"
              style={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </NavLink>
          </div>
        )}

        {/* Page Content */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<UserPanel />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/user" element={<UserPanel />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

const styles = {
  appWrapper: {
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    background: "linear-gradient(135deg,#fff0f6,#ffd6e7,#ffc2dc)",
    fontFamily: "Segoe UI, sans-serif",
  },

  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "70px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 5%",
    boxSizing: "border-box",
    borderBottom: "1px solid #ffc2dc",
    zIndex: 1000,
  },

  logo: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#b03060",
  },

  links: {
    display: "flex",
    gap: "30px",
  },

  link: {
    textDecoration: "none",
    color: "#b03060",
    fontWeight: "500",
    fontSize: "15px",
  },

  activeLink: {
    textDecoration: "none",
    color: "#ff4fa3",
    fontWeight: "600",
    fontSize: "15px",
  },

  hamburger: {
    fontSize: "26px",
    cursor: "pointer",
    color: "#b03060",
  },

  mobileMenu: {
    position: "fixed",
    top: "70px",
    right: 0,
    width: "220px",
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "25px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    borderRadius: "0 0 0 20px",
    zIndex: 999,
  },

  content: {
    paddingTop: "90px",
  },
};

export default App;
