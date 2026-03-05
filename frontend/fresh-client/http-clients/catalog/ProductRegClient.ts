import z from "zod";
import {
	$Body,
	$Client,
	$Header,
	$URI,
	ProcessClientSchema,
} from "@fresh-web/mod.ts";

const JwtAuthHeader = z.jwt()
	.transform((jwt) => `Bearer ${jwt}`)
	.register($Header, {
		_tag: "header",
		key: "Authorization",
	});

export const SelectOptions = z.array(z.object({
	code: z.string().nonempty(),
	name: z.string().nonempty(),
}));

const CODE = z.string().trim().min(1).max(50);

export const RegisterProductCommand = z.object({
	sku: CODE,
	name: z.string().trim().min(1).max(150),
	unit: z.string().max(50).optional(),
	unitPrice: z.number().min(0.01).refine(
		(price) => Math.abs(Math.round(price * 100) - price * 100) < 1e-10,
		"Unit price must have at most 2 decimal places",
	),
	description: z.string().max(255).optional().nullable(),
	categoryCode: CODE,
	manufacturerCode: CODE,
});

const ProductRegClientSchema = z.object({
	getCategoryOptions: z.function({
		input: z.tuple([JwtAuthHeader]),
		output: z.promise(SelectOptions),
	}).register($URI, {
		method: "GET",
		uri: "lookups/categories",
	}),
	getManufacturerOptions: z.function({
		input: z.tuple([JwtAuthHeader]),
		output: z.promise(SelectOptions),
	}).register($URI, {
		method: "GET",
		uri: "lookups/manufacturers",
	}),
	registerProduct: z.function({
		input: z.tuple([
			JwtAuthHeader,
			RegisterProductCommand.clone().register($Body, { _tag: "body" }),
		]),
		output: z.promise(z.void()),
	}).register($URI, {
		method: "POST",
		uri: "products",
	}),
}).register($Client, {
	base: "http://gateway:8080/catalog/",
	init: {
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export const ProductRegClient = ProcessClientSchema(ProductRegClientSchema);
