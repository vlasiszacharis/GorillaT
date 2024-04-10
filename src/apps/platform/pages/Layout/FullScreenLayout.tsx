import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";
import { Dashboard, Inventory, Settings, Menu } from "@mui/icons-material";
import Account from "../Account/Account";
import Ingredients from "../Ingredients/Ingredients";
import NewRecipe from "../Recipes/NewRecipe/NewRecipe";
import Recipes from "../Recipes/Recipes";
import SignUp from "../SignUser/SignUp/SignUp";
import Stock from "../Stock/Stock";
import NewSub from "../SubRecipes/NewSubRecipe/NewSub";
import SubRecipes from "../SubRecipes/SubRecipes";
import SubRecipesStock from "../SubRecipes/SubRecipesStock/SubRecipesStock";
import Suppliers from "../Suppliers/Suppliers";
import Report from "../Report/Report";
function App() {
  return (
    <>
      <main>
        <Routes>
          <Route element={<PrivateRoute />}>
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
          </Route>
          <Route path="/login" element={<SignUp />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
