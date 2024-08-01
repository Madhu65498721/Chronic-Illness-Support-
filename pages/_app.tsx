import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/global.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Chronic Illness Support Chatbot</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Chronic Illness Support: Provides support for managing chronic illnesses." />
        <link rel="icon" href="/openai.svg" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default App;
