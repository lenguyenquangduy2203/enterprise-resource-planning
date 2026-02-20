import z from "zod";
import { $Cookie } from "@fresh-web/mod.ts";
import {
	PageOf,
	ProductLookupPage,
	ProductSelection,
} from "@/http-clients/catalog/LookupClient.ts";
import { AppController } from "@/utils/mod.ts";

const AccessTokenCookie = z.string()
	.register($Cookie, {
		_tag: "cookie",
		key: "access_token",
	});

const GetProductOptsBySkuSchema = z.function({
	input: z.tuple([AccessTokenCookie, ProductLookupPage]),
	output: z.promise(PageOf(ProductSelection)),
});

export const GetProductOptsBySkuController = AppController(
	GetProductOptsBySkuSchema,
);
