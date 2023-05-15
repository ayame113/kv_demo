import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";

import { register } from "../utils/api.ts";

interface RegisterProps {
  token: string;
}

export default function Register(props: RegisterProps) {
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const userId = crypto.randomUUID();
    const token = props.token;

    if (!token) {
      setSuccess(false);
      return;
    }
    register(userId, token).then((res) => {
      if (res.success) {
        localStorage.setItem("user_id", userId);
        setSuccess(true);
        setTimeout(() => {
          location.href = "/";
        }, 3000);
      } else {
        setSuccess(false);
      }
    });
  }, []);

  return (
    <div>
      {success === null
        ? "ユーザー登録中..."
        : success
        ? "登録が完了しました。3秒後にトップページに移動します。"
        : "登録が失敗しました。"}
    </div>
  );
}
