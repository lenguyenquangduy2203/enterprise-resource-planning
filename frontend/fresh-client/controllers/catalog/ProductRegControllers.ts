import z from "zod";
import { AppController } from "@/utils/mod.ts";
import {
	RegisterProductCommand,
	SelectOptions,
} from "@/http-clients/catalog/ProductRegClient.ts";
import { $Cookie, $Form } from "@fresh-web/mod.ts";

const AccessTokenCookie = z.string()
	.register($Cookie, {
		_tag: "cookie",
		key: "access_token",
	});

const GetCategoryOptsSchema = z.function({
	input: z.tuple([
		AccessTokenCookie,
	]),
	output: z.promise(SelectOptions),
});

const GetManufacturerOptsSchema = z.function({
	input: z.tuple([
		AccessTokenCookie,
	]),
	output: z.promise(SelectOptions),
});

const RegisterProductSchema = z.function({
	input: z.tuple([
		AccessTokenCookie,
		RegisterProductCommand.register($Form, { _tag: "form" }),
	]),
	output: z.promise(z.void()),
});

export const GetCategoryOptsController = AppController(GetCategoryOptsSchema);
export const GetManufacturerOptsController = AppController(
	GetManufacturerOptsSchema,
);
export const RegisterProductController = AppController(RegisterProductSchema);
