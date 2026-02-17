import z from "zod";
import { $Cookie } from "@fresh-web/mod.ts";
import {
	PageOf,
	ProductDetails,
	SearchProductQuery,
} from "@/http-clients/catalog/ProductSearchClient.ts";
import { AppController } from "@/utils/mod.ts";

const ProductDetailsSchema = z.function({
	input: z.tuple([
		z.jwt().register($Cookie, {
			_tag: "cookie",
			key: "access_token",
		}),
		SearchProductQuery,
	]),
	output: z.promise(PageOf(ProductDetails)),
});

export const ProductDetailsController = AppController(ProductDetailsSchema);
