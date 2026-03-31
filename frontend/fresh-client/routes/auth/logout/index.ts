import { define } from "@/utils/mod.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";
import { OIDCLogoutController } from "@/controllers/auth/OIDCLogutController.ts";

export const handler = define.handlers({
	POST: OIDCLogoutController((id_token) => {
		return ResponseEntity.redirect(
			`http://localhost:9000/connect/logout?${new URLSearchParams({
				id_token_hint: id_token,
				post_logout_redirect_uri: "http://0.0.0.0:5173/",
			})}`,
		)
			.withCookie({
				name: "access_token",
				value: "",
				httpOnly: true,
				sameSite: "Lax",
				secure: false, // true in prod
				path: "/",
				maxAge: 0,
			})
			.withCookie({
				name: "id_token",
				value: "",
				httpOnly: true,
				sameSite: "Lax",
				secure: false, // true in prod
				path: "/",
				maxAge: 0,
			});
	}),
});
