// ON PEUT IMPORT LE CSS QUE ICI
import "@/styles/index.scss";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { Toaster } from "react-hot-toast";

import { DarkLightProvider } from "@/context/themeContext";
import Layout from "@/components/layout/Layout";

// pour utiliser apollo
const client = new ApolloClient({
  uri: "http://localhost:4000",
  credentials: "include",
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // utilisation de apollo
    <ApolloProvider client={client}>
      <Head>
        <title>Parkour</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/Icon-White.svg" />
      </Head>

      {/* contexte du thème de couleur */}
      <DarkLightProvider>
        {/* Layout => sur toutes les pages (navbar et footer) */}
        <Layout>
          {/* dépendance pour faire des toast */}
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 5000,
            }}
          />
          {/* la page que l'on va voir */}
          <Component {...pageProps} />
        </Layout>
      </DarkLightProvider>
    </ApolloProvider>
  );
}
