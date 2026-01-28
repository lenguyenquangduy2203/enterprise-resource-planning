import { $Client, $Header, $URI, ProcessClientSchema } from "@fresh-web/mod.ts";
import z from "zod";

export const PoliciesSchema = z.object({
	username: z.string().nonempty(),
	roles: z.array(z.string().startsWith("ROLE_")),
	permissions: z.array(z.string().nonempty()),
});

const PoliciesClientSchema = z.object({
	getJwtPolicies: z.function({
		input: z.tuple([
			z.jwt().transform((jwt) => `Bearer ${jwt}`)
				.register(
					$Header,
					{
						_tag: "header",
						key: "Authorization",
					},
				),
		]),
		output: z.promise(PoliciesSchema),
	}).register($URI, { method: "GET", uri: "/me/permissions" }),
}).register($Client, {
	base: "http://gateway:8080",
	init: {
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export const PoliciesClient = ProcessClientSchema(PoliciesClientSchema);
