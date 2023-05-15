import { Head } from "$fresh/runtime.ts";
import Close from "../islands/Close.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>KV DEMO</title>
      </Head>
      <Close />
    </>
  );
}
