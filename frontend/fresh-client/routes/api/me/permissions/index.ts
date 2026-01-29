import { define } from "@/utils/mod.ts";
import { getCookies } from "@std/http";

export const handler = define.handlers({
	async GET(ctx) {
		const cookies = getCookies(ctx.req.headers);
		const accessToken = cookies["access_token"];

		if (!accessToken) {
			return new Response("Unauthorized", { status: 401 });
		}

		// Server → Gateway (NO CORS here)
		const resp = await fetch("http://gateway:8080/me/permissions", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!resp.ok) {
			return new Response("Gateway error", { status: resp.status });
		}

		const data = await resp.json();
		return Response.json(data);
	},
});
