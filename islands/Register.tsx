import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { deleteUser, getName, register } from "../utils/api.ts";

const userId = IS_BROWSER ? localStorage.getItem("user_id") : null;

interface RegisterProps {
  token: string;
}

export default function Register(props: RegisterProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [hasRegistered, setHasRegistered] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userId) {
      setHasRegistered(false);
      doRegister();
      return;
    }

    getName(userId).then((res) => {
      if (typeof res.name === "string") {
        setHasRegistered(true);
      } else {
        setHasRegistered(false);
        doRegister();
      }
    }).catch((error) => {
      console.error(error);
      setErrorMessage("ユーザー情報取得に失敗しました。");
    });
  }, []);

  async function doRegister() {
    console.log("doRegister");

    try {
      const res = await register(props.token);
      if (res.success && res.userId) {
        localStorage.setItem("user_id", res.userId);
        setIsRegistered(true);
        setTimeout(() => {
          location.href = "/";
        }, 3000);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error(error);
      setIsRegistered(false);
    }
  }

  async function doDeleteAndRegisterUser() {
    if (!userId) {
      return;
    }

    try {
      const res = await deleteUser(userId, props.token);
      if (res.success) {
        doRegister();
      } else {
        setErrorMessage("ユーザー削除に失敗しました。");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("ユーザー削除に失敗しました。");
    }
  }

  return (
    <div class="grow flex flex-col items-center justify-center">
      <div class="text-right">
        {errorMessage
          ? (
            <div class="text-red-700 text-center">
              {errorMessage}
            </div>
          )
          : isRegistered
          ? "ユーザー登録が完了しました。3秒後にトップページに移動します。"
          : hasRegistered
          ? (
            <>
              既にユーザー登録されています。<br />
              <button
                class="inline-block p-1 mt-4 rounded text-white bg-rose-500 hover:bg-rose-400"
                onClick={doDeleteAndRegisterUser}
              >
                削除して新しいユーザーを登録
              </button>
              <br />
              <a
                href="/"
                class="inline-block p-1 mt-4 rounded text-white bg-lime-600 hover:bg-lime-500"
              >
                ホームに戻る
              </a>
            </>
          )
          : "ユーザー登録中..."}
      </div>
    </div>
  );
}
