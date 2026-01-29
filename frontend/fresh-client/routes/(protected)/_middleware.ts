import { define } from "@/utils/mod.ts";
import { getCookies } from "@std/http/cookie";

export default define.middleware((ctx) => {
	const req = ctx.req;
	const cookies = getCookies(req.headers);
	const jwt = cookies.access_token;
	if (!jwt || jwt.trim().length === 0) {
		return Response.redirect(new URL("/", req.url), 302);
	}

	return ctx.next();
});
