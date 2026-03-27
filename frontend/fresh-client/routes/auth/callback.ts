import { define, verifier } from "@/utils/mod.ts";
import { CallbackController } from "@/controllers/auth/OAuth2CallbackController.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	GET: CallbackController(async (code, url) => {
		if (!code) {
			return ResponseEntity.badRequest("Missing code");
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
			return ResponseEntity.unauthorized("Token exchange failed");
		}

		return ResponseEntity.redirect(new URL("/hub", url).toString())
			.withCookie({
				name: "access_token",
				value: token.access_token,
				httpOnly: true,
				sameSite: "Lax",
				secure: false, // true in prod
				path: "/",
			});
	}),
});
