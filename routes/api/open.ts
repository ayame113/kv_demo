import { Handlers } from "$fresh/server.ts";

import { createCommonResponse } from "https://deno.land/std@0.187.0/http/util.ts";
import { Status } from "https://deno.land/std@0.187.0/http/http_status.ts";

import { getUserName, hasUser } from "../../utils/kv.ts";
import { ApiResponse } from "../../utils/types.d.ts";

export const handler: Handlers = {
  async POST(req) {
    const { userId } = await req.json();

    if (typeof userId !== "string") {
      return createCommonResponse(Status.Forbidden);
    }

    if (!await hasUser(userId)) {
      return createCommonResponse(Status.Forbidden);
    }

    // TODO: 解錠処理
    console.log(await getUserName(userId), "さんが解錠しました");
    const res: ApiResponse = { success: true };
    return Response.json(res);
  },
};
