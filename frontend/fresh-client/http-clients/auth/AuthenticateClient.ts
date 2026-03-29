import { z } from "zod";
import {
	$Body,
	$Client,
	$Header,
	$URI,
	ProcessClientSchema,
} from "@fresh-web/mod.ts";

const GetTokenBody = z.object({
	code: z.string().trim().nonempty(),
	verifier: z.string().trim().nonempty(),
}).transform(({ code, verifier }) =>
	new URLSearchParams({
		grant_type: "authorization_code",
		client_id: "fresh-client",
		code,
		redirect_uri: "http://0.0.0.0:5173/auth/callback",
		code_verifier: verifier,
	})
);

const GetTokenAuthorizationHeader = z.string().default("fresh-client:fresh123")
	.transform(
		(credential) => {
			if (credential.startsWith("Basic ")) {
				return credential;
			}

			return `Basic ${btoa(credential)}`;
		},
	);

const GetTokenContentTypeHeader = z.string().default(
	"application/x-www-form-urlencoded",
);

const TokenResponse = z.object({
	access_token: z.jwt(),
}).loose();

const AuthenticationClientSchema = z.object({
	getToken: z.function({
		input: z.tuple([
			GetTokenBody.register($Body, { _tag: "body" }),
			GetTokenAuthorizationHeader.register($Header, {
				_tag: "header",
				key: "Authorization",
			}),
			GetTokenContentTypeHeader.register($Header, {
				_tag: "header",
				key: "Content-Type",
			}),
		]),
		output: z.promise(TokenResponse),
	}).register($URI, { method: "POST", uri: "token" }),
}).register($Client, { base: "http://auth-server:9000/oauth2/" });

export const AuthenticationClient = ProcessClientSchema(
	AuthenticationClientSchema,
);
