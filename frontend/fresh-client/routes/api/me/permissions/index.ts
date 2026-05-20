import { define } from "@/utils/mod.ts";
import { getCookies } from "@std/http";
import { PoliciesClient } from "@/http-clients/auth/PoliciesClient.ts";

export const handler = define.handlers({
	async GET(ctx) {
		const cookies = getCookies(ctx.req.headers);
		const accessToken = cookies["access_token"];
		const data = await PoliciesClient.getJwtPolicies(accessToken);

		return Response.json(data, {
			headers: {
				"Cache-Control": "no-store",
			},
		});
	},
});
