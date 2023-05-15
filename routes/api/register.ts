import { Handlers } from "$fresh/server.ts";

import { createCommonResponse } from "https://deno.land/std@0.187.0/http/util.ts";
import { Status } from "https://deno.land/std@0.187.0/http/http_status.ts";

import { registerUser } from "../../utils/kv.ts";
import {
  RegisterApiRequest,
  RegisterApiResponse,
} from "../../utils/types.d.ts";

const ACCESS_TOKEN = Deno.env.get("ACCESS_TOKEN");

export const handler: Handlers = {
  async POST(req) {
    const { token }: RegisterApiRequest = await req.json();

    if (typeof token !== "string" || token !== ACCESS_TOKEN) {
      return createCommonResponse(Status.Forbidden);
    }

    // ユーザー追加
    // 名前の初期値はIDそのまま
    const userId = crypto.randomUUID();
    const success = await registerUser(userId);

    if (success) {
      console.log(userId, "さんのアカウントが追加されました");
    } else {
      console.log(userId, "さんのアカウントの追加に失敗しました");
    }

    const res: RegisterApiResponse = {
      success,
      userId: success ? userId : null,
    };
    return Response.json(res);
  },
};
