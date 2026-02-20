import z from "zod";
import {
	$Client,
	$Header,
	$QueryModel,
	$URI,
	ProcessClientSchema,
} from "@fresh-web/mod.ts";

const JwtAuthHeader = z.jwt()
	.transform((jwt) => `Bearer ${jwt}`)
	.register($Header, {
		_tag: "header",
		key: "Authorization",
	});

const LookupPage = z.object({
	page: z.number().nonnegative().default(0),
	size: z.number().nonnegative().default(20),
	sort: z.string().optional(),
});

export const ProductLookupPage = LookupPage.extend({
	sku: z.string().trim().max(50),
}).register($QueryModel, { _tag: "query-model" });

export const ProductSelection = z.object({
	id: z.number().int().positive(),
	sku: z.string().trim().nonempty(),
	name: z.string().trim().nonempty(),
});

export const PageOf = <S extends z.ZodType>(schema: S) =>
	z.object({
		content: z.array(schema),

		// Map to Spring's field names
		number: z.number().int().nonnegative(), // page index
		size: z.number().int().positive(),
		totalElements: z.number().int().nonnegative(),
		totalPages: z.number().int().nonnegative(),

		// Optional fields returned by Spring
		first: z.boolean().optional(),
		last: z.boolean().optional(),
		empty: z.boolean().optional(),
		numberOfElements: z.number().optional(),
		pageable: z.any().optional(),
		sort: z.any().optional(),
	}).loose();

const LookupClientSchema = z.object({
	lookupProductsBySku: z.function({
		input: z.tuple([JwtAuthHeader, ProductLookupPage]),
		output: z.promise(PageOf(ProductSelection)),
	}).register($URI, { method: "GET", uri: "products/lookups" }),
}).register($Client, {
	base: "http://gateway:8080/catalog/",
	init: {
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export const LookupClient = ProcessClientSchema(LookupClientSchema);
