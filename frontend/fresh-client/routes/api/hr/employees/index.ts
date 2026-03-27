import { define } from "@/utils/mod.ts";
import { OnboardEmployeeController } from "@/controllers/hr/OnboardingControllers.ts";
import { OnboardingClient } from "@/http-clients/hr/OnboardingClient.ts";
import { EmployeeSummariesController } from "@/controllers/hr/EmployeeSummariesController.ts";
import { SummaryClient } from "@/http-clients/hr/SummaryClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	POST: OnboardEmployeeController(async (accessToken, employee) => {
		await OnboardingClient.onboardEmployee(accessToken, employee);

		return ResponseEntity.created(undefined);
	}),
	GET: EmployeeSummariesController(async (accessToken, query) => {
		const summaries = await SummaryClient.getEmployeeSummaries(
			accessToken,
			query,
		);

		return ResponseEntity.ok(summaries);
	}),
});
