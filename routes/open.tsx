import { Head } from "$fresh/runtime.ts";
import Open from "../islands/Open.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>KV DEMO</title>
      </Head>
      <Open />
    </>
  );
}
