import { define } from "@/utils/mod.ts";
import { GetDepartmentOptsController } from "@/controllers/hr/LookupsControllers.ts";
import { LookupsClient } from "@/http-clients/hr/LookupsClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	GET: GetDepartmentOptsController(async (accessToken) => {
		const opts = await LookupsClient.getDepartmentOptions(accessToken);

		return ResponseEntity.ok(opts);
	}),
});
