import { Handlers } from "$fresh/server.ts";

import { createCommonResponse } from "https://deno.land/std@0.187.0/http/util.ts";
import { Status } from "https://deno.land/std@0.187.0/http/http_status.ts";

import { deleteUser, getUserName } from "../../utils/kv.ts";
import { ApiResponse, DeleteApiRequest } from "../../utils/types.d.ts";

const ACCESS_TOKEN = Deno.env.get("ACCESS_TOKEN");

export const handler: Handlers = {
  async POST(req) {
    const { token, userId }: DeleteApiRequest = await req.json();

    if (
      typeof userId !== "string" || typeof token !== "string" ||
      token !== ACCESS_TOKEN
    ) {
      return createCommonResponse(Status.Forbidden);
    }

    // ユーザー削除
    const userName = await getUserName(userId);
    const success = await deleteUser(userId);
    if (success) {
      console.log(userName, "さんのアカウントが削除されました");
    } else {
      console.log(userName, "さんのアカウントの削除に失敗しました");
    }

    const res: ApiResponse = { success };
    return Response.json(res);
  },
};
