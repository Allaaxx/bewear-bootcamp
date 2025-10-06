import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="container mx-auto space-y-6">
        <div className="px-5">
          <div className="bg-muted relative aspect-[3/1] w-full overflow-hidden rounded-md md:aspect-[4/1]">
            <Image
              src="/banner-01.png"
              alt="Leve uma vida com estilo"
              fill
              className="object-contain p-4"
            />
          </div>
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <div className="bg-muted relative aspect-[3/1] w-full overflow-hidden rounded-md md:aspect-[4/1]">
            <Image
              src="/banner-02.png"
              alt="Leve uma vida com estilo"
              fill
              className="object-contain p-4"
            />
          </div>
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
      </div>
      <Footer />
    </>
  );
};

export default Home;
