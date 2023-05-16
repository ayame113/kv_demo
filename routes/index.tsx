import { Head } from "$fresh/runtime.ts";
import Main from "../islands/Main.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>スマートロック デモ</title>
        <meta name="description" content="スマートロックのデモ" />
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
      <div class="h-screen w-full text-xl bg-slate-50 text-slate-900">
        <Main />
      </div>
    </>
  );
}
