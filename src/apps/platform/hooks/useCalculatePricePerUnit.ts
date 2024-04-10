import { useMemo } from "react";

const useCalculatePricePerUnit = (items: any): any => {
  const itemsWithPricePerUnit = useMemo(() => {
    return items
      ? items.map((item: { item_quantity: number; item_price: number }) => ({
          ...item,
          item_pricePerUnit:
            item.item_quantity > 0
              ? item.item_price / item.item_quantity
              : "N/A",
        }))
      : [];
  }, [items]);

  return itemsWithPricePerUnit;
};
export default useCalculatePricePerUnit;
