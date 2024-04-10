import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../web/assets/logo.png";
function LandingPage() {
  return (
    <nav className="bg-custom-navy text-white flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="pl-2">
          <img
            src={logo}
            className="w-auto max-w-20 h-auto App-logo pl-2"
            alt="logo"
          />
        </div>

        <h1 className="font-manrope lg:text-2xl md:text-lg tracking-wider text-white font-semibold text-opacity-100  ">
          EasyKitchen
        </h1>

        
      </div>

      <div className="flex items-center gap-4">
        
        <div className="hidden md:flex gap-6">
          <NavLink to="/platform" className="hover:text-gray-300">
            Platform
          </NavLink>
          <NavLink to="/who-we-help" className="hover:text-gray-300">
            Who We Help
          </NavLink>
          
        </div>
        <NavLink to="signup" className="hover:text-gray-300">
          Sign
        </NavLink>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded">
          Request Demo
        </button>
      </div>
    </nav>
  );
}

export default LandingPage;
