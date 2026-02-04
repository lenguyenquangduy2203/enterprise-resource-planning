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

export const SearchEmployeeQuery = z.object({
	departmentCode: z.string().optional(),
	positionCode: z.string().optional(),
	level: z.string().optional(),
	accountProvisioningStatus: z.enum(["PROVISIONED", "NOT_PROVISIONED"])
		.optional(),
	fullname: z.string().optional(),
	email: z.string().optional(),
	page: z.number().nonnegative().default(0),
	size: z.number().nonnegative().default(20),
	sort: z.string().optional(),
}).register($QueryModel, {
	_tag: "query-model",
});

export const EmployeeSummary = z.object({
	id: z.uuid(),
	fullname: z.string(),
	email: z.email(),
	level: z.string(),
	positionCode: z.string(),
	positionName: z.string(),
	departmentCode: z.string(),
	departmentName: z.string(),
	hasAccount: z.boolean(),
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

const SummaryClientSchema = z.object({
	getEmployeeSummaries: z.function({
		input: z.tuple([JwtAuthHeader, SearchEmployeeQuery]),
		output: z.promise(PageOf(EmployeeSummary)),
	}).register($URI, { method: "GET", uri: "employees" }),
}).register($Client, {
	base: "http://gateway:8080/hr/",
	init: {
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export const SummaryClient = ProcessClientSchema(SummaryClientSchema);
