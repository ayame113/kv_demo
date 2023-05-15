import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { close, getName, open, setName } from "../utils/api.ts";

const userId = IS_BROWSER ? localStorage.getItem("user_id") : null;

export default function Main() {
  // nullのとき未初期化
  const [userName, setUserName] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!userId) {
      console.error("userId is undefined.");
      setIsError(true);
      return;
    }
    getName(userId).then((res) => {
      if (typeof res.name === "string") {
        setUserName(res.name);
      } else {
        console.error("res.name", res.name, "is not string.");
        setIsError(true);
      }
    }).catch((error) => {
      console.error(error);
      setIsError(true);
    });
  }, []);

  useEffect(() => {
    if (!userId || userName === null) {
      return;
    }
    setName(userId, userName);
  }, [userName]);

  return (
    <div>
      {isError && <div>ユーザー登録をしてください。</div>}
      <div>
        <input
          type="text"
          value={userName || ""}
          disabled={isError}
          class="p-1 rounded text-center bg-neutral-100 focus:bg-white"
          onChange={(e) => setUserName(e.currentTarget.value)}
        />
      </div>
      <div class="text-right text-sm">さん</div>
      <div class="flex justify-center mt-6">
        <button
          class="block p-1 rounded grow text-white bg-emerald-400 hover:bg-emerald-300"
          onClick={() => userId && open(userId)}
          disabled={isError}
        >
          解錠
        </button>
        <button
          class="block ml-4 p-1 rounded grow text-white bg-rose-400 hover:bg-rose-300"
          onClick={() => userId && close(userId)}
          disabled={isError}
        >
          施錠
        </button>
      </div>
    </div>
  );
}
