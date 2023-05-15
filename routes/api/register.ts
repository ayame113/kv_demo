import { Handlers } from "$fresh/server.ts";

import { createCommonResponse } from "https://deno.land/std@0.187.0/http/util.ts";
import { Status } from "https://deno.land/std@0.187.0/http/http_status.ts";

import { registerUser } from "../../utils/kv.ts";
import { ApiResponse, RegisterApiRequest } from "../../utils/types.d.ts";

const ACCESS_TOKEN = Deno.env.get("ACCESS_TOKEN");

export const handler: Handlers = {
  async POST(req) {
    const { userId, token }: RegisterApiRequest = await req.json();

    if (typeof userId !== "string" || typeof token !== "string") {
      return createCommonResponse(Status.Forbidden);
    }

    if (token !== ACCESS_TOKEN) {
      return createCommonResponse(Status.Forbidden);
    }

    // ユーザー追加
    // 名前の初期値はIDそのまま
    const success = await registerUser(userId);
    const res: ApiResponse = { success };
    return Response.json(res);
  },
};
