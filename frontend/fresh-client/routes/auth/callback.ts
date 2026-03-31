import { define, InferredIssue, verifier, WantedIssue } from "@/utils/mod.ts";
import { CallbackController } from "@/controllers/auth/OAuth2CallbackController.ts";
import { AuthenticationClient } from "@/http-clients/auth/AuthenticateClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";
import { z } from "zod";

export const handler = define.handlers({
	GET: CallbackController(async (code, url) => {
		if (!code) {
			return ResponseEntity.badRequest("Missing code");
		}

		// Exchange code for token
		try {
			const token = await AuthenticationClient.getToken({
				code,
				verifier,
			});

			return ResponseEntity.redirect(new URL("/hub", url).toString())
				.withCookie({
					name: "access_token",
					value: token.access_token,
					httpOnly: true,
					sameSite: "Lax",
					secure: false, // true in prod
					path: "/",
				})
				.withCookie({
					name: "id_token",
					value: token.id_token,
					httpOnly: true,
					sameSite: "Lax",
					secure: false, // true in prod
					path: "/",
				});
		} catch (error) {
			if (error instanceof z.ZodError) {
				console.log(z.prettifyError(error));
				const accessCookieIssue = error.issues.find((issue) =>
					WantedIssue("invalid_type")(issue) ||
					WantedIssue("invalid_format")(issue)
				);
				if (isJWTIssue(accessCookieIssue)) {
					return ResponseEntity.unauthorized("Token exchange failed");
				}
			}

			throw error;
		}
	}),
});

function isJWTIssue(issue?: InferredIssue<"invalid_type" | "invalid_format">) {
	const isStringTypeIssue = issue?.code === "invalid_type" &&
		issue.expected === "string";
	const isJwtFormatIssue = issue?.code === "invalid_format" &&
		issue.format === "jwt";

	return isStringTypeIssue && isJwtFormatIssue;
}
