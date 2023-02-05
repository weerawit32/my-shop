import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import AuthProvider from "@/context/authContext";
import CartContextProvider from "@/context/cartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartContextProvider>
    </AuthProvider>
  );
}
