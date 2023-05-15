import { Handlers } from "$fresh/server.ts";

import { createCommonResponse } from "https://deno.land/std@0.187.0/http/util.ts";
import { Status } from "https://deno.land/std@0.187.0/http/http_status.ts";

import { getUserName } from "../../utils/kv.ts";
import { GetNameApiResponse } from "../../utils/types.d.ts";

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("user_id");

    if (typeof userId !== "string") {
      return createCommonResponse(Status.Forbidden);
    }

    const name = await getUserName(userId);
    const res: GetNameApiResponse = { success: true, name };
    return Response.json(res);
  },
};
