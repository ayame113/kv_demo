import type { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

import IconLock from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/lock.tsx";
import IconLockOpen from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/lock-open.tsx";
import IconQuestionMark from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/question-mark.tsx";

import { close, getName, open, setName, status } from "../utils/api.ts";

const userId = IS_BROWSER ? localStorage.getItem("user_id") : null;

export default function Main() {
  // nullのとき未初期化
  const [userName, setUserName] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState<boolean | null>(null);

  // 初期化時に実行
  useEffect(() => {
    // ユーザーID、ユーザー名の確認
    if (!userId) {
      setErrorMessage("利用にはユーザー登録が必要です");
      return;
    }
    getName(userId).then((res) => {
      if (typeof res.name === "string") {
        setUserName(res.name);
      } else {
        setErrorMessage("利用にはユーザー登録が必要です");
      }
    }).catch((error) => {
      setErrorMessage(`${error}`);
    });

    // 鍵の状態の確認
    updateStatus();
    const intervalId = setInterval(() => {
      updateStatus();
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessage(null);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [message]);

  function onInput(e: JSX.TargetedEvent<HTMLInputElement, Event>) {
    const name = e.currentTarget.value;
    setUserName(name);
    if (!userId) {
      return;
    }
    setName(userId, name).then((res) => {
      if (res.success) {
        setMessage("ユーザー名を変更しました");
      } else {
        setErrorMessage("ユーザー名の変更に失敗しました");
      }
    }).catch((error) => {
      setErrorMessage(`${error}`);
    });
  }

  async function onOpen() {
    if (!userId) {
      return;
    }
    setMessage("解錠中...");
    try {
      const res = await open(userId);
      if (res.success) {
        setIsLocked(false);
        setMessage("解錠しました");
      } else {
        setMessage(null);
        setErrorMessage("解錠に失敗しました");
      }
    } catch (error) {
      setMessage(null);
      setErrorMessage(`${error}`);
    }
  }

  async function onClose() {
    if (!userId) {
      return;
    }
    setMessage("施錠中...");
    try {
      const res = await close(userId);
      if (res.success) {
        setIsLocked(true);
        setMessage("施錠しました");
      } else {
        setMessage(null);
        setErrorMessage("施錠に失敗しました");
      }
    } catch (error) {
      setMessage(null);
      setErrorMessage(`${error}`);
    }
  }

  async function updateStatus() {
    if (!userId) {
      return;
    }
    try {
      const res = await status(userId);
      if (res.success) {
        setIsLocked(res.locked);
      } else {
        setIsLocked(null);
        setErrorMessage("鍵の状態が取得できませんでした");
      }
    } catch (error) {
      setIsLocked(null);
      setErrorMessage(`${error}`);
    }
  }

  const buttonClass =
    "block px-1 py-12 rounded grow flex justify-center items-center text-xl text-white font-bold";

  return (
    <div class="grow w-full h-full max-w-lg mx-auto p-4 flex flex-col items-center justify-center gap-4 [&>*]:w-full">
      <div>
        <div
          class={`h-36 w-36 py-3 m-auto rounded-[50%] flex flex-col gap-2 transition-colors duration-500 ${
            isLocked === true
              ? "bg-rose-100"
              : isLocked === false
              ? "bg-lime-100"
              : "bg-orange-100"
          }`}
        >
          <div class="text-sm text-center">現在の状態</div>
          {isLocked === true
            ? <IconLock class="w-full h-full mx-auto grow text-neutral-700" />
            : isLocked === false
            ? (
              <IconLockOpen class="w-full h-full mx-auto grow text-neutral-700" />
            )
            : (
              <IconQuestionMark class="w-full h-full mx-auto grow text-neutral-700" />
            )}
          <div class="text-sm text-center">
            {isLocked === true ? "施錠" : isLocked === false ? "解錠" : "不明"}
          </div>
        </div>
      </div>
      <div
        class={`transition-opacity duration-200 p-1 border-2 border-sky-600 rounded bg-sky-50 text-sky-500 text-lg text-center ${
          message ? "opacity-1" : "opacity-0"
        }`}
      >
        {message ?? "　"}
      </div>
      <label>
        <div class="text-left text-sm">ユーザー名</div>
        <div>
          <input
            type="text"
            value={userName || ""}
            disabled={errorMessage !== null}
            class="w-full p-1 rounded text-center border-2 border-neutral-200 bg-neutral-100 focus:bg-white"
            onChange={onInput}
          />
        </div>
        <div class="text-right text-sm">さん</div>
      </label>
      <div class="flex justify-center gap-4">
        <button
          class={`${buttonClass} bg-lime-600 hover:bg-lime-500`}
          onClick={onOpen}
          disabled={errorMessage !== null}
        >
          <IconLockOpen class="w-5 h-5" />
          <span>解錠</span>
        </button>
        <button
          class={`${buttonClass} bg-rose-500 hover:bg-rose-400`}
          onClick={onClose}
          disabled={errorMessage !== null}
        >
          <IconLock class="w-5 h-5" />
          施錠
        </button>
      </div>
      {errorMessage && (
        <div class="p-1 border-2 border-red-700 rounded bg-rose-50 text-red-700 text-lg text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
