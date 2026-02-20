import z from "zod";
import { $Cookie } from "@fresh-web/mod.ts";
import { WarehouseSelectOptions } from "@/http-clients/inv/LookupClient.ts";
import { AppController } from "@/utils/mod.ts";

const AccessTokenCookie = z.string()
	.register($Cookie, {
		_tag: "cookie",
		key: "access_token",
	});

const GetWarehouseOptsSchema = z.function({
	input: z.tuple([AccessTokenCookie]),
	output: z.promise(WarehouseSelectOptions),
});

export const GetWarehouseOptsController = AppController(
	GetWarehouseOptsSchema,
);
