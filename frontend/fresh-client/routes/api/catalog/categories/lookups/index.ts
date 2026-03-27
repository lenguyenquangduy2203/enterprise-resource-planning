import { GetCategoryOptsController } from "@/controllers/catalog/ProductRegControllers.ts";
import { ProductRegClient } from "@/http-clients/catalog/ProductRegClient.ts";
import { define } from "@/utils/mod.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	GET: GetCategoryOptsController(async (accessToken) => {
		const opts = await ProductRegClient.getCategoryOptions(accessToken);

		return ResponseEntity.ok(opts);
	}),
});
