import { define } from "@/utils/mod.ts";
import { GetPerformerOptsController } from "@/controllers/hr/LookupsControllers.ts";
import { LookupsClient } from "@/http-clients/hr/LookupsClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	GET: GetPerformerOptsController(async (accessToken, query) => {
		const opts = await LookupsClient.getPerformerOptions(
			accessToken,
			query,
		);

		return ResponseEntity.ok(opts);
	}),
});
