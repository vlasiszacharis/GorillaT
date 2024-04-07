import { Dashboard, Menu, Settings } from "@mui/icons-material";
import { Routes, Route } from "react-router-dom";
import AuthenticatedLayout from "./pages/Layout/AuthenticatedLayout";
import SignUp from "./pages/SignUser/SignUp/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Inventory from "./pages/Inventory/Inventory";
import Account from "./pages/Account/Account";
import Ingredients from "./pages/Ingredients/Ingredients";
import NewRecipe from "./pages/Recipes/NewRecipe/NewRecipe";
import Recipes from "./pages/Recipes/Recipes";
import Stock from "./pages/Stock/Stock";
import NewSub from "./pages/SubRecipes/NewSubRecipe/NewSub";
import SubRecipes from "./pages/SubRecipes/SubRecipes";
import SubRecipesStock from "./pages/SubRecipes/SubRecipesStock/SubRecipesStock";
import Suppliers from "./pages/Suppliers/Suppliers";
import Report from "./pages/Report/Report";
import SignIn from "./pages/SignUser/SignIn/SignIn";
import AddNewMenu from "./pages/Menu/AddNewMenu";
const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<AuthenticatedLayout />}>
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/newmenu" element={<AddNewMenu />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
