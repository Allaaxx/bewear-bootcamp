import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";

const CheckoutSuccessPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-5 py-16 text-center">
        <Image
          src="/illustration.svg"
          alt="Success"
          width={240}
          height={240}
          className="mx-auto"
        />
        <h1 className="mt-6 text-2xl font-semibold">Pedido efetuado!</h1>
        <p className="text-muted-foreground mt-3">
          Obrigado pela sua compra. Seu pedido foi realizado com sucesso.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/my-orders"
            className="bg-primary rounded-full px-4 py-2 text-white"
          >
            Meus pedidos
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

export default CheckoutSuccessPage;
