import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LogoutDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    toast.success("Successfully logged out!", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
    navigate("/");
    onClose();
  }

  const menuItems = [
    { label: "Profile", onClick: () => { navigate("/profile"); onClose(); }, icon: "👤" },
    { label: "Account", onClick: () => { navigate("/account"); onClose(); }, icon: "🔒" },
    { label: "Security", onClick: () => { navigate("/security"); onClose(); }, icon: "🛡️" },
    { label: "Logout", onClick: handleLogout, danger: true, icon: "🚪" },
  ];

  return (
    <>
      {/* Overlay behind drawer */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isOpen ? "100vw" : 0,
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.15)",
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          zIndex: 998,
          cursor: "pointer",
        }}
      />

      {/* Drawer */}
      <aside
        style={{
          position: "fixed",
          top: 60,
          right: 0,
          width: 320,
          height: "100vh",
          backgroundColor: "#ffffff",
          boxShadow: "-3px 0 18px rgba(0,0,0,0.22)",
          borderRadius: "8px 0 0 8px",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s ease",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          paddingTop: 24,
          color: "#000000",
          fontFamily: "Arial, sans-serif",
          userSelect: "none",
        }}
        aria-hidden={!isOpen}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            padding: "0 20px",
            flexGrow: 1,
          }}
          role="menu"
        >
          {menuItems.map((item) => (
            <li
              key={item.label}
              onClick={item.onClick}
              tabIndex={0}
              role="menuitem"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  item.onClick();
                }
              }}
              style={{
                cursor: "pointer",
                padding: "14px 20px",
                borderRadius: 10,
                fontWeight: "600",
                fontSize: 18,
                display: "flex",
                alignItems: "center",
                gap: 16,
                backgroundColor: "transparent",
                color: item.danger ? "#dc2626" : "#000000",
                transition: "background-color 0.25s, color 0.25s",
                justifyContent: 'flex-start',
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = item.danger ? "#dc2626" : "#e0f2fe";
                e.currentTarget.style.color = item.danger ? "#fff" : "#0369a1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = item.danger ? "#dc2626" : "#000000";
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  color: "inherit",
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default LogoutDrawer;
