import React from "react";

import { NavLink } from "react-router-dom";
import Suppliers from "./pages/Suppliers/Suppliers";
import Report from "./pages/Report/Report";
import Settings from "./pages/Settings/Settings";
import Stock from "./pages/Stock/Stock";
import Ingredients from "./pages/Ingredients/Ingredients";
import SubRecipes from "./pages/SubRecipes/SubRecipes";
import logo from "../src/assets/logo.png";
import Dashboard from "./pages/Dashboard/Dashboard";
import Inventory from "./pages/Inventory/Inventory";
import Recipes from "./pages/Recipes/Recipes";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineEmojiTransportation,
  MdOutlineWarehouse,
  MdOutlineInventory,
  MdAccountCircle,
  MdOutlineRestaurantMenu,
} from "react-icons/md";
import { FaBookOpen, FaBook } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";
import { useState } from "react";
import SubRecipesStock from "./pages/SubRecipes/SubRecipesStock/SubRecipesStock";
import { Tooltip } from "react-tooltip";
import NewSub from "./pages/SubRecipes/NewSubRecipe/NewSub";
import Account from "./pages/Account/Account";
import SignUp from "./pages/SignUser/SignUp/SignUp";
import { IoSettingsOutline } from "react-icons/io5";
import SignIn from "./pages/SignUser/SignIn/SignIn";
import { Menu } from "@mui/icons-material";
import NavigationHandler from "./components/NavigationHandler";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { pathname } = useLocation();
  const isSignupPage = pathname === "/signup";
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <NavigationHandler />

      <main>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>

      {!isSignupPage && (
        <div className="min-h-screen flex bg-slate-150">
          <aside
            className={`fixed  pt-5 rounded-r-3xl  bg-custom-navy  ${
              isCollapsed ? "w-[5%]" : "w-1/6"
            } p-3 text-white text-opacity-80 transition-all duration-300 h-screen flex flex-col justify-between `}
          >
            {!isCollapsed && (
              <button
                onClick={toggleSidebar}
                className="absolute top-1/2 left-56 3xl:left-72 transform -translate-y-1/2 cursor-pointer opacity-80 text-white  hover:opacity-100"
              >
                <MdOutlineKeyboardArrowLeft size={38} />
              </button>
            )}
            {isCollapsed && (
              <button
                onClick={toggleSidebar}
                className="fixed top-1/2 left-12 transform -translate-y-1/2 cursor-pointer opacity-80 text-white
                  hover:opacity-100"
              >
                <MdOutlineKeyboardArrowRight size={34} />
              </button>
            )}

            <div className="flex justify-start items-center gap-1 pb-2 ">
              <img src={logo} width={"70px"} className="App-logo" alt="logo" />

              {!isCollapsed && (
                <h1 className="font-manrope text-2xl tracking-wider text-white font-semibold text-opacity-100 ">
                  EasyKitchen
                </h1>
              )}
            </div>
            <div className="flex flex-col gap-3 pb-10 3xl:pb-52">
              <NavLink
                data-tooltip-id="overview"
                data-tooltip-content="Overview"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2  px-4 py-2 text-lg ${
                    isActive
                      ? "bg-white font-bold text-blue-700 rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/dashboard"
              >
                <IoMdHome size={24} />
                {!isCollapsed && <span>Overview</span>}
                {isCollapsed && <Tooltip id="overview" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="suppliers"
                data-tooltip-content="Suppliers"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2 text-lg ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/suppliers"
              >
                <MdOutlineEmojiTransportation size={24} />
                {!isCollapsed && <span>Suppliers</span>}
                {isCollapsed && <Tooltip id="suppliers" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="stock"
                data-tooltip-content="  Stock"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2 text-lg ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/stock"
              >
                <MdOutlineWarehouse size={24} />
                {!isCollapsed && <span>Stock</span>}
                {isCollapsed && <Tooltip id="stock" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="inventory"
                data-tooltip-content="Inventory"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2 text-lg ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/inventory"
              >
                <MdOutlineInventory size={24} />
                {!isCollapsed && <span>Inventory</span>}
                {isCollapsed && <Tooltip id="inventory" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="subrecipes"
                data-tooltip-content="Sub-Recipes"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2 text-lg ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/subrecipes"
              >
                <FaBookOpen size={24} />
                {!isCollapsed && <span>Sub-Recipes</span>}
                {isCollapsed && <Tooltip id="subrecipes" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="recipes"
                data-tooltip-content="Recipes"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2 text-lg ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/recipe"
              >
                <FaBook size={24} />
                {!isCollapsed && <span>Recipes</span>}
                {isCollapsed && <Tooltip id="recipes" place="right" />}
              </NavLink>
              <NavLink
                data-tooltip-id="menu"
                data-tooltip-content="Menu"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2 text-lg ${
                    isActive
                      ? "bg-white font-bold text-blue-700 rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/menu"
              >
                <MdOutlineRestaurantMenu size={28} />
                {!isCollapsed && <span>Menu</span>}
                {isCollapsed && <Tooltip id="account" place="right" />}
              </NavLink>
              <NavLink
                data-tooltip-id="report"
                data-tooltip-content="Report"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2 text-lg ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/report"
              >
                <HiOutlineDocumentReport size={24} />
                {!isCollapsed && <span>Report</span>}
                {isCollapsed && <Tooltip id="report" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="settings"
                data-tooltip-content="Settings"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2 text-lg  ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/settings"
              >
                <IoSettingsOutline size={24} />
                {!isCollapsed && <span>Settings</span>}
                {isCollapsed && <Tooltip id="settings" place="right" />}
              </NavLink>

              <div className="flex flex-col gap-3 pb-6  ">
                <NavLink
                  data-tooltip-id="account"
                  data-tooltip-content="Account"
                  className={({ isActive }) =>
                    `flex items-center justify-start gap-5 mb-2 mt-4 px-4 py-2 text-lg ${
                      isActive
                        ? "bg-white font-bold text-blue-700 rounded-lg"
                        : "text-white hover:bg-white/30"
                    }`
                  }
                  to="/account"
                >
                  <MdAccountCircle size={24} />
                  {!isCollapsed && <span>Account</span>}
                  {isCollapsed && <Tooltip id="account" place="right" />}
                </NavLink>
              </div>
            </div>
          </aside>

          <main
            className={`flex-1 transition-margin duration-300 ${
              isCollapsed ? "ml-[5%]" : "ml-[17%]"
            }`}
          >
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/subrecipes" element={<SubRecipes />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/recipe" element={<Recipes />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/report" element={<Report />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/newsubrecipe" element={<NewSub />} />
              <Route path="/stocksubrecipe" element={<SubRecipesStock />} />
              <Route path="/account" element={<Account />} />
              <Route path="/menu" element={<Menu />} />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
