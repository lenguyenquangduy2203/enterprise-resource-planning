import z from "zod";
import {
	$Client,
	$Header,
	$Param,
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

export const SelectOptions = z.array(z.object({
	code: z.string().nonempty(),
	name: z.string().nonempty(),
}));

export const PerformerLookupsQuery = z.object({
	departmentCode: z.string().optional(),
	positionCode: z.string().optional(),
	matchName: z.string().optional(),
}).register($QueryModel, {
	_tag: "query-model",
});

export const PerformerOptions = z.array(z.object({
	id: z.uuid(),
	fullname: z.string().nonempty(),
}));

const LookupsClientSchema = z.object({
	getDepartmentOptions: z.function({
		input: z.tuple([JwtAuthHeader]),
		output: z.promise(SelectOptions),
	}).register($URI, {
		method: "GET",
		uri: "lookups/departments",
	}),
	getPositionOptionsOfDepartment: z.function({
		input: z.tuple([
			JwtAuthHeader,
			z.string().nonempty().register($Param, {
				_tag: "param",
				key: "code",
			}),
		]),
		output: z.promise(SelectOptions),
	}).register($URI, {
		method: "GET",
		uri: "lookups/departments/{code}/positions",
	}),
	getPerformerOptions: z.function({
		input: z.tuple([JwtAuthHeader, PerformerLookupsQuery]),
		output: z.promise(PerformerOptions),
	}).register($URI, { method: "GET", uri: "lookups/performers" }),
}).register($Client, {
	base: "http://gateway:8080/hr/",
	init: {
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export const LookupsClient = ProcessClientSchema(LookupsClientSchema);
