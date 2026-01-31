import { define } from "@/utils/mod.ts";
import { OnboardEmployeeController } from "@/controllers/hr/OnboardingControllers.ts";
import { OnboardingClient } from "@/http-clients/hr/OnboardingClient.ts";

export const handler = define.handlers({
	POST: OnboardEmployeeController(async (accessToken, employee) => {
		await OnboardingClient.onboardEmployee(accessToken, employee);

		return new Response(undefined, { status: 202 });
	}),
});
