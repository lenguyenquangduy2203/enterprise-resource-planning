import { define } from "@/utils/mod.ts";
import { RegisterProductController } from "@/controllers/catalog/ProductRegControllers.ts";
import { ProductRegClient } from "@/http-clients/catalog/ProductRegClient.ts";
import { ProductDetailsController } from "@/controllers/catalog/ProductDetailsController.ts";
import { ProductSearchClient } from "@/http-clients/catalog/ProductSearchClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	POST: RegisterProductController(async (accessToken, product) => {
		await ProductRegClient.registerProduct(accessToken, product);

		return new Response(undefined, { status: 201 });
	}),
	GET: ProductDetailsController(async (accessToken, query) => {
		const summaries = await ProductSearchClient.getProductsCatalog(
			accessToken,
			query,
		);

		return ResponseEntity.ok(summaries);
	}),
});
