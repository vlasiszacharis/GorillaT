import { BASE_URL } from "../config/BaseUrl";
import axios from "axios";
import {
  StockItem,
  PricedSubRecipeModel,
  DeleteStockItemProps,
  Supplier,
  PricedSubRecipeModelUnique,
} from "../../types/apiClientTypes";
import {
  DeleteItemProps,
  Ingredient,
} from "../../pages/Inventory/inventoryTypes";
//Suppliers , "Suppliers"

export const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await axios.get(`${BASE_URL}/api/v1/suppliers`);
  return response.data;
};

export const deleteSupplier = async (supplier_afm: number) => {
  const response = await axios.delete(
    `${BASE_URL}/api/v1/suppliers/${supplier_afm}`
  );
  return response.data;
};

export const editSupplier = async (editedSupplier: any) => {
  const response = await axios.put(
    `${BASE_URL}/api/v1/suppliers`,
    editedSupplier
  );
  return response.data;
};

export const postSuppliers = async (newSupplier: any) => {
  const { data } = await axios.post(
    `${BASE_URL}/api/v1/suppliers`,
    newSupplier
  );
  return data;
};
//Stock Items , "StockItem"
export const getStockItems = async (): Promise<StockItem[]> => {
  const response = await axios.get<StockItem[]>(
    `${BASE_URL}/api/v1/stock/items`
  );
  return response.data;
};

export const postStockItems = async (
  stockItem: StockItem
): Promise<StockItem> => {
  const response = await axios.post<StockItem>(
    `${BASE_URL}/api/v1/stock/items`,
    stockItem
  );
  return response.data;
};
export const putStockItem = async (
  stockItem: StockItem
): Promise<StockItem> => {
  const response = await axios.put<StockItem>(
    `${BASE_URL}/api/v1/stock/items`,
    stockItem
  );
  return response.data;
};

export const deleteStockItem = async ({
  item_supplier_name,
  item_supplier_code,
}: DeleteStockItemProps) => {
  const response = await axios.delete(
    `${BASE_URL}/api/v1/stock/items/${item_supplier_name}/${item_supplier_code}`
  );
  return response.data;
};
//Inventory  ,"Items"
export const getItems = async (): Promise<Ingredient[]> => {
  const response = await axios.get<Ingredient[]>(`${BASE_URL}/api/v1/items`);
  return response.data;
};

export const postItem = async (addItem: any): Promise<Ingredient> => {
  const response = await axios.post(`${BASE_URL}/api/v1/items`, addItem);
  return response.data;
};

export const putItem = async (editItem: any): Promise<Ingredient> => {
  const response = await axios.put(`${BASE_URL}/api/v1/items`, editItem);
  return response.data;
};
export const deleteItem = async ({
  item_supplier_name,
  item_supplier_code,
}: DeleteItemProps) => {
  const response = await axios.delete(
    `${BASE_URL}/api/v1/items/${item_supplier_name}/${item_supplier_code}`
  );
  return response.data;
};
//Sub-Recipes  , "SubRecipes"
export const postSubRecipe = async (
  event: any
): Promise<PricedSubRecipeModel[]> => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/recipes/subrecipes/priced`,
    event
  );
  return response.data;
};

export const getSubRecipes = async (): Promise<
  PricedSubRecipeModelUnique[]
> => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/recipes/subrecipes/priced`
  );
  return response.data;
};

export const getSubRecipe = async (
  id: number
): Promise<PricedSubRecipeModelUnique> => {
  const response = await axios.get(
    `${BASE_URL}/api/v1/recipes/subrecipes/priced/${id}`
  );
  return response.data;
};

export const postSubRecipeID = async (id: number) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/recipes/subrecipes/priced${id}`
  );
  return response.data;
};

//Stock Sub Recipe
export const getStockSubRecipe = async () => {
  const response = await axios.get(`${BASE_URL}/api/v1/stock/subrecipes`);
  return response.data;
};

//Sign up  , 'SignUp'
export const postSignUp = async (postUser: any) => {
  const config = {
    headers: {
      // Example headers
      "Content-Type": "application/json",
      Authorization: "Bearer yourTokenHere", // If you need to send a token
      // Add other headers here as needed
    },
  };

  const response = await axios.post(
    `${BASE_URL}/api/v1/users/signup`,
    postUser,
    config
  );
  return response.data;
};

//Sign In  , 'SignIn'
export const postSignIn = async (postUser: any) => {
  const config = {
    headers: {
      // Example headers
      "Content-Type": "application/json",
      Authorization: "Bearer yourTokenHere", // If you need to send a token
      // Add other headers here as needed
    },
  };

  const response = await axios.post(
    `${BASE_URL}/api/v1/users/signup`,
    postUser,
    config
  );
  return response.data;
};
