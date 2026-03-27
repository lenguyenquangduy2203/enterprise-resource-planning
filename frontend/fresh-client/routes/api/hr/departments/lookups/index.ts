import { define } from "@/utils/mod.ts";
import { GetDepartmentOptsController } from "@/controllers/hr/OnboardingControllers.ts";
import { OnboardingClient } from "@/http-clients/hr/OnboardingClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	GET: GetDepartmentOptsController(async (accessToken) => {
		const opts = await OnboardingClient.getDepartmentOptions(accessToken);

		return ResponseEntity.ok(opts);
	}),
});
