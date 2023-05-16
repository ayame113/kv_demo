import { Head } from "$fresh/runtime.ts";
import { Footer } from "../components/Footer.tsx";
import Register from "../islands/Register.tsx";

const ACCESS_TOKEN = Deno.env.get("ACCESS_TOKEN");

import { Handler } from "$fresh/server.ts";

import { createCommonResponse } from "https://deno.land/std@0.187.0/http/util.ts";
import { Status } from "https://deno.land/std@0.187.0/http/http_status.ts";

export const handler: Handler = (req, ctx) => {
  const url = new URL(req.url);

  const token = url.searchParams.get("token");

  if (token !== ACCESS_TOKEN) {
    return createCommonResponse(Status.Forbidden);
  }

  return ctx.render();
};

export default function Home() {
  if (!ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN is undefined.");
  }
  return (
    <>
      <Head>
        <title>ユーザー登録</title>
      </Head>
      <main class="flex flex-col min-h-screen bg-sky-100 text-slate-900">
        <Register token={ACCESS_TOKEN} />
        <Footer />
      </main>
    </>
  );
}
