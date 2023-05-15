import { useEffect, useState } from "preact/hooks";

import { open } from "../utils/api.ts";

export default function Open() {
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setSuccess(false);
      return;
    }
    open(userId).then((res) => {
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
        ? "解錠中です..."
        : success
        ? "解錠しました。3秒後にトップページに移動します。"
        : "解錠に失敗しました。"}
    </div>
  );
}
