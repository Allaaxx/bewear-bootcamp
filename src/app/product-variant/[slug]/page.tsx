import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-col space-y-6">
        <div className="px-5 md:px-8">
          <div className="md:grid md:grid-cols-2 md:items-start md:gap-8">
            <div className="order-1 md:order-1 px-5 ">
              <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden rounded-md md:aspect-[16/12]">
                <Image
                  src={productVariant.imageUrl}
                  alt={productVariant.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="mt-4 ">
                <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
                
              />
              </div>
            </div>

            <div className="order-2 mt-4 flex flex-col gap-4 md:mt-0">
              <div className="px-5 ">
                <h2 className="text-lg font-semibold">
                  {productVariant.product.name}
                </h2>
                <h3 className="text-muted-foreground text-sm">
                  {productVariant.name}
                </h3>
                <h3 className="mt-2 text-lg font-semibold">
                  {formatCentsToBRL(productVariant.priceInCents)}
                </h3>
              </div>

              <ProductActions productVariantId={productVariant.id} />

              <div className="px-5">
                <p className="text-shadow-amber-600">
                  {productVariant.product.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 md:px-8">
          <ProductList title="Talvez você goste" products={likelyProducts} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductVariantPage;
