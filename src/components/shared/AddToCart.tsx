"use client";
import { useCartStore } from "@/lib/cart-store";
import { toast } from "sonner";
import { Button } from "../ui/button";
interface IAddToCartProps {
  courseId: string;
  title: string;
  slug: string;
  thumbnailUrl: string | null;
  price: number | null;
  instructorName: string | null;
}
const AddToCart = ({
  courseId,
  title,
  slug,
  thumbnailUrl,
  price,
  instructorName,
}: IAddToCartProps) => {
  const { addItem } = useCartStore((state) => state);
  const addToCartHandler = () => {
    const result = addItem({
      id: courseId,
      title,
      slug,
      image: thumbnailUrl,
      price,
      instructor: instructorName,
    });
    if (result.success) {
      toast.success(`${result.message}`, {
        richColors: true,
      });
      return;
    } else {
      toast.warning(`${result.message}`, {
        richColors: true,
      });
      return;
    }
  };
  return <Button onClick={() => addToCartHandler()}>شرکت در دوره</Button>;
};

export default AddToCart;
