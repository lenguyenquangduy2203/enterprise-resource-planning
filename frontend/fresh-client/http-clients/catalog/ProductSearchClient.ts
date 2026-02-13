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

export const ProductStatus = z.literal(["ACTIVE", "INACTIVE"]);

export const SearchProductQuery = z.object({
	name: z.string().optional(),
	categoryCode: z.string().optional(),
	manufacturerCode: z.string().optional(),
	minPrice: z.number().optional(),
	maxPrice: z.number().optional(),
	status: ProductStatus.optional(),
	page: z.number().nonnegative().default(0),
	size: z.number().nonnegative().default(20),
	sort: z.string().optional(),
}).register($QueryModel, { _tag: "query-model" });

export const ProductDetails = z.object({
	sku: z.string(),
	name: z.string(),
	unit: z.string(),
	unitPrice: z.number(),
	categoryCode: z.string(),
	categoryName: z.string(),
	manufacturerCode: z.string(),
	manufacturerName: z.string(),
	status: ProductStatus,
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

const ProductSearchClientSchema = z.object({
	getProductsCatalog: z.function({
		input: z.tuple([JwtAuthHeader, SearchProductQuery]),
		output: z.promise(PageOf(ProductDetails)),
	}).register($URI, { method: "GET", uri: "products" }),
}).register($Client, {
	base: "http://gateway:8080/catalog/",
	init: {
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export const ProductSearchClient = ProcessClientSchema(
	ProductSearchClientSchema,
);
