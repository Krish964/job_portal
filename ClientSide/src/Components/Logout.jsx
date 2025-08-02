import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Logout() {
  const navigate = useNavigate(); // hook for programmatic navigation

  function switchToMainPage() {
    // Clear localStorage or authentication tokens if needed here
    localStorage.clear();
    toast.success("Successfully LoggedOut!!")
    navigate("/"); // programmatic navigation to home or main page
  }

  return (
    <div className="absolute left-0 mt-2 w-40 bg-black/90 backdrop-blur-md border border-teal-400 rounded-lg shadow-lg z-50">
      <ul className="flex flex-col text-white divide-y divide-teal-500">
        <li
          className="px-4 py-3 cursor-pointer hover:bg-teal-600 hover:text-white transition select-none rounded-t-lg"
          tabIndex={0}
          role="menuitem"
        >
          Account
        </li>
        <li
          className="px-4 py-3 cursor-pointer duration-200 hover:bg-red-600 hover:text-white transition select-none rounded-b-lg"
          tabIndex={0}
          role="menuitem"
          onClick={switchToMainPage}
        >
          Log Out
        </li>
      </ul>
    </div>
  );
}

export default Logout;
