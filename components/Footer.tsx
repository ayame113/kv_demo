import { JSX } from "preact";

export function Footer(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <footer {...props} class="p-2 text-right text-sm">
      <a
        href="https://github.com/ayame113/smart_lock_demo"
        target="_blank"
        class="underline text-neutral-700 hover:text-neutral-500"
      >
        GitHub
      </a>
    </footer>
  );
}
