import { z } from "zod";
import { $Cookie, $Param } from "@fresh-web/mod.ts";
import {
	PerformerLookupsQuery,
	PerformerOptions,
	SelectOptions,
} from "@/http-clients/hr/LookupsClient.ts";
import { AppController } from "@/utils/mod.ts";

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
const GetPerformerOptsSchema = z.function({
	input: z.tuple([
		AccessTokenCookie,
		PerformerLookupsQuery,
	]),
	output: z.promise(PerformerOptions),
});

export const GetDepartmentOptsController = AppController(
	GetDepartmentOptsSchema,
);
export const GetPositionOptsInDepartmentController = AppController(
	GetPositionOptsInDepartmentSchema,
);
export const GetPerformerOptsController = AppController(GetPerformerOptsSchema);
