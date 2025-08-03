import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
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
  }

  const menuItems = [
    { label: "Profile", onClick: () => navigate("/profile") },
    { label: "Account", onClick: () => navigate("/account") },
    { label: "Security", onClick: () => navigate("/security") },
    { label: "Notification", onClick: () => navigate("/notifications") },
    { label: "Logout", onClick: handleLogout, danger: true },
  ];

  return (
    <div className="absolute left-0 mt-2 w-52 bg-gradient-to-br from-gray-900 via-black/90 to-cyan-950 backdrop-blur-xl shadow-2xl border-none rounded-xl z-50 ring-1 ring-cyan-700/30">
      <ul className="flex flex-col py-2 px-1">
        {menuItems.map((item, idx) => (
          <li
            key={item.label}
            onClick={item.onClick}
            tabIndex={0}
            role="menuitem"
            className={`mx-1 my-0.5 px-5 py-3 rounded-lg font-semibold text-base 
              cursor-pointer select-none transition-all duration-150
              focus:outline-none focus:bg-cyan-900/75
              hover:bg-cyan-800/75 hover:text-cyan-100
              ${idx === 0 ? "mt-1" : ""
              }
              ${idx === menuItems.length - 1
                ? "text-red-500 mt-2 hover:bg-red-600/90 hover:text-white"
                : ""
              }
              ${item.danger ? "text-red-500 hover:bg-red-600/90 hover:text-white" : "text-cyan-200"}
            `}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                item.onClick();
              }
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Logout;
