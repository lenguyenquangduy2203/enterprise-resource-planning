import { define } from "@/utils/mod.ts";
import { GetWarehouseOptsController } from "@/controllers/inv/LookupControllers.ts";
import { LookupClient } from "@/http-clients/inv/LookupClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	GET: GetWarehouseOptsController(async (accessToken) => {
		const opts = await LookupClient.lookupWarehouse(accessToken);

		return ResponseEntity.ok(opts);
	}),
});
