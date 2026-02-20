import { define } from "@/utils/mod.ts";
import { GetProductOptsBySkuController } from "@/controllers/catalog/LookupControllers.ts";
import { LookupClient } from "@/http-clients/catalog/LookupClient.ts";

export const handler = define.handlers({
	GET: GetProductOptsBySkuController(async (accessToken, query) => {
		const opts = await LookupClient.lookupProductsBySku(accessToken, query);

		return new Response(JSON.stringify(opts), { status: 200 });
	}),
});
