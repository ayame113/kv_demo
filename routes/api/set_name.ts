import { Handlers } from "$fresh/server.ts";

import { createCommonResponse } from "https://deno.land/std@0.187.0/http/util.ts";
import { Status } from "https://deno.land/std@0.187.0/http/http_status.ts";

import { getUserName, setUserName } from "../../utils/kv.ts";
import { ApiResponse, SetNameApiRequest } from "../../utils/types.d.ts";

export const handler: Handlers = {
  async POST(req) {
    const { userId, name }: SetNameApiRequest = await req.json();

    if (typeof userId !== "string" || typeof name !== "string") {
      return createCommonResponse(Status.Forbidden);
    }

    const prevName = await getUserName(userId);

    if (name === prevName) {
      const res: ApiResponse = { success: true };
      return Response.json(res);
    }

    // ユーザー名変更
    // 名前の初期値はIDそのまま
    const success = await setUserName(userId, name);

    if (success) {
      console.log(prevName, "さんのアカウント名が", name, "に変更されました");
    } else {
      console.log(prevName, "さんのアカウント名の変更が失敗しました");
    }

    const res: ApiResponse = { success };
    return Response.json(res);
  },
};
