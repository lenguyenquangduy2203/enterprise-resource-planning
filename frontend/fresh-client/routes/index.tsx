import { Head } from "fresh/runtime";
import { challenge, define } from "../utils.ts";
import { getCookies } from "@std/http";
import PemContainer from "../islands/PemContainer.tsx";

export const handler = define.handlers({
	GET(ctx) {
		const headers = ctx.req.headers;
		const cookies = getCookies(headers);
		const accessToken = cookies["access_token"];

		// 🚨 FORCE LOGIN
		if (!accessToken) {
			const authUrl = `http://localhost:9000/oauth2/authorize` +
				`?response_type=code` +
				`&client_id=fresh-client` +
				`&redirect_uri=${
					encodeURIComponent(`http://0.0.0.0:5173/auth/callback`)
				}` +
				`&scope=openid` +
				`&state=erp` +
				"&code_challenge=" + challenge +
				"&code_challenge_method=S256";

			return Response.redirect(authUrl, 302);
		}

		return { data: {} };
	},
});

export default define.page<typeof handler>(() => {
	return (
		<>
			<Head>
				<title>ERP Home</title>
			</Head>
			<main>
				<h1>Welcome</h1>
				<p>Your permissions are:</p>
				<PemContainer />
			</main>
		</>
	);
});
