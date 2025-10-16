"use client";
import { useCartStore } from "@/lib/cart-store";
import CartItem from "./CartItem";
import EmptyCart from "@/components/shared/EmptyCart";

const CartItemContainer = () => {
  const { items, itemCount, removeItem } = useCartStore((state) => state);
  return (
    <ul className="px-5 space-y-5">
      {items && itemCount <= 0 ? (
        <EmptyCart />
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeItem} />
          ))}
        </>
      )}
    </ul>
  );
};

export default CartItemContainer;
