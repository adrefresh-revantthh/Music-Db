import React, { useState } from "react";

function Navbar({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>PinkWave</div>

      <div style={{
        ...styles.links,
        ...(menuOpen ? styles.mobileOpen : {})
      }}>
        <button
          style={styles.linkBtn}
          onClick={() => {
            onNavigate("user");
            setMenuOpen(false);
          }}
        >
          Home
        </button>

        <button
          style={styles.linkBtn}
          onClick={() => {
            onNavigate("admin");
            setMenuOpen(false);
          }}
        >
          Admin
        </button>
      </div>

      <div
        style={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: "98vw",
    height: "70px",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 25px",
    boxSizing: "border-box",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    borderBottom: "1px solid #ffc2dc",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#b03060",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  linkBtn: {
    background: "transparent",
    border: "none",
    fontSize: "15px",
    cursor: "pointer",
    color: "#b03060",
    fontWeight: "500",
  },
  hamburger: {
    display: "none",
    fontSize: "22px",
    cursor: "pointer",
  },

  /* Mobile styles */
  mobileOpen: {
    position: "absolute",
    top: "70px",
    right: 0,
    background: "rgba(255,255,255,0.95)",
    flexDirection: "column",
    padding: "20px",
    gap: "15px",
  },
};

/* Responsive handling */
if (window.innerWidth < 768) {
  styles.links.display = "none";
  styles.hamburger.display = "block";
}

export default Navbar;
