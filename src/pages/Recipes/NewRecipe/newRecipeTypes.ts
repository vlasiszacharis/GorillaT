export interface SubRecipeModel {
  quantity: number;
  food_cost: number;
  sub_recipe_id: string;
  type: "sub-recipe";
}

export type PricedIngredientModel = SimpleIngredientModel | SubRecipeModel;

export interface PricedSubRecipeModel {
  priced_sub_recipe_id: number;
  priced_sub_recipe_title: string;
  priced_sub_recipe_description: string;
  priced_sub_recipe_ingredients: PricedIngredientModel[];
  priced_sub_recipe_quantity: number;
  priced_sub_recipe_food_cost: number;
  priced_sub_recipe_pricePerUnit: number;
}
export interface PricedSubRecipeModelID extends PricedSubRecipeModel {
  id: string;
}
export interface PricedSubRecipePost {
  quantity: number;
  type: string;
  sub_recipe_id: number;
}

export interface AddItemPros {
  setToggleItem: (value: boolean) => void;
}
export interface SimpleIngredientModel {
  quantity: number;
  food_cost: number;
  title: string;
  supplier_code: string;
  measurement_unit: string;
  type: "ingredient";
}
