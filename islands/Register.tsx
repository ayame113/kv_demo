import { useEffect, useState } from "preact/hooks";

import { deleteUser, register } from "../utils/api.ts";

interface RegisterProps {
  token: string;
}

export default function Register(props: RegisterProps) {
  const [success, setSuccess] = useState<boolean | null>(null);
  const [previousUserId, setPreviousUserId] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const initUserId = localStorage.getItem("user_id");

    if (initUserId) {
      setPreviousUserId(initUserId);
      return;
    }

    doRegister();
  }, []);

  async function doRegister() {
    console.log("doRegister");
    const token = props.token;

    const res = await register(token);
    if (res.success && res.userId) {
      localStorage.setItem("user_id", res.userId);
      setSuccess(true);
      setTimeout(() => {
        location.href = "/";
      }, 3000);
    } else {
      setSuccess(false);
    }
  }

  async function doDeleteUser() {
    if (!previousUserId) {
      return;
    }

    const res = await deleteUser(previousUserId, props.token);
    setDeleteSuccess(res.success);
    if (res.success) {
      doRegister();
    }
  }

  return (
    <div>
      {success === true
        ? "ユーザー登録が完了しました。3秒後にトップページに移動します。"
        : success === false
        ? "ユーザー登録が失敗しました。"
        : deleteSuccess === false
        ? "ユーザー削除に失敗しました。"
        : previousUserId !== null
        ? (
          <>
            既にユーザー登録されています。削除して新しいユーザーを登録しますか？
            <button
              class="p-1 m-2 bg-gray-200"
              onClick={doDeleteUser}
            >
              削除
            </button>
          </>
        )
        : "ユーザー登録中..."}
    </div>
  );
}
