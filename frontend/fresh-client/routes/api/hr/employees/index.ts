import { define } from "@/utils/mod.ts";
import { OnboardEmployeeController } from "@/controllers/hr/OnboardingControllers.ts";
import { OnboardingClient } from "@/http-clients/hr/OnboardingClient.ts";
import { EmployeeSummariesController } from "@/controllers/hr/EmployeeSummariesController.ts";
import { SummaryClient } from "../../../../http-clients/hr/SummaryClient.ts";

export const handler = define.handlers({
	POST: OnboardEmployeeController(async (accessToken, employee) => {
		await OnboardingClient.onboardEmployee(accessToken, employee);

		return new Response(undefined, { status: 202 });
	}),
	GET: EmployeeSummariesController(async (accessToken, query) => {
		const summaries = await SummaryClient.getEmployeeSummaries(
			accessToken,
			query,
		);

		return new Response(JSON.stringify(summaries), { status: 200 });
	}),
});
