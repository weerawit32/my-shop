import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { useState } from "react";
export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState();
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
