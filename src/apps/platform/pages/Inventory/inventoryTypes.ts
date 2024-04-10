export interface EditItemProps {
  setToggleEdit: Function;
  item_supplier_name: string;
  item_supplier_code: string;
}

export interface Ingredient {
  item_supplier_name: string;
  item_supplier_code: string;
  item_name: string;
  item_description: string;
  item_measurement_unit: string;
  item_category: string;
  item_quantity: any;
  item_price: any;
  item_pricePerUnit: number;
}
export interface IngredientID extends Ingredient {
  id: string;
}
export interface IngredientPost {
  type: string;
  title: string;
  supplier_code: string;
  measurement_unit: string;
  quantity: number;
}
export interface DeleteItemProps {
  item_supplier_name: string;
  item_supplier_code: string;
}
