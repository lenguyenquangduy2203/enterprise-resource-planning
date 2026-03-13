import { define } from "@/utils/mod.ts";
import { OperationalKPIController } from "@/controllers/analysis/OperationalKPIController.ts";
import { AnalysisClient } from "@/http-clients/analysis/AnalysisClient.ts";

export const handler = define.handlers({
	GET: OperationalKPIController(async (accessToken, query) => {
		const statistics = await AnalysisClient.getOperationKPI(
			accessToken,
			query,
		);

		return new Response(JSON.stringify(statistics), {
			status: 200,
		});
	}),
});
