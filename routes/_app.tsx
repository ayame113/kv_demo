import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        {/* Copyright 2018 Twitter, Inc and other contributors. Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/ */}
        <link rel="icon" type="image/png" href="https://favi.deno.dev/🔐.png" />
        <link rel="apple-touch-icon" href="https://favi.deno.dev/🔐.png" />
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
