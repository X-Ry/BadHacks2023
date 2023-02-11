import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";
import { MyProfileProvider } from "../utils/context/myProfileContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS TailwindCSS TypeScript Starter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MyProfileProvider>
        <Component {...pageProps} />
      </MyProfileProvider>
    </>
  );
}

export default MyApp;
