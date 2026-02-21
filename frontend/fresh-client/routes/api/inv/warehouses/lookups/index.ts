import { define } from "@/utils/mod.ts";
import { GetWarehouseOptsController } from "@/controllers/inv/LookupControllers.ts";
import { LookupClient } from "@/http-clients/inv/LookupClient.ts";

export const handler = define.handlers({
	GET: GetWarehouseOptsController(async (accessToken) => {
		const opts = await LookupClient.lookupWarehouse(accessToken);

		return new Response(JSON.stringify(opts), { status: 200 });
	}),
});
