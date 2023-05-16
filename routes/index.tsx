import { Head } from "$fresh/runtime.ts";
import { Footer } from "../components/Footer.tsx";
import Main from "../islands/Main.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>スマートロック デモ</title>
        <meta name="description" content="スマートロックのデモ" />
      </Head>
      <main class="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <Main />
        <Footer />
      </main>
    </>
  );
}
