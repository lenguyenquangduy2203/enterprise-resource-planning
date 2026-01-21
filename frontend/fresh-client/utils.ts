import { createDefine } from "fresh";
import { WithAppContext } from "@fresh-web/mod.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export type State = {
	url: string;
};

export const define = createDefine<State>();

export async function generatePkCE() {
	const verifier = base64UrlEncode(
		crypto.getRandomValues(new Uint8Array(32)),
	);
	const hash = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(verifier),
	);
	const challenge = base64UrlEncode(new Uint8Array(hash));

	return { verifier, challenge };
}

function base64UrlEncode(buffer: Uint8Array) {
	return btoa(String.fromCodePoint(...buffer))
		.replaceAll("+", "-")
		.replaceAll("/", "_")
		.replace(/=+$/, "");
}

export const {
	verifier,
	challenge,
} = await generatePkCE();

export const AppController = WithAppContext<State>();
