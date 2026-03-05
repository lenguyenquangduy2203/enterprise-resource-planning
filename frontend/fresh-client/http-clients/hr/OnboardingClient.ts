import z from "zod";
import {
	$Body,
	$Client,
	$Header,
	$Param,
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

export const AcceptResponse = z.void();

const OnboardingClientSchema = z.object({
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
	onboardEmployee: z.function({
		input: z.tuple([
			JwtAuthHeader,
			z.object({
				fullname: z.string().trim().nonempty(),
				email: z.email(),
				level: z.string().trim().nonempty(),
				departmentCode: z.string().nonempty(),
				positionCode: z.string().nonempty(),
			}).register($Body, { _tag: "body" }),
		]),
		output: z.promise(AcceptResponse),
	}).register($URI, {
		method: "POST",
		uri: "employees",
	}),
}).register($Client, {
	base: "http://gateway:8080/hr/",
	init: {
		headers: {
			"Content-Type": "application/json",
		},
	},
});

export const OnboardingClient = ProcessClientSchema(OnboardingClientSchema);
