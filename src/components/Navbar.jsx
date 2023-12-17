import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../store/states";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const token = JSON.parse(localStorage.getItem('token'));
  const logout = () => {
    navigate('/login')
    setUser(null)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    
    if (token) { //on Page refresh checking it the token is available in localStorage and set it to User as a Login user
      setUser(token.user) 
    }
  },[]);
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Car Registration Dashboard</h1>
        <div className="relative group">
          <button
            onClick={toggleDropdown}
            className="text-white font-semibold group hover:text-blue-300 focus:outline-none"
          >
            {user?.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block ml-2 -mt-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg divide-y divide-gray-200 overflow-clip">
              <div className="p-2">
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  logout()
                }}
                className="block w-full text-left p-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
