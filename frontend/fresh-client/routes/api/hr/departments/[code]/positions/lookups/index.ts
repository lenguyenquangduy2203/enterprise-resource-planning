import { define } from "@/utils/mod.ts";
import { GetPositionOptsInDepartmentController } from "@/controllers/hr/LookupsControllers.ts";
import { LookupsClient } from "@/http-clients/hr/LookupsClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	GET: GetPositionOptsInDepartmentController(async (accessToken, code) => {
		const opts = await LookupsClient.getPositionOptionsOfDepartment(
			accessToken,
			code,
		);

		return ResponseEntity.ok(opts);
	}),
});
