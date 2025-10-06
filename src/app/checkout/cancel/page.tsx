import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";

const CheckoutCancelPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto py-16 px-5 text-center">
        <Image
          src="/illustration.svg"
          alt="Cancel"
          width={240}
          height={240}
          className="mx-auto"
        />
        <h1 className="mt-6 text-2xl font-semibold">Pagamento cancelado</h1>
        <p className="mt-3 text-muted-foreground">
          Seu pagamento foi cancelado. Você pode revisar seu carrinho ou tentar
          novamente.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/cart/identification" className="rounded-full bg-primary px-4 py-2 text-white">
            Ver carrinho
          </Link>
          <Link href="/" className="rounded-full border px-4 py-2">
            Voltar para a loja
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutCancelPage;
