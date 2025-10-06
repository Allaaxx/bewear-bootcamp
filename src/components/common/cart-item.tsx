import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const decreaseCartProductQuantityMutation = useDecreaseCartProduct(id);
  const increaseCartProductQuantityMutation =
    useIncreaseCartProduct(productVariantId);
  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.");
      },
    });
  };
  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto diminuida.");
      },
    });
  };
  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Quantidade do produto aumentada.");
      },
    });
  };
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="flex min-w-0 items-start gap-4 md:items-center">
        <div className="bg-muted relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={productVariantImageUrl}
            alt={productVariantName}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="truncate text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground truncate text-xs font-medium">
            {productVariantName}
          </p>
          <div className="mt-2 flex w-[100px] items-center justify-between rounded-lg border p-1 md:mt-0">
            <Button
              className="h-6 w-6"
              variant="ghost"
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-6 w-6"
              variant="ghost"
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-2 md:w-auto md:flex-col md:items-end md:justify-center">
        <div className="flex items-center gap-3 md:flex-col md:items-end">
          <p className="text-sm font-bold">
            {formatCentsToBRL(productVariantPriceInCents)}
          </p>
          <p className="text-muted-foreground text-xs">qty {quantity}</p>
        </div>
        <Button variant="outline" size="icon" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
