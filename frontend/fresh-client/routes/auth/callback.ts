import { define, verifier } from "../../utils.ts";
import { setCookie } from "@std/http";
import { CallbackController } from "../../controllers/auth/OAuth2CallbackController.ts";

export const handler = define.handlers({
	GET: CallbackController(async (code, url) => {
		if (!code) {
			return new Response("Missing code", { status: 400 });
		}

		// Exchange code for token
		const tokenResponse = await fetch(
			`http://auth-server:9000/oauth2/token`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: "Basic " +
						btoa(
							`fresh-client:fresh123`,
						),
				},
				body: new URLSearchParams({
					grant_type: "authorization_code",
					client_id: "fresh-client",
					code,
					redirect_uri: "http://0.0.0.0:5173/auth/callback",
					code_verifier: verifier,
				}),
			},
		);

		const token = await tokenResponse.json();

		if (!token.access_token) {
			return new Response("Token exchange failed", { status: 401 });
		}

		// Store token in cookie (HttpOnly!)
		const headers = new Headers();
		setCookie(headers, {
			name: "access_token",
			value: token.access_token,
			httpOnly: true,
			sameSite: "Lax",
			secure: false, // true in prod
			path: "/",
		});

		// Redirect back to home
		headers.set("Location", new URL("/", url).toString());

		return new Response(null, {
			status: 302,
			headers,
		});
	}),
});
