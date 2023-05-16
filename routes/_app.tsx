import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          {...{ crossorigin: "" }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap"
          rel="stylesheet"
          media="print"
          {...{ onload: "this.media='all'" }}
        />
        <style>{":root{font-family: 'Kosugi Maru', sans-serif;}"}</style>
      </Head>
      <Component />
    </>
  );
}
