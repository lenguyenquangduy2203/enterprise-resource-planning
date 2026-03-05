import z from "zod";
import { $Client, $Header, $URI, ProcessClientSchema } from "@fresh-web/mod.ts";

const JwtAuthHeader = z.jwt()
	.transform((jwt) => `Bearer ${jwt}`)
	.register($Header, {
		_tag: "header",
		key: "Authorization",
	});

export const WarehouseSelectOptions = z.array(z.object({
	id: z.number().int().positive(),
	code: z.string().trim().nonempty(),
	name: z.string().trim().nonempty(),
}));

const LookupClientSchema = z.object({
	lookupWarehouse: z.function({
		input: z.tuple([JwtAuthHeader]),
		output: z.promise(WarehouseSelectOptions),
	}).register($URI, { method: "GET", uri: "warehouses" }),
}).register($Client, {
	base: "http://gateway:8080/inv/lookups/",
	init: {
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export const LookupClient = ProcessClientSchema(LookupClientSchema);
