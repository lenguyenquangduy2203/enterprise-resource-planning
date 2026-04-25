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

export const AcceptResponse = z.void();

const OnboardingClientSchema = z.object({
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
