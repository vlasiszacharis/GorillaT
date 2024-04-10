import { useState } from "react";
import { FaBookOpen, FaBook } from "react-icons/fa6";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineEmojiTransportation,
  MdOutlineWarehouse,
  MdOutlineInventory,
  MdOutlineRestaurantMenu,
  MdAccountCircle,
} from "react-icons/md";
import { useLocation, Routes, Route, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import NavigationHandler from "../../components/NavigationHandler";
import Account from "../Account/Account";
import Ingredients from "../Ingredients/Ingredients";
import NewRecipe from "../Recipes/NewRecipe/NewRecipe";
import Recipes from "../Recipes/Recipes";

import Stock from "../Stock/Stock";
import NewSub from "../SubRecipes/NewSubRecipe/NewSub";
import SubRecipes from "../SubRecipes/SubRecipes";
import SubRecipesStock from "../SubRecipes/SubRecipesStock/SubRecipesStock";
import Suppliers from "../Suppliers/Suppliers";
import logo from "../../assets/logo.png";
import Report from "../Report/Report";
import Dashboard from "../Dashboard/Dashboard";
import Inventory from "../Inventory/Inventory";
import Settings from "../Settings/Settings";
import Menu from "../Menu/Menu";
import AddNewMenu from "../Menu/AddNewMenu";
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

      {!isSignupPage && (
        <div className="min-h-screen flex bg-slate-150">
          <aside
            className={`fixed  pt-5 rounded-r-3xl  bg-custom-navy  ${
              isCollapsed
                ? "xl:w-[5%] md:w-[9%]  "
                : "xl:w-1/6  md:w-1/4 lg:w-1/4"
            } p-3 text-white text-opacity-80 transition-all duration-300 h-screen flex flex-col xl:justify-between md:justify-start md:gap-16 xl:gap-0 `}
          >
            {!isCollapsed && (
              <button
                onClick={toggleSidebar}
                className="absolute top-1/2 lg:left-56 md:left-40  3xl:left-72 transform -translate-y-1/2 cursor-pointer opacity-80 text-white  hover:opacity-100"
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

            <div className=" flex justify-start md:w-14 xl:w-16 items-center xl:gap-1 xl:pb-2 ">
              <img
                src={logo}
                className="w-auto max-w-full h-auto App-logo"
                alt="logo"
              />

              {!isCollapsed && (
                <h1 className="font-manrope lg:text-2xl md:text-lg tracking-wider text-white font-semibold text-opacity-100  ">
                  EasyKitchen
                </h1>
              )}
            </div>
            <div className="flex flex-col xl:gap-3 xl:pb-10 3xl:pb-52 md:gap-8 md:text-xl lg:text-2xl xl:text-lg ">
              <NavLink
                data-tooltip-id="overview"
                data-tooltip-content="Overview"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2  px-4 py-2  ${
                    isActive
                      ? "bg-white font-bold text-blue-700 rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/app/dashboard"
              >
                <IoMdHome size={24} />
                {!isCollapsed && <span>Overview</span>}
                {isCollapsed && <Tooltip id="overview" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="suppliers"
                data-tooltip-content="Suppliers"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2  ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/app/suppliers"
              >
                <MdOutlineEmojiTransportation size={24} />
                {!isCollapsed && <span>Suppliers</span>}
                {isCollapsed && <Tooltip id="suppliers" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="stock"
                data-tooltip-content="  Stock"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2  ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/app/stock"
              >
                <MdOutlineWarehouse size={24} />
                {!isCollapsed && <span>Stock</span>}
                {isCollapsed && <Tooltip id="stock" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="inventory"
                data-tooltip-content="Inventory"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2  ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/app/inventory"
              >
                <MdOutlineInventory size={24} />
                {!isCollapsed && <span>Inventory</span>}
                {isCollapsed && <Tooltip id="inventory" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="subrecipes"
                data-tooltip-content="Sub-Recipes"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2  ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/app/subrecipes"
              >
                <FaBookOpen size={24} />
                {!isCollapsed && <span>Sub-Recipes</span>}
                {isCollapsed && <Tooltip id="subrecipes" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="recipes"
                data-tooltip-content="Recipes"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2  ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/app/recipes"
              >
                <FaBook size={24} />
                {!isCollapsed && <span>Recipes</span>}
                {isCollapsed && <Tooltip id="recipes" place="right" />}
              </NavLink>
              <NavLink
                data-tooltip-id="menu"
                data-tooltip-content="Menu"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2  ${
                    isActive
                      ? "bg-white font-bold text-blue-700 rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/app/menu"
              >
                <MdOutlineRestaurantMenu size={28} />
                {!isCollapsed && <span>Menu</span>}
                {isCollapsed && <Tooltip id="account" place="right" />}
              </NavLink>
              <NavLink
                data-tooltip-id="report"
                data-tooltip-content="Report"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2  ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/app/report"
              >
                <HiOutlineDocumentReport size={24} />
                {!isCollapsed && <span>Report</span>}
                {isCollapsed && <Tooltip id="report" place="right" />}
              </NavLink>

              <NavLink
                data-tooltip-id="settings"
                data-tooltip-content="Settings"
                className={({ isActive }) =>
                  `flex items-center justify-start gap-5 mb-2 px-4 py-2   ${
                    isActive
                      ? "bg-white font-bold text-blue-700  rounded-lg"
                      : "text-white hover:bg-white/30"
                  }`
                }
                to="/app/settings"
              >
                <IoSettingsOutline size={24} />
                {!isCollapsed && <span>Settings</span>}
                {isCollapsed && <Tooltip id="settings" place="right" />}
              </NavLink>

              <div className="flex flex-col gap-3 pb-6 md:pt-6 xl:pt-0 ">
                <NavLink
                  data-tooltip-id="account"
                  data-tooltip-content="Account"
                  className={({ isActive }) =>
                    `flex items-center justify-start gap-5 mb-2 mt-4 px-4 py-2  ${
                      isActive
                        ? "bg-white font-bold text-blue-700 rounded-lg"
                        : "text-white hover:bg-white/30"
                    }`
                  }
                  to="/app/account"
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
              isCollapsed
                ? "xl:ml-[5%] md:ml-[10%] lg:ml-[11%] "
                : "xl:ml-[17%] md:ml-[22%] lg:ml-[24%]"
            }`}
          >
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/subrecipes" element={<SubRecipes />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/report" element={<Report />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/newsubrecipe" element={<NewSub />} />
              <Route path="/newrecipe" element={<NewRecipe />} />
              <Route path="/stocksubrecipe" element={<SubRecipesStock />} />
              <Route path="/account" element={<Account />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/newmenu" element={<AddNewMenu />} />
            </Routes>
          </main>
        </div>
      )}
    </>
  );
}

export default App;
