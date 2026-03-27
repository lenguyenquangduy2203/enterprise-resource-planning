import { define } from "@/utils/mod.ts";
import { GetPositionOptsInDepartmentController } from "@/controllers/hr/OnboardingControllers.ts";
import { OnboardingClient } from "@/http-clients/hr/OnboardingClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	GET: GetPositionOptsInDepartmentController(async (accessToken, code) => {
		const opts = await OnboardingClient.getPositionOptionsOfDepartment(
			accessToken,
			code,
		);

		return ResponseEntity.ok(opts);
	}),
});
