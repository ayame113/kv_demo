import { useEffect, useState } from "preact/hooks";

import { close } from "../utils/api.ts";

export default function Open() {
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setSuccess(false);
      return;
    }
    close(userId).then((res) => {
      if (res.success) {
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
        ? "施錠中です..."
        : success
        ? "施錠しました。3秒後にトップページに移動します。"
        : "施錠に失敗しました。"}
    </div>
  );
}
