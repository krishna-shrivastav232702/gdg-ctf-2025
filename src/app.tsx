import Head from "next/head";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CodeSprint3.0</title> {/* Change this to your desired title */}
        <meta
          name="CodeSprint3.0"
          content="GDSC NMIT's CodeSprint 3.0 Capture The Flag"
        />
        <link rel="icon" href="../../public/gdgnmit_logo.webp" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
