import { Header } from "@/components/common/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

const Authentication = async () => {
  return (
    <>
      <Header />

      <div className="container mx-auto px-5 py-8">
        <div className="mx-auto max-w-4xl rounded-lg bg-white/50 p-6 shadow-md backdrop-blur-md md:grid md:grid-cols-2 md:items-start md:gap-8">
          <div className="md:col-span-1">
            <Tabs defaultValue="sign-in">
              <TabsList className="mb-4">
                <TabsTrigger value="sign-in">Entrar</TabsTrigger>
                <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
              </TabsList>
              <div className="space-y-4">
                <TabsContent value="sign-in" className="w-full">
                  <SignInForm />
                </TabsContent>
                <TabsContent value="sign-up" className="w-full">
                  <SignUpForm />
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <aside className="hidden md:flex md:flex-col md:justify-center md:gap-4 md:col-span-1 px-2">
            <h3 className="text-xl font-semibold">Bem-vindo de volta</h3>
            <p className="text-sm text-muted-foreground">
              Faça login para acessar seu carrinho, acompanhar pedidos e
              acelerar o checkout. Se ainda não tem conta, crie uma em poucos
              passos.
            </p>

            <ul className="mt-4 space-y-2 list-inside list-disc text-sm text-muted-foreground">
              <li>Salve endereços e formas de pagamento</li>
              <li>Acompanhe pedidos em tempo real</li>
              <li>Receba ofertas exclusivas</li>
            </ul>

            <div className="mt-6">
              <p className="text-xs text-muted-foreground">Ainda não tem certeza?</p>
              <p className="text-sm">Explore nossos produtos sem compromisso.</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Authentication;
