import z from "zod";
import { AppController } from "@/utils/mod.ts";
import {
	AcceptResponse,
	SelectOptions,
} from "@/http-clients/hr/OnboardingClient.ts";
import { $Cookie, $Form, $Param } from "@fresh-web/mod.ts";

const AccessTokenCookie = z.string()
	.register($Cookie, {
		_tag: "cookie",
		key: "access_token",
	});

const GetDepartmentOptsSchema = z.function({
	input: z.tuple([
		AccessTokenCookie,
	]),
	output: z.promise(SelectOptions),
});
const GetPositionOptsInDepartmentSchema = z.function({
	input: z.tuple([
		AccessTokenCookie,
		z.string().trim().nonempty().register($Param, {
			_tag: "param",
			key: "code",
		}),
	]),
	output: z.promise(SelectOptions),
});
const OnboardEmployeeSchema = z.function({
	input: z.tuple([
		AccessTokenCookie,
		z.object({
			fullname: z.string().trim().nonempty(),
			email: z.email(),
			level: z.string().trim().nonempty(),
			departmentCode: z.string().nonempty(),
			positionCode: z.string().nonempty(),
		}).register($Form, { _tag: "form" }),
	]),
	output: z.promise(AcceptResponse),
});

export const GetDepartmentOptsController = AppController(
	GetDepartmentOptsSchema,
);
export const GetPositionOptsInDepartmentController = AppController(
	GetPositionOptsInDepartmentSchema,
);
export const OnboardEmployeeController = AppController(OnboardEmployeeSchema);
