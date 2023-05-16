import { Head } from "$fresh/runtime.ts";
import { Footer } from "../components/Footer.tsx";
import Open from "../islands/Open.tsx";

import IconLockOpen from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/lock-open.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>解錠</title>
      </Head>
      <main class="flex flex-col min-h-screen bg-lime-100 text-slate-900">
        <div class="grow flex flex-col items-center justify-center gap-4">
          <div class="w-24 h-24 p-4 bg-neutral-50 rounded-[50%]">
            <IconLockOpen class="w-full h-full text-neutral-700" />
          </div>
          <Open />
        </div>
        <Footer />
      </main>
    </>
  );
}
