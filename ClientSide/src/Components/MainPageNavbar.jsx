import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faBuilding,
  faLightbulb,
  faBars,
  faTimes,
  faUserCircle,
  faBell,    // notification icon
} from "@fortawesome/free-solid-svg-icons";
import  LogoutDrawer  from "./Logout.jsx";
import mqtt from "mqtt";

function MainPageNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("User");
  const [modal, showModal] = useState(false);
  const [notifModal, showNotifModal] = useState(false); // notification modal toggle

  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const [userId, setUserId] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);


  // Get username and userId from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser === "admin" ? storedUser : storedUser);
    }

    const userId = localStorage.getItem("userId")
    setUserId(userId);
  }, []);

  // MQTT Setup for notifications
  useEffect(() => {
    if (!userId) {
      console.warn("No userId found for MQTT subscription");
      return;
    }

    const brokerUrl = "ws://localhost:9001"; // Your Mosquitto websocket port
    const clientId = "mqtt_react_client_" + Math.random().toString(16).substr(2, 8);

    const options = {
      username: "krish",   // broker ke liye username
      password: "radhaRani",
      protocol: 'ws',
      keepalive: 30,
      clientId,
      clean: true,
      reconnectPeriod: 100000,
     
    };

    const client = mqtt.connect(brokerUrl, options);

    client.on("connect", () => {
      console.log(`MQTT Connected with clientId: ${clientId}`);

      const topic = `user/notifications/${userId}/jobStatus`;
      client.subscribe(topic, { qos: 1 }, (err) => {
        if (err) console.error("Subscribe error:", err);
        else console.log(`Subscribed to topic: ${topic}`);
      });
    });

    client.on("message", (topic, message) => {
      const msgString = message.toString();
      console.log(`Message received on topic ${topic}:`, msgString);

      // Add notification to list and increment badge count
      setNotifications((prev) => [...prev, msgString]);
      setNewNotificationCount((count) => count + 1);
    });

    client.on("error", (err) => {
      console.error("MQTT error:", err);
    });

    return () => {
      if (client.connected) {
        client.end();
        console.log("MQTT client disconnected");
      }
    };
  }, [userId]);

  // Toggle user modal
  const toggleModal = () => {
    showModal((prev) => !prev);
    showNotifModal(false); // close notif modal if user modal is opened
  };

  // Toggle notification modal
  const toggleNotifModal = () => {
    showNotifModal((prev) => !prev);
    showModal(false);      // close user modal if notif modal is opened
    setNewNotificationCount(0); // Reset new notification count when modal opens
  };

  const menuItems = [
    { name: "Jobs", to: "/jobs", icon: faBriefcase },
    { name: "Internships", to: "/internships", icon: faGraduationCap },
    { name: "Companies", to: "/companies", icon: faBuilding },
    { name: "Career Tips", to: "/career-tips", icon: faLightbulb },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-gray-700 ">
      <div className="max-w-9xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center select-none z-50">
          <span
            className="text-3xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-400 to-purple-500 bg-clip-text text-transparent tracking-widest transition hover:brightness-125 duration-300"
            style={{ letterSpacing: "2px" }}
          >
            Job<span className="text-black">Portal</span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 font-semibold text-lg items-center">
          {menuItems.map(({ name, to, icon }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg relative transition duration-300 transform cursor-pointer ${isActive
                  ? "text-cyan-400 font-bold shadow-lg scale-110"
                  : "hover:text-cyan-600 hover:scale-110 hover:shadow-cyan-700/50"
                }`
              }
            >
              <FontAwesomeIcon icon={icon} />
              <span>{name}</span>
            </NavLink>
          ))}
        </div>

        {/* User Info + Notification */}
        <div className="hidden md:flex items-center gap-8 cursor-pointer select-none">
          {/* Notification Icon */}
          <div
            className="relative group transition-transform duration-300 hover:scale-110 hover:text-cyan-300"
            onClick={toggleNotifModal}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleNotifModal();
            }}
            role="button"
            aria-label="Notifications"
          >
            <FontAwesomeIcon
              icon={faBell}
              className="text-2xl  group-hover:text-cyan-400 drop-shadow-md"
            />
            {/* Notification badge for new notifications */}
            {newNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 border-2 border-black animate-pulse flex items-center justify-center text-xs font-bold text-white">
                {newNotificationCount}
              </span>
            )}
            {/* Notification modal content */}
            {notifModal && (
              <div className="absolute right-0 mt-2 w-80 max-h-72 overflow-y-auto bg-gray-900 border border-cyan-600 rounded shadow-lg p-4 z-50">
                <p className="text-cyan-400 font-semibold mb-2">Notifications</p>
                {notifications.length === 0 ? (
                  <p className="text-gray-300 text-sm">No notifications yet.</p>
                ) : (
                  <ul className="max-h-60 overflow-auto">
                    {notifications.map((notif, idx) => (
                      <li
                        key={idx}
                        className="text-gray-300 text-sm mb-1 border-b border-gray-700 pb-1"
                      >
                        {notif}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* User Icon + Modal */}
          <div className="flex justify-center items-center gap-3">
            <div
              className="relative group transition-transform duration-300 hover:scale-110 cursor-pointer"
              onClick={toggleDrawer}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleDrawer();
              }}
              role="button"
              aria-label="User menu"
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-4xl text-gray-900 drop-shadow-xl transition duration-300"
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-black animate-pulse"></span>
            </div>
            <span className="font-semibold cursor-default transition-colors duration-300 hover:text-cyan-300 select-text md:select-none text-lg font-mono">
              {username}
            </span>
          </div>

          {/* Drawer Component */}
          <LogoutDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-50 text-cyan-400 hover:text-cyan-200 focus:outline-none p-2 transition-transform duration-300"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[64px] left-0 w-full h-screen bg-black/90 backdrop-blur-lg transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        style={{ zIndex: 999 }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-12 text-gray-300 font-semibold text-xl px-6">
          {menuItems.map(({ name, to, icon }) => (
            <NavLink
              key={name}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-10 py-4 rounded-lg w-full justify-center cursor-pointer transition duration-200 ${isActive
                  ? "text-cyan-400 font-bold scale-110 bg-cyan-900/40 shadow-lg"
                  : "hover:text-cyan-400 hover:scale-105 hover:bg-cyan-900/30"
                }`
              }
            >
              <FontAwesomeIcon icon={icon} size="lg" />
              {name}
            </NavLink>
          ))}

          {/* Mobile User Info */}
          <div className="flex items-center gap-6 mt-20 group hover:scale-105 transition-transform duration-300 cursor-default select-none">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-6xl text-cyan-400 group-hover:drop-shadow-cyan-600 transition duration-300"
            />
            <span className="text-white font-semibold text-2xl group-hover:text-cyan-300 font-mono">
              {username}
            </span>
            <span className="w-5 h-5 bg-green-500 rounded-full border-2 border-black animate-pulse"></span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MainPageNavbar;
