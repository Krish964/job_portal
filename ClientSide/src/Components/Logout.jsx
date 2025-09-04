import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LogoutModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  async function handleLogout() {
    
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.clear();
        toast.success("Successfully logged out!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light", // Using light toast theme
        });
        navigate("/");
        onClose();
      } else {
        const data = await response.json();
        toast.error(`Logout failed: ${data.message || "Unknown error"}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(`Logout error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  }

  const menuItems = [
    { label: "Profile", onClick: () => { navigate("/profile"); onClose(); }, icon: "👤" },
    { label: "Account", onClick: () => { navigate("/account"); onClose(); }, icon: "🔒" },
    { label: "Security", onClick: () => { navigate("/security"); onClose(); }, icon: "🛡️" },
    { label: "Logout", onClick: handleLogout, danger: true, icon: "🚪" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          width: "100vw",
          height: "calc(100vh - 60px)",
          backgroundColor: "rgba(0,0,0,0.1)", // softer overlay
          zIndex: 1000,
          cursor: "pointer",
        }}
      />
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          top: 60,
          right: 0,
          width: 320,
          backgroundColor: "#fff",
          borderRadius: "0 0 0 8px",
          boxShadow: "0 8px 18px rgba(0,0,0,0.12)", // subtle shadow
          padding: "20px 0",
          zIndex: 1001,
          fontFamily: "Arial, sans-serif",
          color: "#000", // black text
        }}
      >
        <ul
          role="menu"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
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
                padding: "12px 24px",
                borderRadius: 6,
                fontWeight: "600",
                fontSize: 18,
                color: "#000", // black text for all items
                display: "flex",
                alignItems: "center",
                gap: 16,
                backgroundColor: "transparent",
                transition: "background-color 0.2s, color 0.2s",
                justifyContent: "flex-start",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f0f0"; // light gray hover
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#000";
              }}
            >
              <span style={{ fontSize: 24, color: "inherit" }}>{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default LogoutModal;
