import { useMemo } from "react";

const useSubRecipeCalculate = (subs: any): any => {
  const itemsWithPricePerUnit = useMemo(() => {
    return subs
      ? subs.map(
          (item: {
            priced_sub_recipe_quantity: number;
            priced_sub_recipe_food_cost: number;
          }) => ({
            ...item,
            priced_sub_recipe_pricePerUnit:
              item.priced_sub_recipe_quantity > 0
                ? item.priced_sub_recipe_food_cost /
                  item.priced_sub_recipe_quantity
                : "N/A",
          })
        )
      : [];
  }, [subs]);

  return itemsWithPricePerUnit;
};
export default useSubRecipeCalculate;
