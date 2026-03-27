import { define } from "@/utils/mod.ts";
import { DepartmentWorkforceController } from "@/controllers/analysis/DepartmentWorkforceController.ts";
import { AnalysisClient } from "@/http-clients/analysis/AnalysisClient.ts";
import { ResponseEntity } from "@fresh-web/mod.ts";

export const handler = define.handlers({
	GET: DepartmentWorkforceController(async (accessToken) => {
		const workforce = await AnalysisClient.getDepartmentsWorkforce(
			accessToken,
		);

		return ResponseEntity.ok(workforce.departments);
	}),
});
