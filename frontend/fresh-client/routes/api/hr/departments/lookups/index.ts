import { define } from "@/utils/mod.ts";
import { GetDepartmentOptsController } from "@/controllers/hr/OnboardingControllers.ts";
import { OnboardingClient } from "@/http-clients/hr/OnboardingClient.ts";

export const handler = define.handlers({
	GET: GetDepartmentOptsController(async (accessToken) => {
		const opts = await OnboardingClient.getDepartmentOptions(accessToken);

		return new Response(JSON.stringify(opts), { status: 200 });
	}),
});
